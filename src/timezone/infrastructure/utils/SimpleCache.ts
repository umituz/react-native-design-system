/**
 * SimpleCache (Backward Compatibility Wrapper)
 *
 * @deprecated Use UnifiedCache from core/cache instead.
 * This wrapper maintains backward compatibility while migrating to UnifiedCache.
 *
 * Lightweight in-memory cache for performance optimization.
 * Now implemented using UnifiedCache with timeout-based cleanup strategy.
 */

import { UnifiedCache } from '../../../core/cache/domain/UnifiedCache';
import { TimeoutCleanupStrategy } from '../../../core/cache/domain/CleanupStrategy';
import { ONE_MINUTE_MS } from '../../../utils/constants/TimeConstants';

/**
 * SimpleCache - Wrapper around UnifiedCache for backward compatibility
 *
 * @example
 * ```ts
 * // Old usage (still works):
 * const cache = new SimpleCache<string>(60000);
 *
 * // New usage (recommended):
 * import { CacheFactory } from '../../../core/cache';
 * const cache = CacheFactory.createTimeoutCache(60000);
 * ```
 */
export class SimpleCache<T> {
  private cache: UnifiedCache<T>;

  constructor(defaultTTL: number = ONE_MINUTE_MS) {
    this.cache = new UnifiedCache<T>({
      defaultTTL,
      cleanupStrategy: new TimeoutCleanupStrategy(ONE_MINUTE_MS),
    });
  }

  /**
   * Destroy the cache and stop cleanup timer
   */
  destroy(): void {
    this.cache.destroy();
  }

  set(key: string, value: T, ttl?: number): void {
    this.cache.set(key, value, ttl);
  }

  get(key: string): T | undefined {
    return this.cache.get(key);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): void {
    this.cache.delete(key);
  }
}
