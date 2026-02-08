/**
 * Device Domain - useDeviceInfo Hook
 *
 * React hook for device and application information.
 * Provides device details with state management.
 *
 * @domain device
 * @layer presentation/hooks
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { DeviceService } from '../../infrastructure/services/DeviceService';
import { PersistentDeviceIdService } from '../../infrastructure/services/PersistentDeviceIdService';
import type { DeviceInfo, ApplicationInfo, SystemInfo } from '../../domain/entities/Device';


/**
 * useDeviceInfo hook for device and application information
 */
export const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [appInfo, setAppInfo] = useState<ApplicationInfo | null>(null);
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isMountedRef = useRef(true);

  /**
   * Load all device and app information
   */
  const loadInfo = useCallback(async () => {
    if (!isMountedRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const system = await DeviceService.getSystemInfo();

      if (isMountedRef.current) {
        setSystemInfo(system);
        setDeviceInfo(system.device);
        setAppInfo(system.application);
      }
    } catch (err) {
      if (isMountedRef.current) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load device info';
        setError(errorMessage);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  /**
   * Load device info only
   */
  const loadDeviceInfo = useCallback(async () => {
    if (!isMountedRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const info = await DeviceService.getDeviceInfo();

      if (isMountedRef.current) {
        setDeviceInfo(info);
      }
    } catch (err) {
      if (isMountedRef.current) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load device info';
        setError(errorMessage);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  /**
   * Load app info only
   */
  const loadAppInfo = useCallback(async () => {
    if (!isMountedRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const info = await DeviceService.getApplicationInfo();

      if (isMountedRef.current) {
        setAppInfo(info);
      }
    } catch (err) {
      if (isMountedRef.current) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load app info';
        setError(errorMessage);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  /**
   * Refresh all info
   */
  const refresh = useCallback(async () => {
    await loadInfo();
  }, [loadInfo]);

  /**
   * Load info on mount
   */
  useEffect(() => {
    isMountedRef.current = true;
    loadInfo();

    return () => {
      isMountedRef.current = false;
    };
  }, [loadInfo]);

  return {
    // Data
    deviceInfo,
    appInfo,
    systemInfo,

    // State
    isLoading,
    error,

    // Functions
    refresh,
    loadDeviceInfo,
    loadAppInfo,
  };
};

/**
 * useDeviceCapabilities hook for device feature detection
 */
export const useDeviceCapabilities = () => {
  const [isDevice, setIsDevice] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [hasNotch, setHasNotch] = useState(false);
  const [totalMemoryGB, setTotalMemoryGB] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCapabilities = async () => {
      setIsLoading(true);

      try {
        const capabilities = await DeviceService.getDeviceCapabilities();
        setIsDevice(capabilities.isDevice);
        setIsTablet(capabilities.isTablet);
        setHasNotch(capabilities.hasNotch);
        setTotalMemoryGB(capabilities.totalMemoryGB);
      } catch {
        setIsDevice(false);
        setIsTablet(false);
        setHasNotch(false);
        setTotalMemoryGB(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadCapabilities();
  }, []);

  return {
    isDevice,
    isTablet,
    hasNotch,
    totalMemoryGB,
    isLoading,
  };
};

/**
 * useDeviceId hook for persistent device identifier
 *
 * Returns device ID that survives app reinstalls (SecureStore).
 * WARNING: Use with caution - user privacy considerations!
 */
export const useDeviceId = () => {
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDeviceId = async () => {
      setIsLoading(true);

      try {
        const id = await PersistentDeviceIdService.getDeviceId();
        setDeviceId(id);
      } catch {
        setDeviceId(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadDeviceId();
  }, []);

  return {
    deviceId,
    isLoading,
  };
};
