/**
 * Core Cache Module
 *
 * Unified cache implementation with strategy pattern.
 * Replaces SimpleCache and TTLCache with single implementation.
 */

export { UnifiedCache } from './domain/UnifiedCache';
export type { UnifiedCacheConfig } from './domain/UnifiedCache';

export { CleanupStrategy, IntervalCleanupStrategy, TimeoutCleanupStrategy } from './domain/CleanupStrategy';
export type { CleanupType } from './domain/CleanupStrategy';

export { CacheFactory } from './infrastructure/CacheFactory';

export type { CacheEntry, CacheConfig } from './domain/types';
