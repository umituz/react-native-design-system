/**
 * @umituz/react-native-design-system
 * Universal design system for React Native apps
 *
 * Consolidated package including:
 * - Atoms (primitive UI components)
 * - Molecules (composite components)
 * - Organisms (complex UI patterns)
 * - Theme (design tokens, colors)
 * - Typography (text styles)
 * - Responsive (screen utilities)
 * - Safe Area (safe area utilities and hooks)
 */

// =============================================================================
// THEME EXPORTS
// =============================================================================

export {
  useAppDesignTokens,
  useResponsiveDesignTokens,
  useCommonStyles,
  useDesignSystemTheme,
  useTheme,
  useThemedStyles,
  useThemedStyleSheet,
  lightColors,
  darkColors,
  getColorPalette,
  withAlpha,
  BASE_TOKENS,
  BASE_TOKENS as STATIC_TOKENS,
  spacing,
  typography,
  borders,
  createDesignTokens,
  createResponsiveDesignTokens,
  lightTheme,
  darkTheme,
  createResponsiveValue,
  ThemeStorage,
  createNavigationTheme,
  applyCustomColors,
  type ColorPalette,
  type ThemeMode,
  type CustomThemeColors,
  type Spacing,
  type Typography,
  type Borders,
  type BaseTokens,
  type IconSizes,
  type Opacity,
  type AvatarSizes,
  type ComponentSizes,
  type DesignTokens,
  type ResponsiveDesignTokens,
  type ResponsiveSpacing,
  type ResponsiveTypography,
  type ResponsiveBorderRadius,
  type Theme,
  type ExtendedColorPalette,
  type NavigationTheme,
} from './theme';

// =============================================================================
// TYPOGRAPHY EXPORTS
// =============================================================================

export {
  getTextColor,
  getTextStyle,
  isTextStyleVariant,
  getAllTextStyleVariants,
  clearTypographyCache,
  clearColorCache,
  isValidHexColor,
  isValidRgbColor,
  isValidHslColor,
  isValidNamedColor,
  isValidColor,
  getColorFormat,
  normalizeColor,
  type TextStyleVariant,
  type ColorVariant,
} from './typography';

// =============================================================================
// RESPONSIVE EXPORTS
// =============================================================================

export {
  useResponsive,
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
  getResponsiveIconContainerSize,
  getResponsiveGridColumns,
  getResponsiveMaxWidth,
  getResponsiveFontSize,
  getMinTouchTarget,
  IOS_HIG,
  PLATFORM_CONSTANTS,
  isValidTouchTarget,
  DEVICE_BREAKPOINTS,
  type ResponsiveModalLayout,
  type ResponsiveBottomSheetLayout,
  type ResponsiveDialogLayout,
  type UseResponsiveReturn,
} from './responsive';

// =============================================================================
// DEVICE EXPORTS
// =============================================================================

export {
  // Device detection
  DeviceType,
  getScreenDimensions,
  isSmallPhone,
  isTablet,
  isLandscape,
  getDeviceType,
  getSpacingMultiplier,
  // iPad detection
  isIPad,
  isIPadMini,
  isIPadPro,
  isIPadLandscape,
  IPAD_BREAKPOINTS,
  TOUCH_TARGETS,
  CONTENT_WIDTH_CONSTRAINTS,
  IPAD_LAYOUT_CONFIG,
  // iPad utilities
  getContentMaxWidth,
  getIPadGridColumns,
  getTouchTargetSize,
  getIPadScreenPadding,
  getIPadFontScale,
  getIPadLayoutInfo,
  getIPadModalDimensions,
  getPaywallDimensions,
  type IPadLayoutInfo,
  type ModalDimensions,
  type PaywallDimensions,
  // Device info
  DEVICE_CONSTANTS,
  DeviceUtils,
  DeviceTypeUtils,
  DeviceMemoryUtils,
  DeviceService,
  UserFriendlyIdService,
  PersistentDeviceIdService,
  useDeviceInfo,
  useDeviceCapabilities,
  useDeviceId,
  useAnonymousUser,
  getAnonymousUserId,
  type DeviceInfo,
  type ApplicationInfo,
  type SystemInfo,
  type AnonymousUser,
  type UseAnonymousUserOptions,
} from './device';

// =============================================================================
// ATOMS EXPORTS
// =============================================================================

export {
  AtomicText,
  AtomicIcon,
  AtomicButton,
  AtomicInput,
  AtomicCard,
  AtomicFab,
  AtomicAvatar,
  AtomicChip,
  AtomicProgress,
  AtomicPicker,
  AtomicDatePicker,
  AtomicSkeleton,
  AtomicBadge,
  type IconName,
  type IconSize,
  type IconColor,
  type AtomicTextProps,
  type AtomicIconProps,
  type AtomicButtonProps,
  type ButtonVariant,
  type ButtonSize,
  type AtomicInputProps,
  type AtomicInputVariant,
  type AtomicInputState,
  type AtomicInputSize,
  type AtomicCardProps,
  type AtomicCardVariant,
  type AtomicCardPadding,
  type AtomicFabProps,
  type FabSize,
  type FabVariant,
  type AtomicAvatarProps,
  type AtomicChipProps,
  type AtomicProgressProps,
  type AtomicPickerProps,
  type PickerOption,
  type PickerSize,
  type AtomicDatePickerProps,
  type AtomicSkeletonProps,
  type SkeletonPattern,
  type SkeletonConfig,
  SKELETON_PATTERNS,
  type AtomicBadgeProps,
  type BadgeVariant,
  type BadgeSize,
} from './atoms';

// =============================================================================
// MOLECULES EXPORTS
// =============================================================================

export {
  FormField,
  ListItem,
  SearchBar,
  IconContainer,
  ScreenHeader,
  BaseModal,
  ConfirmationModal,
  useConfirmationModal,
  StepProgress,
  Grid,
  List,
  Container,
  type BaseModalProps,
  type GridProps,
  type ListProps,
  type ContainerProps,
} from './molecules';

// =============================================================================
// ORGANISMS EXPORTS
// =============================================================================

export {
  ScreenLayout,
  AppHeader,
  FormContainer,
  FormLayout,
  type FormLayoutProps,
} from './organisms';

// =============================================================================
// SAFE AREA EXPORTS
// =============================================================================

export * from './safe-area';

// =============================================================================
// VARIANT UTILITIES
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
