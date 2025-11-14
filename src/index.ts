// =============================================================================
// ATOMS - Atomic Design Components
// =============================================================================
export {
  AtomicButton,
  AtomicText,
  AtomicCard,
  AtomicInput,
  AtomicTextArea,
  AtomicPicker,
  AtomicIcon,
  AtomicImage,
  AtomicSwitch,
  AtomicBadge,
  AtomicFormError,
  AtomicAvatar,
  AtomicChip,
  AtomicDivider,
  AtomicProgress,
  AtomicAvatarGroup,
  AtomicFab,
  AtomicFilter,
  AtomicTouchable,
  AtomicNumberInput,
  AtomicDatePicker,
  AtomicSearchBar,
  AtomicSort,
  type AtomicButtonProps,
  type AtomicTextProps,
  type AtomicCardProps,
  type AtomicInputProps,
  type AtomicTextAreaProps,
  type AtomicPickerProps,
  type AtomicIconProps,
  type AtomicImageProps,
  type AtomicSwitchProps,
  type AtomicBadgeProps,
  type AtomicFormErrorProps,
  type AtomicAvatarProps,
  type AtomicChipProps,
  type AtomicDividerProps,
  type AtomicProgressProps,
  type AtomicAvatarGroupProps,
  type AtomicFabProps,
  type AtomicFilterProps,
  type AtomicTouchableProps,
  type AtomicNumberInputProps,
  type AtomicDatePickerProps,
  type AtomicSearchBarProps,
  type AtomicSortProps,
  type IconName,
  type IconSize,
  type IconColor,
} from '@umituz/react-native-design-system-atoms';

// Icon alias
export {
  AtomicIcon as Icon,
  type AtomicIconProps as IconProps,
} from '@umituz/react-native-design-system-atoms';

// =============================================================================
// MOLECULES - Composite Components
// =============================================================================
export {
  FormField,
  ListItem,
  SearchBar,
  SectionCard,
  IconContainer,
  ScreenHeader,
  EmptyState,
  SectionHeader,
  SectionContainer,
  GridContainer,
  ConfirmationModal,
  useConfirmationModal,
  type FormFieldProps,
  type ListItemProps,
  type SearchBarProps,
  type ScreenHeaderProps,
  type ConfirmationModalProps,
  type ConfirmationModalVariant,
} from '@umituz/react-native-design-system-molecules';

// ConfirmationModal alias
export {
  ConfirmationModal as AtomicConfirmationModal,
  type ConfirmationModalProps as AtomicConfirmationModalProps,
} from '@umituz/react-native-design-system-molecules';

// =============================================================================
// ORGANISMS - Complex Patterns
// =============================================================================
export {
  AppHeader,
  ScreenLayout,
  FormContainer,
  type AppHeaderProps,
  type ScreenLayoutProps,
  type FormContainerProps,
} from '@umituz/react-native-design-system-organisms';

// =============================================================================
// TYPOGRAPHY TYPES
// =============================================================================
export type {
  TextStyleVariant,
  ColorVariant,
} from '@umituz/react-native-design-system-typography';

// =============================================================================
// THEME & DESIGN TOKENS
// =============================================================================
export {
  createDesignTokens,
  STATIC_DESIGN_TOKENS,
  BASE_TOKENS,
  STATIC_TOKENS,
  withAlpha,
  lightColors,
  darkColors,
  getColorPalette,
  useAppDesignTokens,
  useDesignSystemTheme,
  useTheme,
  lightTheme,
  darkTheme,
  createResponsiveValue,
  ThemeStorage,
  type DesignTokens,
  type ThemeMode,
  type ColorPalette,
  type BaseTokens,
  type Spacing,
  type Typography,
  type Borders,
  type Theme,
  type ExtendedColorPalette,
} from '@umituz/react-native-design-system-theme';

// =============================================================================
// COMMON STYLES
// =============================================================================
export {
  useCommonStyles,
} from './presentation/tokens/commonStyles';

// =============================================================================
// RESPONSIVE UTILITIES
// =============================================================================
export {
  IOS_HIG,
  ANDROID_MATERIAL,
  PLATFORM_CONSTANTS,
  isValidTouchTarget,
  getMinTouchTarget,
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
  type UseResponsiveReturn,
  type DeviceType,
} from '@umituz/react-native-design-system-responsive';
