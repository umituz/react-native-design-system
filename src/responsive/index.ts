/**
 * @umituz/react-native-design-system-responsive - Public API
 *
 * Responsive design utilities for React Native - Screen dimensions, device detection,
 * and responsive sizing utilities following Material Design 3 and iOS HIG principles.
 *
 * Usage:
 * ```typescript
 * import { useResponsive, isTablet, getResponsiveLogoSize } from '@umituz/react-native-design-system-responsive';
 * ```
 */

// Hook exports
export { useResponsive } from './useResponsive';
export type { UseResponsiveReturn } from './useResponsive';

// Utility function exports
export {
  getScreenDimensions,
  isSmallPhone,
  isTablet,
  getResponsiveLogoSize,
  getResponsiveInputHeight,
  getResponsiveHorizontalPadding,
  getResponsiveBottomPosition,
  getResponsiveFABPosition,
  getResponsiveModalMaxHeight,
  getResponsiveMinModalHeight,
  getResponsiveModalWidth,
  getResponsiveModalHeight,
  getResponsiveModalBorderRadius,
  getResponsiveModalMaxWidth,
  getResponsiveBackdropOpacity,
  getResponsiveModalLayout,
  getResponsiveBottomSheetLayout,
  getResponsiveDialogLayout,
  type ResponsiveModalLayout,
  type ResponsiveBottomSheetLayout,
  type ResponsiveDialogLayout,
  getResponsiveIconContainerSize,
  getResponsiveGridColumns,
  getResponsiveGridCellSize,
  type GridCellSizeConfig,
  getResponsiveMaxWidth,
  getResponsiveFontSize,
  isLandscape,
  getDeviceType,
  DeviceType,
  MODAL_CONFIG,
} from './responsive';

// Device detection exports
export { getSpacingMultiplier } from './deviceDetection';



// Platform constants exports
export {
  IOS_HIG,
  PLATFORM_CONSTANTS,
  isValidTouchTarget,
  getMinTouchTarget,
} from './platformConstants';

// iPad-specific exports
export {
  IPAD_BREAKPOINTS,
  TOUCH_TARGETS,
  CONTENT_WIDTH_CONSTRAINTS,
  IPAD_LAYOUT_CONFIG,
} from './iPadBreakpoints';

export {
  isIPad,
  isIPadMini,
  isIPadPro,
  isIPadLandscape,
} from './iPadDetection';

export {
  getContentMaxWidth,
  getIPadGridColumns,
  getTouchTargetSize,
  getIPadScreenPadding,
  getIPadFontScale,
  getIPadLayoutInfo,
  type IPadLayoutInfo,
} from './iPadLayoutUtils';

export {
  getIPadModalDimensions,
  getPaywallDimensions,
  type ModalDimensions,
  type PaywallDimensions,
} from './iPadModalUtils';
