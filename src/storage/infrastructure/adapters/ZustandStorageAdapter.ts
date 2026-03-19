/**
 * Zustand Storage Adapter
 *
 * Provides AsyncStorage in a format compatible with Zustand persist middleware.
 *
 * AsyncStorage natively supports the Promise-based API that Zustand expects:
 * - getItem: (key: string) => Promise<string | null>
 * - setItem: (key: string, value: string) => Promise<void>
 * - removeItem: (key: string) => Promise<void>
 *
 * This is a centralized export point for Zustand stores throughout the app.
 *
 * @example
 * import { createStore, zustandStorage } from '@umituz/react-native-design-system/storage';
 *
 * const store = createStore({
 *   persist: true,
 *   storage: zustandStorage,
 *   ...
 * });
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Zustand-compatible storage export
 *
 * AsyncStorage instance that can be used directly with Zustand's persist middleware.
 * No wrapping needed - AsyncStorage already provides the correct interface.
 */
export const zustandStorage = AsyncStorage;
