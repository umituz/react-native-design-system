/**
 * useStorageState Hook
 *
 * Domain-Driven Design: Presentation layer hook for state + storage sync
 * Combines React state with automatic storage persistence
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { storageRepository } from '../../infrastructure/repositories/AsyncStorageRepository';
import { unwrap } from '../../domain/entities/StorageResult';
import type { StorageKey } from '../../domain/value-objects/StorageKey';

/**
 * Storage State Hook
 * Syncs React state with AsyncStorage automatically
 *
 * @example
 * ```typescript
 * const [settings, setSettings] = useStorageState('user_settings', { theme: 'light' });
 * // State is automatically persisted to storage
 * ```
 */
export const useStorageState = <T>(
  key: string | StorageKey,
  defaultValue: T
): [T, (value: T) => Promise<void>, boolean] => {
  const keyString = typeof key === 'string' ? key : String(key);
  const [state, setState] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    setIsLoading(true);

    storageRepository
      .getItem<T>(keyString, defaultValue)
      .then((result) => {
        if (isMountedRef.current) {
          setState(unwrap(result, defaultValue));
        }
      })
      .catch(() => {
        // Keep defaultValue on error
      })
      .finally(() => {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      });

    return () => {
      isMountedRef.current = false;
    };
  }, [keyString]);

  // Update state and persist to storage
  const updateState = useCallback(
    async (value: T) => {
      setState(value);
      await storageRepository.setItem(keyString, value);
    },
    [keyString]
  );

  return [state, updateState, isLoading];
};
