/**
 * useCachedValue Hook
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { cacheManager } from '../domain/CacheManager';
import type { CacheConfig } from '../domain/types/Cache';

export function useCachedValue<T>(
  cacheName: string,
  key: string,
  fetcher: () => Promise<T>,
  config?: CacheConfig & { ttl?: number }
) {
  const [value, setValue] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetcherRef = useRef(fetcher);
  const configRef = useRef(config);

  const loadValue = useCallback(async () => {
    const cache = cacheManager.getCache<T>(cacheName, configRef.current);
    const cached = cache.get(key);

    if (cached !== undefined) {
      setValue(cached);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetcherRef.current!();
      cache.set(key, data, configRef.current?.ttl);
      setValue(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [cacheName, key]);

  useEffect(() => {
    let isMounted = true;

    const doLoad = async () => {
      const cache = cacheManager.getCache<T>(cacheName, configRef.current);
      const cached = cache.get(key);

      if (cached !== undefined) {
        if (isMounted) setValue(cached);
        return;
      }

      if (isMounted) {
        setIsLoading(true);
        setError(null);
      }

      try {
        const data = await fetcherRef.current!();
        cache.set(key, data, configRef.current?.ttl);
        if (isMounted) setValue(data);
      } catch (err) {
        if (isMounted) setError(err as Error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    doLoad();

    return () => {
      isMounted = false;
    };
  }, [cacheName, key]);

  const invalidate = useCallback(() => {
    const cache = cacheManager.getCache<T>(cacheName);
    cache.delete(key);
    setValue(undefined);
  }, [cacheName, key]);

  const invalidatePattern = useCallback((pattern: string): number => {
    const cache = cacheManager.getCache<T>(cacheName);
    const count = cache.invalidatePattern(pattern);
    setValue(undefined);
    return count;
  }, [cacheName]);

  const refetch = useCallback(() => {
    setValue(undefined);
    loadValue();
  }, [loadValue]);

  return {
    value,
    isLoading,
    error,
    invalidate,
    invalidatePattern,
    refetch,
  };
}
