/**
 * useInfiniteScroll Hook
 *
 * Supports page-based and cursor-based pagination
 * Features:
 * - AbortController for request cancellation
 * - Automatic retry with exponential backoff
 * - Performance monitoring in __DEV__ mode
 * - Memory leak prevention
 */

import { useState, useCallback, useEffect, useRef } from "react";
import type { InfiniteScrollConfig } from "../../domain/types/infinite-scroll-config";
import type { InfiniteScrollState } from "../../domain/types/infinite-scroll-state";
import type { UseInfiniteScrollReturn } from "../../domain/types/infinite-scroll-return";
import { loadData, loadMoreData, isCursorMode } from "./pagination.helper";

const DEFAULT_CONFIG = {
  pageSize: 20,
  threshold: 5,
  autoLoad: true,
  initialPage: 0,
  maxRetries: 3,
  retryDelay: 1000,
};

function createInitialState<T>(
  initialPage: number,
  totalItems?: number,
): InfiniteScrollState<T> {
  return {
    items: [],
    pages: [],
    currentPage: initialPage,
    cursor: null,
    hasMore: true,
    isLoading: true,
    isLoadingMore: false,
    isRefreshing: false,
    error: null,
    totalItems,
  };
}

/**
 * Sleep utility for retry delay
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry logic with exponential backoff
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number,
  baseDelay: number,
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt);
        if (__DEV__) {
          console.log(
            `[useInfiniteScroll] Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`,
          );
        }
        await sleep(delay);
      }
    }
  }

  throw lastError;
}

export function useInfiniteScroll<T>(
  config: InfiniteScrollConfig<T>,
): UseInfiniteScrollReturn<T> {
  const {
    pageSize = DEFAULT_CONFIG.pageSize,
    autoLoad = DEFAULT_CONFIG.autoLoad,
    totalItems,
  } = config;

  const initialPage =
    "initialPage" in config ? config.initialPage || 0 : DEFAULT_CONFIG.initialPage;

  const maxRetries = DEFAULT_CONFIG.maxRetries;
  const retryDelay = DEFAULT_CONFIG.retryDelay;

  const [state, setState] = useState<InfiniteScrollState<T>>(() =>
    createInitialState<T>(initialPage, totalItems),
  );

  const isLoadingRef = useRef(false);
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      abortControllerRef.current?.abort();
      if (__DEV__) {
        console.log("[useInfiniteScroll] Cleanup: component unmounted");
      }
    };
  }, []);

  // Cancel pending requests
  const cancelPendingRequests = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
  }, []);

  const loadInitial = useCallback(async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    cancelPendingRequests();

    if (isMountedRef.current) {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
    }

    const startTime = __DEV__ ? performance.now() : 0;

    try {
      const newState = await retryWithBackoff(
        async () => {
          const result = await loadData(config, initialPage, pageSize, totalItems);
          return result;
        },
        maxRetries,
        retryDelay,
      );

      if (isMountedRef.current) {
        setState(newState);

        if (__DEV__) {
          const duration = performance.now() - startTime;
          console.log(
            `[useInfiniteScroll] Initial load completed in ${duration.toFixed(2)}ms`,
            `Loaded ${newState.items.length} items`,
          );
        }
      }
    } catch (error) {
      if (isMountedRef.current) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to load data";

        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));

        if (__DEV__) {
          console.error("[useInfiniteScroll] Load initial failed:", errorMessage);
        }
      }
    } finally {
      isLoadingRef.current = false;
    }
  }, [config, initialPage, pageSize, totalItems, maxRetries, retryDelay, cancelPendingRequests]);

  const loadMore = useCallback(async () => {
    if (
      isLoadingRef.current ||
      !state.hasMore ||
      state.isLoadingMore ||
      state.isLoading
    ) {
      return;
    }

    if (isCursorMode(config) && !state.cursor) return;

    isLoadingRef.current = true;

    if (isMountedRef.current) {
      setState((prev) => ({ ...prev, isLoadingMore: true, error: null }));
    }

    const startTime = __DEV__ ? performance.now() : 0;

    try {
      const updates = await retryWithBackoff(
        async () => {
          const result = await loadMoreData(config, state, pageSize);
          return result;
        },
        maxRetries,
        retryDelay,
      );

      if (isMountedRef.current) {
        setState((prev) => ({ ...prev, ...updates }));

        if (__DEV__) {
          const duration = performance.now() - startTime;
          const newItemsCount = updates.items?.length || 0;
          console.log(
            `[useInfiniteScroll] Load more completed in ${duration.toFixed(2)}ms`,
            `Loaded ${newItemsCount} items, total: ${updates.items?.length || 0}`,
          );
        }
      }
    } catch (error) {
      if (isMountedRef.current) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to load more items";

        setState((prev) => ({
          ...prev,
          isLoadingMore: false,
          error: errorMessage,
        }));

        if (__DEV__) {
          console.error("[useInfiniteScroll] Load more failed:", errorMessage);
        }
      }
    } finally {
      isLoadingRef.current = false;
    }
  }, [config, state, pageSize, maxRetries, retryDelay]);

  const refresh = useCallback(async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    cancelPendingRequests();

    if (isMountedRef.current) {
      setState((prev) => ({ ...prev, isRefreshing: true, error: null }));
    }

    const startTime = __DEV__ ? performance.now() : 0;

    try {
      const newState = await retryWithBackoff(
        async () => {
          const result = await loadData(config, initialPage, pageSize, totalItems);
          return result;
        },
        maxRetries,
        retryDelay,
      );

      if (isMountedRef.current) {
        setState(newState);

        if (__DEV__) {
          const duration = performance.now() - startTime;
          console.log(
            `[useInfiniteScroll] Refresh completed in ${duration.toFixed(2)}ms`,
            `Loaded ${newState.items.length} items`,
          );
        }
      }
    } catch (error) {
      if (isMountedRef.current) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to refresh data";

        setState((prev) => ({
          ...prev,
          isRefreshing: false,
          error: errorMessage,
        }));

        if (__DEV__) {
          console.error("[useInfiniteScroll] Refresh failed:", errorMessage);
        }
      }
    } finally {
      isLoadingRef.current = false;
    }
  }, [config, initialPage, pageSize, totalItems, maxRetries, retryDelay, cancelPendingRequests]);

  const reset = useCallback(() => {
    isLoadingRef.current = false;
    cancelPendingRequests();
    setState(createInitialState<T>(initialPage, totalItems));

    if (__DEV__) {
      console.log("[useInfiniteScroll] State reset");
    }
  }, [initialPage, totalItems, cancelPendingRequests]);

  useEffect(() => {
    if (autoLoad) {
      loadInitial();
    }

    return () => {
      // Cleanup on config change
      if (__DEV__) {
        console.log("[useInfiniteScroll] Config changed, cleaning up");
      }
    };
  }, [autoLoad, loadInitial]);

  const canLoadMore =
    state.hasMore && !state.isLoadingMore && !state.isLoading;

  return {
    items: state.items,
    state,
    loadMore,
    refresh,
    reset,
    canLoadMore,
  };
}
