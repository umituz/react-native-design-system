/**
 * useStorageState Hook
 *
 * Domain-Driven Design: Presentation layer hook for state + storage sync
 * Combines React state with automatic storage persistence
 */

import { useState, useCallback, useEffect } from 'react';
import { storageRepository } from '../../infrastructure/repositories/AsyncStorageRepository';
import { unwrap } from '../../domain/entities/StorageResult';
import type { StorageKey } from '../../domain/value-objects/StorageKey';
import { useAsyncOperation } from '../../../utils/hooks';

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

  // Load initial value from storage
  const { data, isLoading } = useAsyncOperation<T, Error>(
    async () => {
      const result = await storageRepository.getItem(keyString, defaultValue);
      return unwrap(result, defaultValue);
    },
    {
      immediate: true,
      initialData: defaultValue,
      errorHandler: (err) => err as Error,
      onSuccess: (value) => setState(value),
    }
  );

  // Sync state with loaded data
  useEffect(() => {
    if (data !== undefined && data !== null) {
      setState(data);
    }
  }, [data]);

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
