/**
 * Tab Bar Configuration
 */

import { isTablet } from '../../device/detection';
import { validateSafeAreaInsets } from '../validation';

const TAB_BAR_CONSTANTS = {
  BASE_HEIGHT_PHONE: 60,
  BASE_HEIGHT_TABLET: 70,
  MIN_PADDING_BOTTOM: 8,
  MIN_PADDING_TOP: 8,
  ICON_SIZE_PHONE: 24,
  ICON_SIZE_TABLET: 28,
  FAB_SIZE_PHONE: 64,
  FAB_SIZE_TABLET: 72,
  FAB_OFFSET_Y_PHONE: -24,
  FAB_OFFSET_Y_TABLET: -28,
} as const;

export interface ResponsiveTabBarConfig {
  readonly height: number;
  readonly paddingBottom: number;
  readonly paddingTop: number;
  readonly iconSize: number;
  readonly fabSize: number;
  readonly fabOffsetY: number;
}

export const getResponsiveTabBarHeight = (
  insets: { bottom?: number } = { bottom: 0 }
): number => {
  try {
    validateSafeAreaInsets(insets);
    const { bottom = 0 } = insets;
    const isTabletDevice = isTablet();

    const baseHeight = isTabletDevice
      ? TAB_BAR_CONSTANTS.BASE_HEIGHT_TABLET
      : TAB_BAR_CONSTANTS.BASE_HEIGHT_PHONE;

    const bottomPadding = Math.max(bottom, TAB_BAR_CONSTANTS.MIN_PADDING_BOTTOM);

    return baseHeight + bottomPadding;
  } catch {
    return TAB_BAR_CONSTANTS.BASE_HEIGHT_PHONE + TAB_BAR_CONSTANTS.MIN_PADDING_BOTTOM;
  }
};

export const getResponsiveTabBarConfig = (
  insets: { bottom?: number } = { bottom: 0 }
): ResponsiveTabBarConfig => {
  try {
    validateSafeAreaInsets(insets);
    const { bottom = 0 } = insets;
    const isTabletSize = isTablet();

    const baseHeight = isTabletSize
      ? TAB_BAR_CONSTANTS.BASE_HEIGHT_TABLET
      : TAB_BAR_CONSTANTS.BASE_HEIGHT_PHONE;

    const paddingBottom = Math.max(bottom, TAB_BAR_CONSTANTS.MIN_PADDING_BOTTOM);

    return {
      height: baseHeight + paddingBottom,
      paddingBottom,
      paddingTop: TAB_BAR_CONSTANTS.MIN_PADDING_TOP,
      iconSize: isTabletSize
        ? TAB_BAR_CONSTANTS.ICON_SIZE_TABLET
        : TAB_BAR_CONSTANTS.ICON_SIZE_PHONE,
      fabSize: isTabletSize
        ? TAB_BAR_CONSTANTS.FAB_SIZE_TABLET
        : TAB_BAR_CONSTANTS.FAB_SIZE_PHONE,
      fabOffsetY: isTabletSize
        ? TAB_BAR_CONSTANTS.FAB_OFFSET_Y_TABLET
        : TAB_BAR_CONSTANTS.FAB_OFFSET_Y_PHONE,
    };
  } catch {
    return {
      height: TAB_BAR_CONSTANTS.BASE_HEIGHT_PHONE + TAB_BAR_CONSTANTS.MIN_PADDING_BOTTOM,
      paddingBottom: TAB_BAR_CONSTANTS.MIN_PADDING_BOTTOM,
      paddingTop: TAB_BAR_CONSTANTS.MIN_PADDING_TOP,
      iconSize: TAB_BAR_CONSTANTS.ICON_SIZE_PHONE,
      fabSize: TAB_BAR_CONSTANTS.FAB_SIZE_PHONE,
      fabOffsetY: TAB_BAR_CONSTANTS.FAB_OFFSET_Y_PHONE,
    };
  }
};
