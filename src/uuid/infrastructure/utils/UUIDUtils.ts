/**
 * UUID Generation Utility
 *
 * Provides cross-platform UUID generation using expo-crypto.
 * Compatible with React Native (iOS, Android) and Web.
 */

import * as Crypto from 'expo-crypto';
import type { UUID } from '../../types/UUID';
import { UUID_CONSTANTS } from '../../types/UUID';

/**
 * Generate a v4 UUID
 * Uses expo-crypto's randomUUID() for secure UUID generation
 *
 * @returns A v4 UUID string
 *
 * @example
 * ```typescript
 * import { generateUUID } from '@umituz/react-native-uuid';
 *
 * const id = generateUUID();
 * // Returns: "550e8400-e29b-41d4-a716-446655440000"
 * ```
 */
export const generateUUID = (): UUID => {
  return Crypto.randomUUID() as UUID;
};

/**
 * Validate UUID format
 * Checks if a string is a valid v4 UUID
 *
 * @param value - The value to validate
 * @returns True if the value is a valid v4 UUID
 *
 * @example
 * ```typescript
 * import { isValidUUID } from '@umituz/react-native-uuid';
 *
 * isValidUUID('550e8400-e29b-41d4-a716-446655440000'); // true
 * isValidUUID('invalid-uuid'); // false
 * ```
 */
export const isValidUUID = (value: string): value is UUID => {
  return UUID_CONSTANTS.PATTERN.test(value);
};

/**
 * Get version from UUID string
 * Returns the UUID version number (1-5) or null for NIL/invalid
 *
 * @param value - The UUID string
 * @returns UUID version number or null
 *
 * @example
 * ```typescript
 * import { getUUIDVersion } from '@umituz/react-native-uuid';
 *
 * getUUIDVersion('550e8400-e29b-41d4-a716-446655440000'); // 4
 * getUUIDVersion('00000000-0000-0000-0000-000000000000'); // 0 (NIL)
 * getUUIDVersion('invalid'); // null
 * ```
 */
export const getUUIDVersion = (value: string): number | null => {
  if (value === UUID_CONSTANTS.NIL) {
    return 0;
  }

  const versionChar = value.charAt(14);
  const version = parseInt(versionChar, 10);

  return (version >= 1 && version <= 5) ? version : null;
};

