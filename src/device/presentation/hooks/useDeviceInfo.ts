/**
 * Device Domain - useDeviceInfo Hook
 *
 * React hook for device and application information.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { DeviceService } from '../../infrastructure/services/DeviceService';
import { PersistentDeviceIdService } from '../../infrastructure/services/PersistentDeviceIdService';
import type { DeviceInfo, ApplicationInfo, SystemInfo } from '../../domain/entities/Device';

function useAsyncData<T, E = string>(
  fetchFn: () => Promise<T>,
  initialData: T | null = null
) {
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<E | null>(null);
  const isMountedRef = useRef(true);

  const execute = useCallback(async () => {
    if (!isMountedRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      if (isMountedRef.current) setData(result);
    } catch (err) {
      if (isMountedRef.current) {
        setError(err instanceof Error ? (err.message as E) : ('Failed to load data' as E));
      }
    } finally {
      if (isMountedRef.current) setIsLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    isMountedRef.current = true;
    execute();
    return () => {
      isMountedRef.current = false;
    };
  }, [execute]);

  return { data, isLoading, error, execute };
}

export const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [appInfo, setAppInfo] = useState<ApplicationInfo | null>(null);
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const isMountedRef = useRef(true);

  const loadInfo = useCallback(async () => {
    if (!isMountedRef.current) return;

    try {
      const system = await DeviceService.getSystemInfo();
      if (isMountedRef.current) {
        setSystemInfo(system);
        setDeviceInfo(system.device);
        setAppInfo(system.application);
      }
    } catch {
      // Silent error handling
    }
  }, []);

  const loadDeviceInfo = useCallback(async () => {
    if (!isMountedRef.current) return;
    try {
      const info = await DeviceService.getDeviceInfo();
      if (isMountedRef.current) setDeviceInfo(info);
    } catch {
      // Silent error handling
    }
  }, []);

  const loadAppInfo = useCallback(async () => {
    if (!isMountedRef.current) return;
    try {
      const info = await DeviceService.getApplicationInfo();
      if (isMountedRef.current) setAppInfo(info);
    } catch {
      // Silent error handling
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    loadInfo();
    return () => {
      isMountedRef.current = false;
    };
  }, [loadInfo]);

  return {
    deviceInfo,
    appInfo,
    systemInfo,
    isLoading: !deviceInfo && !appInfo && !systemInfo,
    error: null,
    refresh: loadInfo,
    loadDeviceInfo,
    loadAppInfo,
  };
};

export const useDeviceCapabilities = () => {
  const { data: capabilities, isLoading } = useAsyncData(DeviceService.getDeviceCapabilities, null);

  return {
    isDevice: capabilities?.isDevice ?? false,
    isTablet: capabilities?.isTablet ?? false,
    hasNotch: capabilities?.hasNotch ?? false,
    totalMemoryGB: capabilities?.totalMemoryGB ?? null,
    isLoading,
  };
};

export const useDeviceId = () => {
  const { data: deviceId, isLoading } = useAsyncData(PersistentDeviceIdService.getDeviceId, null);

  return { deviceId, isLoading };
};
