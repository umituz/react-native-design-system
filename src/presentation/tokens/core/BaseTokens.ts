/**
 * BASE DESIGN TOKENS - SINGLE SOURCE OF TRUTH
 *
 * ✅ STATIC tokens that don't change with theme
 * ✅ DRY Principle - Each value defined ONCE
 * ✅ Type-safe with full TypeScript support
 * ✅ Factory-first design for 100+ generated apps
 *
 * @module BaseTokens
 */

import { TextStyle } from 'react-native';

// =============================================================================
// SPACING TOKENS
// =============================================================================

export const spacing = {
  // Base spacing scale
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,

  // Component-specific spacing
  screenPadding: 20,
  cardPadding: 16,
  buttonPadding: 16,
  inputPadding: 8,
  sectionSpacing: 24,

  // Icon sizes
  iconSizeSmall: 16,
  iconSizeMedium: 20,
  iconSizeLarge: 24,
  iconSizeXLarge: 32,
  iconSizeHero: 64,

  // Component heights
  buttonHeight: 48,
  inputHeight: 48,
  appBarHeight: 56,
  tabBarHeight: 60,
} as const;

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

export const typography = {
  // Font families
  fontPrimary: 'System',
  fontSecondary: 'System',
  fontMono: 'Courier New',

  // Font sizes
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,

  // Font weights
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,

  // Line heights
  lineHeightTight: 1.2,
  lineHeightNormal: 1.5,
  lineHeightRelaxed: 1.7,

  // =============================================================================
  // MATERIAL DESIGN 3 TYPE SCALE
  // =============================================================================

  // Display styles (largest)
  displayLarge: {
    fontSize: 57,
    fontWeight: '400' as const,
    lineHeight: 64,
  } as TextStyle,

  displayMedium: {
    fontSize: 45,
    fontWeight: '400' as const,
    lineHeight: 52,
  } as TextStyle,

  displaySmall: {
    fontSize: 36,
    fontWeight: '400' as const,
    lineHeight: 44,
  } as TextStyle,

  // Headline styles
  headlineLarge: {
    fontSize: 32,
    fontWeight: '400' as const,
    lineHeight: 40,
  } as TextStyle,

  headlineMedium: {
    fontSize: 28,
    fontWeight: '400' as const,
    lineHeight: 36,
  } as TextStyle,

  headlineSmall: {
    fontSize: 24,
    fontWeight: '400' as const,
    lineHeight: 32,
  } as TextStyle,

  // Title styles
  titleLarge: {
    fontSize: 22,
    fontWeight: '400' as const,
    lineHeight: 28,
  } as TextStyle,

  titleMedium: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 24,
  } as TextStyle,

  titleSmall: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
  } as TextStyle,

  // Body styles
  bodyLarge: {
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 27,
  } as TextStyle,

  bodyMedium: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  } as TextStyle,

  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 21,
  } as TextStyle,

  // Label styles
  labelLarge: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 19.2,
  } as TextStyle,

  labelMedium: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 16.8,
  } as TextStyle,

  labelSmall: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 14.4,
  } as TextStyle,

  // =============================================================================
  // LEGACY SUPPORT (backwards compatibility)
  // =============================================================================

  headingLarge: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 38.4,
  } as TextStyle,

  headingMedium: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 28.8,
  } as TextStyle,

  headingSmall: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 24,
  } as TextStyle,

  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 19.2,
  } as TextStyle,

  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 18,
  } as TextStyle,

  overline: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 18,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  } as TextStyle,
} as const;

// =============================================================================
// ANIMATION TOKENS - REMOVED (moved to separate package)
// =============================================================================

// =============================================================================
// OPACITY TOKENS
// =============================================================================

export const opacity = {
  disabled: 0.6,
  subtle: 0.8,
  medium: 0.5,
  light: 0.3,
  veryLight: 0.1,
} as const;

// =============================================================================
// BORDER TOKENS
// =============================================================================

export const borders = {
  // Radius scale
  radius: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    full: 9999,
  },

  // Width scale
  width: {
    none: 0,
    thin: 1,
    medium: 2,
    thick: 4,
  },

  // Component-specific borders (without colors - colors injected by TokenFactory)
  button: {
    borderRadius: 8,
    borderWidth: 0,
  },

  card: {
    borderRadius: 12,
    borderWidth: 1,
  },

  input: {
    borderRadius: 8,
    borderWidth: 1,
  },

  pill: {
    borderRadius: 9999,
    borderWidth: 0,
  },
} as const;

// =============================================================================
// COMPONENT SIZES (Touch Targets, Buttons, UI Elements)
// =============================================================================

export const sizes = {
  // Touch targets (Apple HIG minimum: 44x44)
  touchTarget: 44,
  touchTargetSmall: 36,
  touchTargetLarge: 56,

  // Button heights
  buttonHeight: {
    sm: 40,
    md: 48,
    lg: 56,
    xl: 64,
  },

  // Pagination dots (onboarding, carousels)
  dot: {
    inactive: 8,
    active: 24,
  },

  // Progress bars
  progressBar: {
    thin: 2,
    normal: 4,
    thick: 6,
  },

  // Common UI element sizes
  divider: 1,
  separator: 2,
} as const;

// =============================================================================
// ICON SIZES
// =============================================================================

export const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

// =============================================================================
// AVATAR SIZES
// =============================================================================

export const avatarSizes = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
  xxl: 80,
} as const;

// =============================================================================
// CONSOLIDATED STATIC TOKENS
// =============================================================================

/**
 * All static design tokens in one place
 * These values DON'T change with theme (light/dark)
 */
export const BASE_TOKENS = {
  spacing,
  typography,
  opacity,
  borders,
  sizes,
  iconSizes,
  avatarSizes,
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Spacing = typeof spacing;
export type Typography = typeof typography;
export type Opacity = typeof opacity;
export type Borders = typeof borders;
export type Sizes = typeof sizes;
export type IconSizes = typeof iconSizes;
export type AvatarSizes = typeof avatarSizes;
export type BaseTokens = typeof BASE_TOKENS;
