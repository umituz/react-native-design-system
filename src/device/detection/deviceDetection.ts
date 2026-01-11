/**
 * Device Detection Utilities
 *
 * Uses expo-device for primary device type detection (PHONE vs TABLET)
 * and screen dimensions for secondary distinctions (small vs large phone).
 *
 * Benefits:
 * - expo-device uses system-level detection on iOS (100% reliable)
 * - Uses screen diagonal on Android (more accurate than pixels)
 * - Future-proof: new devices automatically detected correctly
 */

import { Dimensions } from 'react-native';
import * as Device from 'expo-device';
import { DEVICE_BREAKPOINTS, LAYOUT_CONSTANTS } from '../../responsive/config';
import { validateScreenDimensions } from '../../responsive/validation';

/**
 * Device type enum for conditional rendering
 * Used for fine-grained phone size distinctions
 */
export enum DeviceType {
  SMALL_PHONE = 'SMALL_PHONE',
  MEDIUM_PHONE = 'MEDIUM_PHONE',
  LARGE_PHONE = 'LARGE_PHONE',
  TABLET = 'TABLET',
}

/**
 * Get current screen dimensions
 */
export const getScreenDimensions = () => {
  const { width, height } = Dimensions.get('window');

  try {
    validateScreenDimensions(width, height);
    return { width, height };
  } catch {
    return { width: 414, height: 896 };
  }
};

/**
 * Check if current device is a tablet
 * Uses expo-device for accurate system-level detection
 */
export const isTablet = (): boolean => {
  return Device.deviceType === Device.DeviceType.TABLET;
};

/**
 * Check if current device is a phone
 * Uses expo-device for accurate system-level detection
 */
export const isPhone = (): boolean => {
  return Device.deviceType === Device.DeviceType.PHONE;
};

/**
 * Check if current device is a small phone (iPhone SE, 13 mini)
 * Uses width breakpoint within phone category
 */
export const isSmallPhone = (offset?: { width: number }): boolean => {
  if (!isPhone()) return false;
  const { width } = offset || getScreenDimensions();
  return width <= DEVICE_BREAKPOINTS.SMALL_PHONE;
};

/**
 * Check if current device is a large phone (Pro Max, Plus models)
 * Uses width breakpoint within phone category
 */
export const isLargePhone = (offset?: { width: number }): boolean => {
  if (!isPhone()) return false;
  const { width } = offset || getScreenDimensions();
  return width >= DEVICE_BREAKPOINTS.MEDIUM_PHONE;
};

/**
 * Check if device is in landscape mode
 */
export const isLandscape = (offset?: { width: number; height: number }): boolean => {
  const { width, height } = offset || getScreenDimensions();
  return width > height;
};

/**
 * Get current device type with fine-grained phone distinctions
 * Uses expo-device for PHONE vs TABLET, width for phone size variants
 */
export const getDeviceType = (offset?: { width: number }): DeviceType => {
  // Use expo-device for primary detection
  if (isTablet()) {
    return DeviceType.TABLET;
  }

  // For phones, use width for size variants
  const { width } = offset || getScreenDimensions();

  if (width <= DEVICE_BREAKPOINTS.SMALL_PHONE) {
    return DeviceType.SMALL_PHONE;
  } else if (width <= DEVICE_BREAKPOINTS.MEDIUM_PHONE) {
    return DeviceType.MEDIUM_PHONE;
  }

  return DeviceType.LARGE_PHONE;
};

/**
 * Responsive spacing multiplier based on device type
 */
export const getSpacingMultiplier = (offset?: { width: number }): number => {
  if (isTablet()) {
    return LAYOUT_CONSTANTS.SPACING_MULTIPLIER_TABLET;
  }

  if (isSmallPhone(offset)) {
    return LAYOUT_CONSTANTS.SPACING_MULTIPLIER_SMALL;
  }

  return LAYOUT_CONSTANTS.SPACING_MULTIPLIER_STANDARD;
};
