/**
 * Store Factory
 * Create Zustand stores with AsyncStorage persistence and actions
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { StoreApi } from 'zustand';
import type { StoreConfig } from '../types/Store';

/**
 * Create a Zustand store with optional persistence and actions
 */
export function createStore<
  TState extends object,
  TActions extends object = object
>(config: StoreConfig<TState, TActions>) {
  type Store = TState & TActions;
  type SetState = StoreApi<Store>['setState'];
  type GetState = StoreApi<Store>['getState'];

  const stateCreator = (set: SetState, get: GetState): Store => {
    const state = config.initialState as TState;
    const actions = config.actions
      ? config.actions(set, get)
      : ({} as TActions);
    return { ...state, ...actions } as Store;
  };

  if (!config.persist) {
    return create<Store>(stateCreator);
  }

  return create<Store>()(
    persist<Store>(stateCreator, {
      name: config.name,
      storage: config.storage ? createJSONStorage(() => config.storage!) : undefined,
      version: config.version || 1,
      partialize: (config.partialize
        ? (state: Store) => config.partialize!(state)
        : (state: Store) => {
            const persisted: Record<string, unknown> = {};
            for (const key of Object.keys(state)) {
              if (typeof state[key as keyof Store] !== 'function') {
                persisted[key] = state[key as keyof Store];
              }
            }
            return persisted;
          }) as (state: Store) => Store,
      onRehydrateStorage: () => (state: Store | undefined) => {
        if (state && config.onRehydrate) {
          config.onRehydrate(state);
        }
      },
      migrate: config.migrate as ((persistedState: unknown, version: number) => Store | Promise<Store>),
    })
  );
}
