/**
 * Cache Storage Operations
 *
 * Handles cache storage operations following Single Responsibility Principle
 */

import { storageRepository } from '../../infrastructure/repositories/AsyncStorageRepository';
import type { CachedValue } from '../../domain/entities/CachedValue';
import { createCachedValue } from '../../domain/entities/CachedValue';
import { devWarn } from '../../domain/utils/devUtils';
import { isValidCachedValue } from '../../domain/utils/ValidationUtils';

export interface CacheStorageOptions {
  ttl?: number;
  version?: number;
  enabled?: boolean;
}

/**
 * Handles cache storage operations with proper error handling and memory management
 */
export class CacheStorageOperations {
  private static instance: CacheStorageOperations | null = null;

  /**
   * Singleton pattern to prevent memory leaks
   */
  static getInstance(): CacheStorageOperations {
    if (!CacheStorageOperations.instance) {
      CacheStorageOperations.instance = new CacheStorageOperations();
    }
    return CacheStorageOperations.instance;
  }

  /**
   * Reset singleton instance (useful for testing)
   */
  static resetInstance(): void {
    CacheStorageOperations.instance = null;
  }

  /**
   * Load cached data from storage
   */
  async loadFromStorage<T>(
    key: string
  ): Promise<CachedValue<T> | null> {
    try {
      const result = await storageRepository.getString(key, '');

      if (result.success && result.data) {
        const parsed = JSON.parse(result.data) as unknown;

        // Runtime validation to ensure type safety
        if (isValidCachedValue(parsed)) {
          return parsed as CachedValue<T>;
        }

        if (__DEV__) {
          devWarn(`CacheStorageOperations: Invalid cached data structure for key "${key}"`);
        }

        return null;
      }

      return null;
    } catch (error) {
      devWarn(`CacheStorageOperations: Failed to load cache for key "${key}"`, error);
      return null;
    }
  }

  /**
   * Save data to cache storage
   */
  async saveToStorage<T>(
    key: string,
    value: T,
    options: CacheStorageOptions = {}
  ): Promise<void> {
    const { ttl, version, enabled = true } = options;

    if (!enabled) return;

    try {
      const cached = createCachedValue(value, ttl || 0, version);
      await storageRepository.setString(key, JSON.stringify(cached));
    } catch (error) {
      devWarn(`CacheStorageOperations: Failed to save cache for key "${key}"`, error);
    }
  }

  /**
   * Clear cached data from storage
   */
  async clearFromStorage(key: string, enabled = true): Promise<void> {
    if (!enabled) return;

    try {
      await storageRepository.removeItem(key);
    } catch (error) {
      devWarn(`CacheStorageOperations: Failed to clear cache for key "${key}"`, error);
    }
  }
}