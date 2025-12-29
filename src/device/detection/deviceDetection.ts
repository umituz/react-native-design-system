/**
 * Device Detection Utilities
 *
 * Utilities for detecting device types and screen dimensions.
 * Follows universal design principles for cross-platform compatibility.
 */

import { Dimensions } from 'react-native';
import { DEVICE_BREAKPOINTS, LAYOUT_CONSTANTS } from '../../responsive/config';
import { validateScreenDimensions } from '../../responsive/validation';

/**
 * Helper function for device detection with fallback
 * @param operation - Operation to perform
 * @param fallback - Fallback value if operation fails
 * @returns Operation result or fallback
 */
const withDeviceDetectionFallback = <T>(
  operation: () => T,
  fallback: T
): T => {
  try {
    return operation();
  } catch {
    return fallback;
  }
};

/**
 * Device type enum for conditional rendering
 */
export enum DeviceType {
  SMALL_PHONE = 'SMALL_PHONE',
  MEDIUM_PHONE = 'MEDIUM_PHONE',
  LARGE_PHONE = 'LARGE_PHONE',
  TABLET = 'TABLET',
}

/**
 * Get current screen dimensions
 * @returns Screen width and height
 * @throws ResponsiveValidationError if dimensions are invalid
 */
export const getScreenDimensions = () => {
  const { width, height } = Dimensions.get('window');

  try {
    validateScreenDimensions(width, height);
    return { width, height };
  } catch {
    // Fallback to safe default dimensions
    return { width: 414, height: 896 };
  }
};

/**
 * Check if current device is a small phone (iPhone 13 mini, SE)
 * @returns true if device is a small phone
 */
export const isSmallPhone = (): boolean => {
  return withDeviceDetectionFallback(
    () => {
      const { width } = getScreenDimensions();
      return width <= DEVICE_BREAKPOINTS.SMALL_PHONE;
    },
    false
  );
};

/**
 * Check if current device is a tablet (iPad)
 * @returns true if device is a tablet
 */
export const isTablet = (): boolean => {
  return withDeviceDetectionFallback(
    () => {
      const { width } = getScreenDimensions();
      return width >= DEVICE_BREAKPOINTS.SMALL_TABLET;
    },
    false
  );
};

/**
 * Check if device is in landscape mode
 * @returns true if device is in landscape orientation
 */
export const isLandscape = (): boolean => {
  return withDeviceDetectionFallback(
    () => {
      const { width, height } = getScreenDimensions();
      return width > height;
    },
    false
  );
};

/**
 * Get current device type
 * @returns Device type enum value
 */
export const getDeviceType = (): DeviceType => {
  return withDeviceDetectionFallback(
    () => {
      const { width } = getScreenDimensions();

      if (width <= DEVICE_BREAKPOINTS.SMALL_PHONE) {
        return DeviceType.SMALL_PHONE;
      } else if (width <= DEVICE_BREAKPOINTS.MEDIUM_PHONE) {
        return DeviceType.MEDIUM_PHONE;
      } else if (width <= DEVICE_BREAKPOINTS.LARGE_PHONE) {
        return DeviceType.LARGE_PHONE;
      }

      return DeviceType.TABLET;
    },
    DeviceType.MEDIUM_PHONE
  );
};

/**
 * Responsive spacing multiplier
 * Returns a multiplier for spacing based on device size
 *
 * @returns Spacing multiplier (0.9-1.2)
 */
export const getSpacingMultiplier = (): number => {
  return withDeviceDetectionFallback(
    () => {
      const { width } = getScreenDimensions();

      if (width <= DEVICE_BREAKPOINTS.SMALL_PHONE) {
        return LAYOUT_CONSTANTS.SPACING_MULTIPLIER_SMALL;
      } else if (width >= DEVICE_BREAKPOINTS.TABLET) {
        return LAYOUT_CONSTANTS.SPACING_MULTIPLIER_TABLET;
      }

      return LAYOUT_CONSTANTS.SPACING_MULTIPLIER_STANDARD;
    },
    LAYOUT_CONSTANTS.SPACING_MULTIPLIER_STANDARD
  );
};