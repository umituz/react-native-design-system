/**
 * useOffline Hook
 * Primary hook for accessing offline state in components
 * Automatically subscribes to network changes via expo-network
 */

import { useEffect, useCallback, useRef, useMemo } from 'react';
import * as Network from 'expo-network';
import type { NetworkState as ExpoNetworkState } from 'expo-network';
import type { NetworkState, OfflineConfig } from '../../types';
import { useOfflineStore } from '../../infrastructure/storage/OfflineStore';
import { networkEvents } from '../../infrastructure/events/NetworkEvents';

/**
 * Convert expo-network state to our internal format
 */
const toNetworkState = (state: ExpoNetworkState): NetworkState => ({
  type: state.type?.toString() ?? 'unknown',
  isConnected: state.isConnected ?? false,
  isInternetReachable: state.isInternetReachable ?? null,
  details: null,
});

let globalConfig: OfflineConfig = {};

export const configureOffline = (config: OfflineConfig): void => {
  globalConfig = config;
};

export const useOffline = (config?: OfflineConfig) => {
  const store = useOfflineStore();
  const isInitialized = useRef(false);
  const previousStateRef = useRef<NetworkState | null>(null);
  const isMountedRef = useRef(true);

  // Memoize merged config to prevent unnecessary effect re-runs
  const mergedConfig = useMemo(
    () => ({ ...globalConfig, ...config }),
    [config]
  );

  const handleNetworkStateChange = useCallback((state: ExpoNetworkState) => {
    const networkState = toNetworkState(state);
    const wasOnline = previousStateRef.current?.isConnected ?? false;
    const isNowOnline = networkState.isConnected ?? false;

    store.updateNetworkState(networkState);

    if (wasOnline !== isNowOnline) {
      if (isNowOnline) {
        networkEvents.emit('online', networkState);
      } else {
        networkEvents.emit('offline', networkState);
      }
    }

    networkEvents.emit('change', networkState);
    previousStateRef.current = networkState;
  }, [store, previousStateRef]);

  useEffect(() => {
    if (isInitialized.current) return;

    isMountedRef.current = true;

    Network.getNetworkStateAsync()
      .then((state: ExpoNetworkState) => {
        if (isMountedRef.current) {
          handleNetworkStateChange(state);
          isInitialized.current = true;
        }
      })
      .catch((_error: Error) => {
        if (isMountedRef.current && (__DEV__ || mergedConfig.debug)) {
          console.error('[DesignSystem] useOffline: Failed to get initial network state', _error);
        }
      });

    const subscription = Network.addNetworkStateListener(handleNetworkStateChange);

    return () => {
      isMountedRef.current = false;
      subscription.remove();
      isInitialized.current = false;
    };
  }, [handleNetworkStateChange, mergedConfig.debug]);

  return {
    isOnline: store.isOnline,
    isOffline: store.isOffline,
    connectionType: store.connectionType,
    isInternetReachable: store.isInternetReachable,
    lastOnlineAt: store.lastOnlineAt,
    lastOfflineAt: store.lastOfflineAt,
    connectionQuality: store.connectionQuality,
    hasConnection: store.isOnline,
    hasInternet: store.isOnline && store.isInternetReachable !== false,
  };
};
