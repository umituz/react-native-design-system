/**
 * Responsive Modal Utilities
 * Modal, bottom sheet, and dialog layout utilities.
 */

import { getScreenDimensions } from '@device/detection';
import {
  DEVICE_BREAKPOINTS,
  LAYOUT_CONSTANTS,
  HEIGHT_THRESHOLDS,
  SIZE_CONSTRAINTS,
  MODAL_CONFIG,
} from './config';

export interface ResponsiveModalLayout {
  width: number;
  height: number;
  maxWidth: number;
  borderRadius: number;
  backdropOpacity: number;
  horizontalPadding: number;
}

export interface ResponsiveBottomSheetLayout {
  minHeight: number;
  maxHeight: number;
  borderRadius: number;
}

export interface ResponsiveDialogLayout {
  width: number;
  maxHeight: number;
  borderRadius: number;
}

export const getResponsiveModalMaxHeight = (): string => {
  try {
    const { height } = getScreenDimensions();

    if (height <= HEIGHT_THRESHOLDS.SMALL_DEVICE) {
      return LAYOUT_CONSTANTS.MODAL_HEIGHT_SMALL;
    } else if (height >= HEIGHT_THRESHOLDS.LARGE_DEVICE) {
      return LAYOUT_CONSTANTS.MODAL_HEIGHT_TABLET;
    }

    return LAYOUT_CONSTANTS.MODAL_HEIGHT_STANDARD;
  } catch {
    return '70%';
  }
};

export const getResponsiveMinModalHeight = (): number => {
  try {
    const { height } = getScreenDimensions();

    if (height <= HEIGHT_THRESHOLDS.SMALL_DEVICE) {
      const calculatedHeight = height * 0.4;
      return Math.max(calculatedHeight, SIZE_CONSTRAINTS.MODAL_MIN_SMALL);
    } else if (height >= HEIGHT_THRESHOLDS.LARGE_DEVICE) {
      const calculatedHeight = height * 0.35;
      return Math.min(
        Math.max(calculatedHeight, SIZE_CONSTRAINTS.MODAL_MIN_TABLET),
        SIZE_CONSTRAINTS.MODAL_MAX_TABLET
      );
    }

    const calculatedHeight = height * 0.45;
    return Math.max(calculatedHeight, SIZE_CONSTRAINTS.MODAL_MIN_STANDARD);
  } catch {
    return 300;
  }
};

export const getResponsiveModalWidth = (): number => {
  try {
    const { width } = getScreenDimensions();
    const isTabletDevice = width >= DEVICE_BREAKPOINTS.TABLET;

    const widthPercent = isTabletDevice
      ? MODAL_CONFIG.WIDTH_PERCENT_TABLET
      : MODAL_CONFIG.WIDTH_PERCENT_PHONE;

    const maxWidth = isTabletDevice
      ? MODAL_CONFIG.MAX_WIDTH_TABLET
      : MODAL_CONFIG.MAX_WIDTH_PHONE;

    return Math.min(width * widthPercent, maxWidth);
  } catch {
    return 400;
  }
};

export const getResponsiveModalHeight = (): number => {
  try {
    const { width, height } = getScreenDimensions();
    const isTabletDevice = width >= DEVICE_BREAKPOINTS.TABLET;

    if (isTabletDevice) {
      return height * MODAL_CONFIG.HEIGHT_PERCENT_TABLET;
    }

    if (height <= HEIGHT_THRESHOLDS.SMALL_DEVICE) {
      return height * MODAL_CONFIG.HEIGHT_PERCENT_SMALL;
    }

    return height * MODAL_CONFIG.HEIGHT_PERCENT_STANDARD;
  } catch {
    return 600;
  }
};

export const getResponsiveModalBorderRadius = (): number => {
  try {
    const { width } = getScreenDimensions();
    const isTabletDevice = width >= DEVICE_BREAKPOINTS.TABLET;

    return isTabletDevice
      ? MODAL_CONFIG.BORDER_RADIUS_TABLET
      : MODAL_CONFIG.BORDER_RADIUS_PHONE;
  } catch {
    return 32;
  }
};

export const getResponsiveModalMaxWidth = (): number => {
  try {
    const { width } = getScreenDimensions();
    const isTabletDevice = width >= DEVICE_BREAKPOINTS.TABLET;

    return isTabletDevice
      ? MODAL_CONFIG.MAX_WIDTH_TABLET
      : MODAL_CONFIG.MAX_WIDTH_PHONE;
  } catch {
    return 480;
  }
};

export const getResponsiveBackdropOpacity = (): number => {
  return MODAL_CONFIG.BACKDROP_OPACITY_DEFAULT;
};

export const getResponsiveModalLayout = (): ResponsiveModalLayout => {
  const { width } = getScreenDimensions();
  const isTabletDevice = width >= DEVICE_BREAKPOINTS.TABLET;

  return {
    width: getResponsiveModalWidth(),
    height: getResponsiveModalHeight(),
    maxWidth: getResponsiveModalMaxWidth(),
    borderRadius: getResponsiveModalBorderRadius(),
    backdropOpacity: getResponsiveBackdropOpacity(),
    horizontalPadding: isTabletDevice
      ? LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE * 1.5
      : LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE,
  };
};

export const getResponsiveBottomSheetLayout = (): ResponsiveBottomSheetLayout => {
  const { height } = getScreenDimensions();

  return {
    minHeight: MODAL_CONFIG.BOTTOM_SHEET_MIN_HEIGHT,
    maxHeight: height * MODAL_CONFIG.BOTTOM_SHEET_MAX_HEIGHT_PERCENT,
    borderRadius: getResponsiveModalBorderRadius(),
  };
};

export const getResponsiveDialogLayout = (): ResponsiveDialogLayout => {
  const { width, height } = getScreenDimensions();

  return {
    width: Math.min(
      width * MODAL_CONFIG.DIALOG_WIDTH_PERCENT,
      MODAL_CONFIG.DIALOG_MAX_WIDTH
    ),
    maxHeight: height * MODAL_CONFIG.DIALOG_MAX_HEIGHT_PERCENT,
    borderRadius: getResponsiveModalBorderRadius(),
  };
};
