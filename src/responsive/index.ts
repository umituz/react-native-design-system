/**
 * @umituz/react-native-design-system/responsive - Public API
 *
 * Responsive sizing and layout utilities for React Native.
 * For device detection, use '@umituz/react-native-design-system/device'.
 */

// Hook exports
export { useResponsive } from './useResponsive';
export type { UseResponsiveReturn } from './useResponsive';

// Responsive sizing utilities
export {
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
  MODAL_CONFIG,
} from './responsive';

// Re-export from device for backward compatibility
export {
  DeviceType,
  getScreenDimensions,
  isSmallPhone,
  isTablet,
  isLandscape,
  getDeviceType,
  getSpacingMultiplier,
  isIPad,
  isIPadMini,
  isIPadPro,
  isIPadLandscape,
  IPAD_BREAKPOINTS,
  TOUCH_TARGETS,
  CONTENT_WIDTH_CONSTRAINTS,
  IPAD_LAYOUT_CONFIG,
  getContentMaxWidth,
  getIPadGridColumns,
  getTouchTargetSize,
  getIPadScreenPadding,
  getIPadFontScale,
  getIPadLayoutInfo,
  type IPadLayoutInfo,
  getIPadModalDimensions,
  getPaywallDimensions,
  type ModalDimensions,
  type PaywallDimensions,
} from '../device/detection';

// Platform constants
export {
  IOS_HIG,
  PLATFORM_CONSTANTS,
  isValidTouchTarget,
  getMinTouchTarget,
} from './platformConstants';

// Config exports
export { DEVICE_BREAKPOINTS } from './config';
