/**
 * useStore Hook
 * Helper for creating stores in components
 */

import { useMemo, useRef } from 'react';
import { createStore } from '../../domain/factories/StoreFactory';
import type { StoreConfig } from '../../domain/types/Store';

export function useStore<T extends object>(config: StoreConfig<T>) {
  // Config objesini stabilize et - sadece name değiştiğinde yeni store oluştur
  const configRef = useRef(config);
  configRef.current = config;
  const store = useMemo(() => createStore(configRef.current), [config.name]);
  return store;
}
