/**
 * @umituz/react-native-design-system - Public API
 *
 * Universal UI component library for React Native apps
 * Domain-Driven Design (DDD) Architecture
 *
 * This is the SINGLE SOURCE OF TRUTH for all UI components.
 * ALL imports from the design system MUST go through this file.
 *
 * Architecture:
 * - presentation/atoms: Primitive UI components (AtomicButton, AtomicText, etc.)
 * - presentation/molecules: Composite components (SearchBar, ListItem, etc.)
 * - presentation/organisms: Complex patterns (ScreenLayout, AppHeader, FormContainer)
 * - presentation/tokens: Design tokens (colors, typography, spacing, etc.)
 * - presentation/utils: Utility functions and helpers
 *
 * Usage:
 *   import { AtomicButton, AtomicFilter, AtomicTouchable, SearchBar, STATIC_TOKENS } from '@umituz/react-native-design-system';
 */

// =============================================================================
// ATOMS - Primitive UI Components
// =============================================================================

export {
  AtomicButton,
  type AtomicButtonProps,
  type ButtonVariant,
  type ButtonSize,
} from './presentation/atoms/AtomicButton';

export {
  AtomicText,
  type AtomicTextProps,
} from './presentation/atoms/AtomicText';

export {
  AtomicCard,
  type AtomicCardProps,
  type AtomicCardVariant,
  type AtomicCardPadding,
} from './presentation/atoms/AtomicCard';

export {
  AtomicInput,
  type AtomicInputProps,
  type AtomicInputVariant,
  type AtomicInputState,
  type AtomicInputSize,
} from './presentation/atoms/AtomicInput';

export {
  AtomicNumberInput,
  type AtomicNumberInputProps,
} from './presentation/atoms/AtomicNumberInput';

export {
  AtomicSwitch,
  type AtomicSwitchProps,
} from './presentation/atoms/AtomicSwitch';

export {
  AtomicIcon,
  type AtomicIconProps,
  type AtomicIconSize,
  type AtomicIconColor,
} from './presentation/atoms/AtomicIcon';

export {
  AtomicFormError,
  type AtomicFormErrorProps,
} from './presentation/atoms/AtomicFormError';

export {
  AtomicDatePicker,
  type AtomicDatePickerProps,
} from './presentation/atoms/AtomicDatePicker';

export {
  AtomicPicker,
  type AtomicPickerProps,
  type PickerOption,
  type PickerSize,
} from './presentation/atoms/AtomicPicker';

export {
  AtomicTextArea,
  type AtomicTextAreaProps,
} from './presentation/atoms/AtomicTextArea';

export {
  AtomicBadge,
  type AtomicBadgeProps,
} from './presentation/atoms/AtomicBadge';

export {
  AtomicProgress,
  type AtomicProgressProps,
} from './presentation/atoms/AtomicProgress';

export {
  AtomicDivider,
  type AtomicDividerProps,
} from './presentation/atoms/AtomicDivider';

export {
  AtomicFab,
  type AtomicFabProps,
  type FabSize,
  type FabVariant,
  getFabVariants,
} from './presentation/atoms/AtomicFab';

export {
  AtomicFilter,
  type AtomicFilterProps,
  type FilterOption,
  getFilterContainerStyle,
  getClearAllContainerStyle,
  getScrollContentContainerStyle,
} from './presentation/atoms/AtomicFilter';

export {
  AtomicTouchable,
  type AtomicTouchableProps,
  type TouchableFeedback,
  type FeedbackStrength,
  type HitSlop,
  TouchablePresets,
  getOpacityValue,
  normalizeHitSlop,
} from './presentation/atoms/AtomicTouchable';

export {
  AtomicSearchBar,
  type AtomicSearchBarProps,
} from './presentation/atoms/AtomicSearchBar';

export {
  AtomicSort,
  type AtomicSortProps,
  type SortOption,
  type SortDirection,
} from './presentation/atoms/AtomicSort';

