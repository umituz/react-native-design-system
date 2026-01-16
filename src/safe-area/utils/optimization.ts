/**
 * Performance optimization utilities for safe area hooks
 */

import { useMemo, useRef } from "react";
import { clearValidationCache } from "./validation";

/**
 * Memoize options object to prevent unnecessary re-renders
 * Uses shallow comparison for better performance
 */
export const useStableOptions = <T extends Record<string, any>>(
  options: T,
): T => {
  const prevOptionsRef = useRef<T | undefined>(undefined);

  return useMemo(() => {
    const prev = prevOptionsRef.current;

    if (!prev) {
      prevOptionsRef.current = options;
      return options;
    }

    const prevKeys = Object.keys(prev);
    const currentKeys = Object.keys(options);

    if (prevKeys.length !== currentKeys.length) {
      prevOptionsRef.current = options;
      return options;
    }

    const hasChanged = prevKeys.some((key) => prev[key] !== options[key]);

    if (hasChanged) {
      prevOptionsRef.current = options;
    }

    return prevOptionsRef.current ?? options;
  }, [options]);
};

/**
 * Cleanup function to clear all performance caches
 * Call this in useEffect cleanup if needed
 */
export const clearPerformanceCaches = (): void => {
  clearValidationCache();
};
