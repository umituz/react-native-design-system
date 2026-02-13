/**
 * useStore Hook
 * Helper for creating stores in components
 */

import { useMemo } from 'react';
import { createStore } from '../../domain/factories/StoreFactory';
import type { StoreConfig } from '../../domain/types/Store';

export function useStore<T extends object>(config: StoreConfig<T>) {
  // Stabilize entire config to track all property changes
  const stableConfig = useMemo(
    () => config,
    [
      config.name,
      config.version,
      config.persist,
      config.storage,
      config.ttl,
    ]
  );

  const store = useMemo(() => createStore(stableConfig), [stableConfig]);
  return store;
}
