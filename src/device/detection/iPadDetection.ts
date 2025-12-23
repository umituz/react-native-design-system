/**
 * iPad Device Detection Utilities
 */

import { Dimensions, Platform } from 'react-native';
import { DEVICE_BREAKPOINTS } from '../../responsive/config';
import { IPAD_BREAKPOINTS } from './iPadBreakpoints';

/**
 * Detect if the current device is an iPad
 */
export function isIPad(): boolean {
    if (Platform.OS !== 'ios') return false;

    const { width, height } = Dimensions.get('window');
    const minDimension = Math.min(width, height);
    return minDimension >= DEVICE_BREAKPOINTS.SMALL_TABLET;
}

/**
 * Detect if the current device is an iPad mini
 */
export function isIPadMini(): boolean {
    if (!isIPad()) return false;

    const { width, height } = Dimensions.get('window');
    const minWidth = Math.min(width, height);
    return minWidth < IPAD_BREAKPOINTS.IPAD_AIR;
}

/**
 * Detect if the current device is an iPad Pro (12.9")
 */
export function isIPadPro(): boolean {
    if (!isIPad()) return false;

    const { width, height } = Dimensions.get('window');
    const minWidth = Math.min(width, height);
    return minWidth >= IPAD_BREAKPOINTS.IPAD_11_PRO;
}

/**
 * Check if device is in landscape orientation
 */
export function isIPadLandscape(): boolean {
    const { width, height } = Dimensions.get('window');
    return width > height;
}
