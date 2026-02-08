/**
 * Prefetch Logger Utility
 * Logging utility for prefetch operations
 */

/**
 * Logs prefetch operation in development mode
 *
 * @param message - Log message
 * @param data - Additional data to log
 */
export function logPrefetch(message: string, data: unknown): void {
  if (__DEV__) {
    console.log(`[TanStack Query] ${message}`, data);
  }
}

/**
 * Logs multiple prefetch operation
 *
 * @param count - Number of queries prefetched
 */
export function logPrefetchMultiple(count: number): void {
  if (__DEV__) {
    console.log(`[TanStack Query] Prefetched multiple:`, count);
  }
}
