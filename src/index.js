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
export { AtomicButton, } from './presentation/atoms/AtomicButton';
export { AtomicText, } from './presentation/atoms/AtomicText';
export { AtomicCard, } from './presentation/atoms/AtomicCard';
export { AtomicInput, } from './presentation/atoms/AtomicInput';
export { AtomicNumberInput, } from './presentation/atoms/AtomicNumberInput';
export { AtomicSwitch, } from './presentation/atoms/AtomicSwitch';
export { AtomicIcon, } from './presentation/atoms/AtomicIcon';
export { AtomicFormError, } from './presentation/atoms/AtomicFormError';
export { AtomicDatePicker, } from './presentation/atoms/AtomicDatePicker';
export { AtomicPicker, } from './presentation/atoms/AtomicPicker';
export { AtomicTextArea, } from './presentation/atoms/AtomicTextArea';
export { AtomicBadge, } from './presentation/atoms/AtomicBadge';
export { AtomicProgress, } from './presentation/atoms/AtomicProgress';
export { AtomicDivider, } from './presentation/atoms/AtomicDivider';
export { AtomicFab, getFabVariants, } from './presentation/atoms/AtomicFab';
export { AtomicFilter, getFilterContainerStyle, getClearAllContainerStyle, getScrollContentContainerStyle, } from './presentation/atoms/AtomicFilter';
export { AtomicTouchable, TouchablePresets, getOpacityValue, normalizeHitSlop, } from './presentation/atoms/AtomicTouchable';
export { AtomicSearchBar, } from './presentation/atoms/AtomicSearchBar';
export { AtomicSort, } from './presentation/atoms/AtomicSort';
// =============================================================================
// MOLECULES - Composite Components
// =============================================================================
export { FormField, } from './presentation/molecules/FormField';
export { ListItem, } from './presentation/molecules/ListItem';
export { SearchBar, } from './presentation/molecules/SearchBar';
// SettingItem moved to @domains/settings/presentation/components/SettingItem
// LanguageSwitcher moved to @umituz/react-native-localization
// Import directly: import { SettingItem } from '@domains/settings/presentation/components/SettingItem';
export { SectionCard, } from './presentation/molecules/SectionCard';
export { IconContainer, } from './presentation/molecules/IconContainer';
export { SectionHeader, } from './presentation/molecules/SectionHeader';
export { EmptyState, } from './presentation/molecules/EmptyState';
export { GridContainer, } from './presentation/molecules/GridContainer';
export { SectionContainer, } from './presentation/molecules/SectionContainer';
export { ScreenHeader, } from './presentation/molecules/ScreenHeader';
export { AtomicConfirmationModal, useConfirmationModal, } from './presentation/molecules/AtomicConfirmationModal';
// =============================================================================
// ORGANISMS - Complex Patterns
// =============================================================================
export { ScreenLayout, } from './presentation/organisms/ScreenLayout';
export { AppHeader, } from './presentation/organisms/AppHeader';
export { FormContainer, } from './presentation/organisms/FormContainer';
// Note: FeedbackModal moved to @domains/feedback
// Import from feedback domain: import { FeedbackModal } from '@domains/feedback';
// =============================================================================
// THEME-RELATED EXPORTS - Re-exported from @umituz/react-native-theme
// =============================================================================
// All tokens, colors, and theme utilities come from @umituz/react-native-theme
// Design system does NOT define any tokens - it only uses them from theme package
export { 
// Token factory
createDesignTokens, STATIC_DESIGN_TOKENS, BASE_TOKENS, STATIC_TOKENS, 
// Color utilities
withAlpha, lightColors, darkColors, getColorPalette, } from '@umituz/react-native-theme';
// Hook for dynamic theme-aware tokens (re-exported from theme package)
export { useAppDesignTokens } from '@umituz/react-native-theme';
export { useCommonStyles, } from './presentation/tokens/commonStyles';
// =============================================================================
// UTILITIES - Helper Functions
// =============================================================================
export { IOS_HIG, ANDROID_MATERIAL, PLATFORM_CONSTANTS, isValidTouchTarget, getMinTouchTarget, } from './presentation/utils/platformConstants';
// =============================================================================
// RESPONSIVE UTILITIES - Centralized Responsive Management
// =============================================================================
export { useResponsive, useResponsiveSizes, useDeviceType, } from './presentation/hooks/useResponsive';
export { getScreenDimensions, isSmallPhone, isTablet, getResponsiveLogoSize, getResponsiveInputHeight, getResponsiveHorizontalPadding, getResponsiveBottomPosition, getResponsiveFABPosition, getResponsiveModalMaxHeight, getResponsiveMinModalHeight, getResponsiveIconContainerSize, getResponsiveGridColumns, getResponsiveMaxWidth, getResponsiveFontSize, isLandscape, getKeyboardBehavior, getDeviceType, getMinTouchTargetSize, getSpacingMultiplier, getOnboardingIconMarginTop, getOnboardingIconMarginBottom, getOnboardingTitleMarginBottom, getOnboardingTextPadding, getOnboardingDescriptionMarginTop, DeviceType, } from './presentation/utils/responsive';
// =============================================================================
// THEME MANAGEMENT - Global Theme Store
// =============================================================================
// Theme management moved to @umituz/react-native-theme
export { useDesignSystemTheme, } from '@umituz/react-native-theme';
// =============================================================================
// ICONS DOMAIN - Universal Icon System
// =============================================================================
// Icon components have been moved to @umituz/react-native-icon package.
// Import directly: import { Icon, IconName, IconSize, IconColor } from '@umituz/react-native-icon';
// Re-export for backward compatibility (deprecated - use @umituz/react-native-icon directly)
export { Icon, } from '@umituz/react-native-icon';
