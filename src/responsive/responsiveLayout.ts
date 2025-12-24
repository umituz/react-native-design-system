/**
 * Responsive Layout Utilities
 * Layout utilities for positioning and spacing.
 */

import { getScreenDimensions } from '@device/detection';
import { DEVICE_BREAKPOINTS, LAYOUT_CONSTANTS } from './config';
import { validateNumber, validateSafeAreaInsets } from './validation';

/**
 * Responsive horizontal padding
 */
export const getResponsiveHorizontalPadding = (
  basePadding: number = LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE,
  insets: { left?: number; right?: number } = { left: 0, right: 0 }
): number => {
  try {
    const validatedBasePadding = validateNumber(basePadding, 'basePadding', 0, 100);
    validateSafeAreaInsets(insets);

    const { width } = getScreenDimensions();
    const { left = 0, right = 0 } = insets;

    if (width >= DEVICE_BREAKPOINTS.TABLET) {
      const tabletPadding = validatedBasePadding * 1.5;
      return Math.max(
        tabletPadding,
        left + LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE,
        right + LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE
      );
    }

    return Math.max(
      validatedBasePadding,
      left + LAYOUT_CONSTANTS.SAFE_AREA_OFFSET,
      right + LAYOUT_CONSTANTS.SAFE_AREA_OFFSET
    );
  } catch {
    return 16;
  }
};

/**
 * Responsive bottom positioning
 */
export const getResponsiveBottomPosition = (
  basePosition: number = LAYOUT_CONSTANTS.BOTTOM_POSITION_BASE,
  insets: { bottom?: number } = { bottom: 0 }
): number => {
  try {
    const validatedBasePosition = validateNumber(basePosition, 'basePosition', 0, 500);
    validateSafeAreaInsets(insets);

    const { bottom = 0 } = insets;
    return Math.max(validatedBasePosition, bottom + LAYOUT_CONSTANTS.SAFE_AREA_OFFSET);
  } catch {
    return 32;
  }
};

/**
 * Responsive FAB position
 */
export const getResponsiveFABPosition = (
  insets: { bottom?: number; right?: number } = { bottom: 0, right: 0 }
): { bottom: number; right: number } => {
  try {
    validateSafeAreaInsets(insets);
    const { width } = getScreenDimensions();
    const { bottom = 0, right = 0 } = insets;

    if (width >= DEVICE_BREAKPOINTS.TABLET) {
      return {
        bottom: Math.max(
          LAYOUT_CONSTANTS.FAB_BOTTOM_TABLET,
          bottom + LAYOUT_CONSTANTS.TAB_BAR_OFFSET
        ),
        right: Math.max(
          LAYOUT_CONSTANTS.FAB_RIGHT_TABLET,
          right + LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE
        ),
      };
    }

    return {
      bottom: Math.max(
        LAYOUT_CONSTANTS.TAB_BAR_OFFSET,
        bottom + LAYOUT_CONSTANTS.SAFE_AREA_OFFSET
      ),
      right: Math.max(
        LAYOUT_CONSTANTS.FAB_RIGHT_PHONE,
        right + LAYOUT_CONSTANTS.SAFE_AREA_OFFSET
      ),
    };
  } catch {
    return { bottom: 90, right: 20 };
  }
};
