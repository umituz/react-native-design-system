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
 * - @umituz/react-native-design-system-atoms: Primitive UI components (AtomicButton, AtomicText, etc.)
 * - @umituz/react-native-design-system-molecules: Composite components (SearchBar, ListItem, etc.)
 * - @umituz/react-native-design-system-organisms: Complex patterns (ScreenLayout, AppHeader, FormContainer)
 * - presentation/tokens: Design tokens (colors, typography, spacing, etc.)
 * - presentation/utils: Utility functions and helpers
 *
 * Usage:
 *   import { AtomicButton, AtomicFilter, AtomicTouchable, SearchBar, STATIC_TOKENS } from '@umituz/react-native-design-system';
 */

// =============================================================================
// ATOMS - Primitive UI Components
// Re-exported from @umituz/react-native-design-system-atoms
// =============================================================================

export * from '@umituz/react-native-design-system-atoms';

// Re-export typography types for convenience (from @umituz/react-native-typography)
export type {
  TextStyleVariant,
  ColorVariant,
} from '@umituz/react-native-typography';

// =============================================================================
// MOLECULES - Composite Components
// Re-exported from @umituz/react-native-design-system-molecules
// =============================================================================

export * from '@umituz/react-native-design-system-molecules';

// =============================================================================
// ORGANISMS - Complex Patterns
// Re-exported from @umituz/react-native-design-system-organisms
// =============================================================================

export * from '@umituz/react-native-design-system-organisms';

// Note: FeedbackModal moved to @domains/feedback
// Import from feedback domain: import { FeedbackModal } from '@domains/feedback';

// =============================================================================
// THEME-RELATED EXPORTS - Re-exported from @umituz/react-native-theme
// =============================================================================
// All tokens, colors, and theme utilities come from @umituz/react-native-theme
// Design system does NOT define any tokens - it only uses them from theme package

export {
  // Token factory
  createDesignTokens,
  STATIC_DESIGN_TOKENS,
  BASE_TOKENS,
  STATIC_TOKENS,

  // Color utilities
  withAlpha,
  lightColors,
  darkColors,
  getColorPalette,

  // Type exports
  type DesignTokens,
  type ThemeMode,
  type ColorPalette,
  type BaseTokens,
  type Spacing,
  type Typography,
  type Borders,
} from '@umituz/react-native-theme';

// Hook for dynamic theme-aware tokens (re-exported from theme package)
export { useAppDesignTokens } from '@umituz/react-native-theme';

export {
  useCommonStyles,
} from './presentation/tokens/commonStyles';

// =============================================================================
// UTILITIES - Helper Functions
// =============================================================================

// Platform constants are now exported from @umituz/react-native-design-system-responsive
// Re-exported above via export * from '@umituz/react-native-design-system-responsive'

// =============================================================================
// RESPONSIVE UTILITIES - Centralized Responsive Management
// Re-exported from @umituz/react-native-design-system-responsive
// =============================================================================

export * from '@umituz/react-native-design-system-responsive';

// =============================================================================
// THEME MANAGEMENT - Global Theme Store
// =============================================================================

// Theme management moved to @umituz/react-native-theme
export {
  useDesignSystemTheme,
} from '@umituz/react-native-theme';

// =============================================================================
// ICONS DOMAIN - Universal Icon System
// =============================================================================
// Icon components have been moved to @umituz/react-native-icon package.
// Import directly: import { Icon, IconName, IconSize, IconColor } from '@umituz/react-native-icon';

// Re-export for backward compatibility (deprecated - use @umituz/react-native-icon directly)
export {
  Icon,
  type IconProps,
  type IconSize,
  type IconColor,
  type IconName,
} from '@umituz/react-native-icon';