// =============================================================================
// MOLECULES - Composite Components
// =============================================================================

export {
  FormField,
  type FormFieldProps,
} from './presentation/molecules/FormField';

export {
  ListItem,
  type ListItemProps,
} from './presentation/molecules/ListItem';

export {
  SearchBar,
  type SearchBarProps,
} from './presentation/molecules/SearchBar';

// SettingItem moved to @domains/settings/presentation/components/SettingItem
// LanguageSwitcher moved to @umituz/react-native-localization
// Import directly: import { SettingItem } from '@domains/settings/presentation/components/SettingItem';

export {
  SectionCard,
} from './presentation/molecules/SectionCard';

export {
  IconContainer,
} from './presentation/molecules/IconContainer';

export {
  SectionHeader,
} from './presentation/molecules/SectionHeader';

export {
  EmptyState,
} from './presentation/molecules/EmptyState';

export {
  GridContainer,
} from './presentation/molecules/GridContainer';

export {
  SectionContainer,
} from './presentation/molecules/SectionContainer';

export {
  ScreenHeader,
  type ScreenHeaderProps,
} from './presentation/molecules/ScreenHeader';

export {
  AtomicConfirmationModal,
  useConfirmationModal,
  type AtomicConfirmationModalProps,
  type ConfirmationModalVariant,
} from './presentation/molecules/AtomicConfirmationModal';

// =============================================================================
// ORGANISMS - Complex Patterns
// =============================================================================

export {
  ScreenLayout,
  type ScreenLayoutProps,
} from './presentation/organisms/ScreenLayout';

export {
  AppHeader,
  type AppHeaderProps,
} from './presentation/organisms/AppHeader';

export {
  FormContainer,
  type FormContainerProps,
} from './presentation/organisms/FormContainer';

// Note: FeedbackModal moved to @domains/feedback
// Import from feedback domain: import { FeedbackModal } from '@domains/feedback';

// =============================================================================
// TOKENS - Design Tokens (Refactored with ZERO duplication)
// =============================================================================

export {
  // Static tokens (don't change with theme)
  STATIC_TOKENS,
  BASE_TOKENS,

  // Token factory
  createDesignTokens,

  // Color utilities
  withAlpha,
  lightColors,
  darkColors,
  getColorPalette,

  // Individual base tokens
  spacing,
  typography,
  borders,

  // Type exports
  type DesignTokens,
  type ThemeMode,
  type ColorPalette,
  type Spacing,
  type Typography,
  type Borders,
  type BaseTokens,
} from './presentation/tokens/AppDesignTokens';

// Hook for dynamic theme-aware tokens (exported separately to avoid cycle)
export { useAppDesignTokens } from './presentation/hooks/useAppDesignTokens';

export {
  useCommonStyles,
} from './presentation/tokens/commonStyles';

// =============================================================================
// UTILITIES - Helper Functions
// =============================================================================

export {
  IOS_HIG,
  ANDROID_MATERIAL,
  PLATFORM_CONSTANTS,
  isValidTouchTarget,
  getMinTouchTarget,
} from './presentation/utils/platformConstants';

// =============================================================================
// RESPONSIVE UTILITIES - Centralized Responsive Management
// =============================================================================

export {
  useResponsive,
  useResponsiveSizes,
  useDeviceType,
  type UseResponsiveReturn,
} from './presentation/hooks/useResponsive';

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
  DeviceType,
} from './presentation/utils/responsive';

// =============================================================================
// THEME MANAGEMENT - Global Theme Store
// =============================================================================

export {
  useDesignSystemTheme,
} from './infrastructure/theme/globalThemeStore';

// =============================================================================
// ICONS DOMAIN - Universal Icon System
// =============================================================================

export {
  Icon,
  type IconProps,
  type IconSize,
  type IconColor,
  type IconName,
} from './domains/icons/presentation/components/Icon';
