/**
 * usePrefetch Hook
 * Presentation layer - Query prefetching utilities
 *
 * General-purpose prefetching for any React Native app
 */

import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import type { QueryKey, QueryFunction } from '@tanstack/react-query';
import type { PrefetchOptions } from './types/prefetchTypes';
import { logPrefetch, logPrefetchMultiple } from './utils/prefetchLogger';

export type { PrefetchOptions };

/**
 * Hook for prefetching query data
 *
 * Useful for:
 * - Preloading data before navigation
 * - Warming up cache on mount
 * - Background data refresh
 *
 * @example
 * ```typescript
 * function UserProfileList({ userIds }: { userIds: string[] }) {
 *   const prefetchUser = usePrefetchQuery(['user'], async (id) => fetchUser(id));
 *
 *   return (
 *     <FlatList
 *       data={userIds}
 *       onViewableItemsChanged={({ viewableItems }) => {
 *         viewableItems.forEach((item) => {
 *           prefetchUser(item.key);
 *         });
 *       }}
 *     />
 *   );
 * }
 * ```
 */
export function usePrefetchQuery<
  TQueryFnData = unknown,
  TVariables = string | number,
>(
  queryKey: QueryKey,
  queryFn: (variables: TVariables) => Promise<TQueryFnData>,
  options: PrefetchOptions = {},
) {
  const queryClient = useQueryClient();
  const prefetchingRef = useRef(new Set<TVariables>());

  const prefetch = useCallback(
    async (variables: TVariables) => {
      if (prefetchingRef.current.has(variables)) {
        return;
      }

      prefetchingRef.current.add(variables);

      try {
        await queryClient.prefetchQuery({
          queryKey: [...queryKey, variables],
          queryFn: () => queryFn(variables),
          staleTime: options.staleTime,
          gcTime: options.gcTime,
        });

        logPrefetch('Prefetched:', [...queryKey, variables]);
      } finally {
        prefetchingRef.current.delete(variables);
      }
    },
    [queryClient, queryKey, queryFn, options.staleTime, options.gcTime],
  );

  return prefetch;
}

/**
 * Hook for prefetching infinite query data
 *
 * Useful for:
 * - Preloading infinite scroll content
 * - Warming up paginated feeds
 *
 * @example
 * ```typescript
 * function FeedScreen() {
 *   const prefetchFeed = usePrefetchInfiniteQuery(
 *     ['feed'],
 *     ({ pageParam }) => fetchFeed({ cursor: pageParam })
 *   );
 *
 *   useEffect(() => {
 *     prefetchFeed();
 *   }, []);
 * }
 * ```
 */
export function usePrefetchInfiniteQuery<
  TQueryFnData = unknown,
  TPageParam = unknown,
>(
  queryKey: QueryKey,
  queryFn: QueryFunction<TQueryFnData, QueryKey, TPageParam>,
  initialPageParam: TPageParam,
  options: PrefetchOptions = {},
) {
  const queryClient = useQueryClient();
  const hasPrefetchedRef = useRef(false);

  const prefetch = useCallback(async () => {
    if (hasPrefetchedRef.current) {
      return;
    }

    hasPrefetchedRef.current = true;

    try {
      await queryClient.prefetchInfiniteQuery({
        queryKey,
        queryFn,
        staleTime: options.staleTime,
        gcTime: options.gcTime,
        initialPageParam,
      });

      logPrefetch('Prefetched infinite:', queryKey);
    } catch {
      hasPrefetchedRef.current = false;
    }
  }, [queryClient, queryKey, queryFn, options.staleTime, options.gcTime, initialPageParam]);

  return prefetch;
}

/**
 * Hook for prefetching on mount
 *
 * Convenience hook that prefetches data when component mounts
 *
 * @example
 * ```typescript
 * function UserProfile({ userId }: { userId: string }) {
 *   usePrefetchOnMount(
 *     ['user', userId],
 *     () => fetchUser(userId),
 *     { staleTime: TIME_MS.MINUTE }
 *   );
 *
 *   // Component will prefetch user data on mount
 * }
 * ```
 */
export function usePrefetchOnMount<TData = unknown>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options: PrefetchOptions = {},
) {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime: options.staleTime,
      gcTime: options.gcTime,
    });

    logPrefetch('Prefetched on mount:', queryKey);
  }, [queryClient, queryKey, queryFn, options.staleTime, options.gcTime]);
}

/**
 * Hook for prefetching multiple queries
 *
 * @example
 * ```typescript
 * function Dashboard() {
 *   const prefetchMultiple = usePrefetchMultiple();
 *
 *   useEffect(() => {
 *     prefetchMultiple([
 *       { queryKey: ['user'], queryFn: fetchUser },
 *       { queryKey: ['posts'], queryFn: fetchPosts },
 *       { queryKey: ['notifications'], queryFn: fetchNotifications },
 *     ]);
 *   }, []);
 * }
 * ```
 */
export function usePrefetchMultiple<TData = unknown>() {
  const queryClient = useQueryClient();

  return useCallback(
    async (queries: Array<{
      queryKey: QueryKey;
      queryFn: () => Promise<TData>;
      staleTime?: number;
      gcTime?: number;
    }>) => {
      await Promise.all(
        queries.map(({ queryKey, queryFn, staleTime, gcTime }) =>
          queryClient.prefetchQuery({
            queryKey,
            queryFn,
            staleTime,
            gcTime,
          }),
        ),
      );

      logPrefetchMultiple(queries.length);
    },
    [queryClient],
  );
}
