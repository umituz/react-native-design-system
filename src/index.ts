/**
 * @umituz/react-native-design-system
 * 
 * Universal design system for React Native apps
 * Re-exports from individual packages for convenience
 */

// =============================================================================
// COMMON STYLES - Re-export from @umituz/react-native-design-system-theme
// =============================================================================
export {
  useCommonStyles,
} from '@umituz/react-native-design-system-theme';

// =============================================================================
// VARIANTS UTILITIES - Own utilities
// =============================================================================
export {
  createVariants,
  type VariantConfig,
  type VariantProps,
} from './presentation/utils/variants/core';

export {
  createAdvancedVariants,
  type AdvancedVariantConfig,
  type CompoundVariant,
} from './presentation/utils/variants/compound';

export {
  conditionalStyle,
  responsiveStyle,
  combineStyles,
} from './presentation/utils/variants/helpers';

// =============================================================================
// ATOMS - Re-export from @umituz/react-native-design-system-atoms
// =============================================================================
export {
  AtomicText,
  AtomicIcon,
  AtomicButton,
  AtomicInput,
  AtomicCard,
  AtomicFab,
  AtomicSearchBar,
  type IconName,
} from '@umituz/react-native-design-system-atoms';

// Alias for backward compatibility
export { AtomicIcon as Icon } from '@umituz/react-native-design-system-atoms';

// =============================================================================
// ORGANISMS - Re-export from @umituz/react-native-design-system-organisms
// =============================================================================
export {
  ScreenLayout,
} from '@umituz/react-native-design-system-organisms';

// =============================================================================
// MOLECULES - Re-export from @umituz/react-native-design-system-molecules
// =============================================================================
export {
  EmptyState,
  FormField,
  ListItem,
  SearchBar,
  SectionCard,
  IconContainer,
  ScreenHeader,
  SectionHeader,
  SectionContainer,
  GridContainer,
  ConfirmationModal,
  useConfirmationModal,
} from '@umituz/react-native-design-system-molecules';

// =============================================================================
// RESPONSIVE - Re-export from @umituz/react-native-design-system-responsive
// =============================================================================
export {
  useResponsive,
  useResponsiveSizes,
  useDeviceType,
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
  getResponsiveIconContainerSize,
  getResponsiveGridColumns,
  getResponsiveMaxWidth,
  getResponsiveFontSize,
  isLandscape,
  getKeyboardBehavior,
  getDeviceType,
  getMinTouchTargetSize,
  getSpacingMultiplier,
  getOnboardingIconMarginTop,
  getOnboardingIconMarginBottom,
  getOnboardingTitleMarginBottom,
  getOnboardingTextPadding,
  getOnboardingDescriptionMarginTop,
  IOS_HIG,
  ANDROID_MATERIAL,
  PLATFORM_CONSTANTS,
  isValidTouchTarget,
  getMinTouchTarget,
  DeviceType,
} from '@umituz/react-native-design-system-responsive';

// =============================================================================
// LOADING - Re-export from @umituz/react-native-loading
// =============================================================================
export {
  LoadingState,
  SkeletonLoader,
  useLoading,
  useSimpleLoading,
  SIZE_CONFIGS,
  SKELETON_PATTERNS,
  DEFAULT_LOADING_EMOJI,
} from '@umituz/react-native-loading';

// =============================================================================
// THEME - Re-export from @umituz/react-native-design-system-theme
// =============================================================================
export {
  useAppDesignTokens,
  STATIC_TOKENS,
  type DesignTokens,
  withAlpha,
} from '@umituz/react-native-design-system-theme';
