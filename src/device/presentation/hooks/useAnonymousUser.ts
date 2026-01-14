/**
 * Anonymous User Hook
 *
 * Provides persistent device-based user ID for anonymous users.
 * Uses iOS Keychain with AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY for:
 * - Stable ID across app restarts and reinstalls
 * - Device-specific (no backup migration)
 * - Compatible with Firebase Anonymous Auth
 *
 * @domain device
 * @layer presentation/hooks
 */

import { useState, useEffect, useCallback } from 'react';
import { PersistentDeviceIdService } from '../../infrastructure/services/PersistentDeviceIdService';
import { DeviceService } from '../../infrastructure/services/DeviceService';
import type {
  AnonymousUser,
  UseAnonymousUserOptions,
  UseAnonymousUserResult,
} from '../../domain/types/AnonymousUserTypes';

/**
 * useAnonymousUser hook for persistent device-based user identification
 *
 * USAGE:
 * ```typescript
 * import { useAnonymousUser } from '@umituz/react-native-design-system';
 *
 * const { anonymousUser, isLoading } = useAnonymousUser();
 *
 * // Use for subscription services
 * await subscriptionService.initialize(anonymousUser?.userId);
 *
 * // Use in SettingsScreen
 * <UserProfileHeader
 *   userId={anonymousUser?.userId}
 *   displayName={anonymousUser?.displayName}
 *   isAnonymous={anonymousUser?.isAnonymous}
 * />
 * ```
 */
export const useAnonymousUser = (
  options?: UseAnonymousUserOptions
): UseAnonymousUserResult => {
  const [anonymousUser, setAnonymousUser] = useState<AnonymousUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    anonymousDisplayName = 'Anonymous',
    fallbackUserId = 'anonymous_fallback',
  } = options || {};

  const loadAnonymousUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [userId, deviceName] = await Promise.all([
        PersistentDeviceIdService.getDeviceId(),
        DeviceService.getUserFriendlyId(),
      ]);

      setAnonymousUser({
        userId: userId || fallbackUserId,
        deviceName: deviceName || 'Unknown Device',
        displayName: anonymousDisplayName,
        isAnonymous: true,
      });
    } catch {
      setAnonymousUser({
        userId: fallbackUserId,
        deviceName: 'Unknown Device',
        displayName: anonymousDisplayName,
        isAnonymous: true,
      });
      setError('Failed to generate device ID');
    } finally {
      setIsLoading(false);
    }
  }, [anonymousDisplayName, fallbackUserId]);

  const refresh = useCallback(async () => {
    await loadAnonymousUser();
  }, [loadAnonymousUser]);

  useEffect(() => {
    loadAnonymousUser();
  }, [loadAnonymousUser]);

  return {
    anonymousUser,
    isLoading,
    error,
    refresh,
  };
};
