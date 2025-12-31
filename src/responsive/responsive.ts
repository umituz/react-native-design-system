/**
 * Responsive Design Utilities
 *
 * Centralized responsive sizing and spacing utilities.
 */

// Responsive sizing
export {
  getResponsiveLogoSize,
  getResponsiveInputHeight,
  getResponsiveIconContainerSize,
  getResponsiveMaxWidth,
  getResponsiveFontSize,
  getResponsiveGridColumns,
  getResponsiveGridCellSize,
  type GridCellSizeConfig,
} from './responsiveSizing';

// Responsive layout
export {
  getResponsiveHorizontalPadding,
  getResponsiveBottomPosition,
  getResponsiveFABPosition,
  getResponsiveTabBarHeight,
  getResponsiveTabBarConfig,
  type ResponsiveTabBarConfig,
} from './responsiveLayout';

// Responsive modal utilities
export {
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
} from './responsiveModal';

// Configuration
export {
  DEVICE_BREAKPOINTS,
  RESPONSIVE_PERCENTAGES,
  SIZE_CONSTRAINTS,
  LAYOUT_CONSTANTS,
  HEIGHT_THRESHOLDS,
  GRID_CONFIG,
  VALIDATION_CONSTRAINTS,
  MODAL_CONFIG,
} from './config';
