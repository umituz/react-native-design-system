/**
 * useCachedValue Hook
 */

import { useCallback, useRef, useMemo } from 'react';
import { cacheManager } from '../domain/CacheManager';
import type { CacheConfig } from '../domain/types/Cache';
import { useAsyncOperation } from '../../../utils/hooks';

export function useCachedValue<T>(
  cacheName: string,
  key: string,
  fetcher: () => Promise<T>,
  config?: CacheConfig & { ttl?: number }
) {
  const fetcherRef = useRef(fetcher);
  const configRef = useRef(config);

  const { data: value, isLoading, error, execute, setData } = useAsyncOperation<T | undefined, Error>(
    async () => {
      const cache = cacheManager.getCache<T>(cacheName, configRef.current);
      const cached = cache.get(key);

      if (cached !== undefined) {
        return cached;
      }

      const data = await fetcherRef.current!();
      cache.set(key, data, configRef.current?.ttl);
      return data;
    },
    {
      immediate: true,
      initialData: undefined,
      errorHandler: (err) => err as Error,
    }
  );

  const invalidate = useCallback(() => {
    const cache = cacheManager.getCache<T>(cacheName);
    cache.delete(key);
    setData(undefined);
  }, [cacheName, key, setData]);

  const invalidatePattern = useCallback((pattern: string): number => {
    const cache = cacheManager.getCache<T>(cacheName);
    const count = cache.invalidatePattern(pattern);
    setData(undefined);
    return count;
  }, [cacheName, setData]);

  const refetch = useCallback(() => {
    setData(undefined);
    execute();
  }, [execute, setData]);

  return useMemo(() => ({
    value,
    isLoading,
    error,
    invalidate,
    invalidatePattern,
    refetch,
  }), [value, isLoading, error, invalidate, invalidatePattern, refetch]);
}
