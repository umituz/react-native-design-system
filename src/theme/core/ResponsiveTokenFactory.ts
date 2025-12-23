/**
 * RESPONSIVE TOKEN FACTORY
 *
 * ✅ Extends base TokenFactory with responsive capabilities
 * ✅ Device-aware spacing, typography, and sizing
 * ✅ Automatically scales all tokens based on device type
 * ✅ Backward compatible with existing token system
 *
 * @module ResponsiveTokenFactory
 */

import { BASE_TOKENS } from './BaseTokens';
import { createDesignTokens, type DesignTokens, type ThemeMode } from './TokenFactory';
import { type CustomThemeColors } from './CustomColors';

// =============================================================================
// RESPONSIVE DESIGN TOKENS TYPE
// =============================================================================

/**
 * Responsive spacing tokens that scale based on device
 */
export type ResponsiveSpacing = {
  // Base Spacing Scale (scales with spacingMultiplier)
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;

  // Semantic Spacing (scales with device)
  screenPadding: number;
  cardPadding: number;
  buttonPadding: number;
  inputPadding: number;
  sectionSpacing: number;

  // Icon Sizes (scales with device)
  iconSizeSmall: number;
  iconSizeMedium: number;
  iconSizeLarge: number;
  iconSizeXLarge: number;
  iconSizeHero: number;

  // Component Heights (scales with device)
  buttonHeight: number;
  inputHeight: number;
  appBarHeight: number;
  tabBarHeight: number;
};

/**
 * Responsive typography tokens that scale based on device
 */
export type ResponsiveTypography = typeof BASE_TOKENS.typography & {
  // Each typography level gets responsive fontSize
  displayLarge: typeof BASE_TOKENS.typography.displayLarge & { responsiveFontSize: number };
  displayMedium: typeof BASE_TOKENS.typography.displayMedium & { responsiveFontSize: number };
  displaySmall: typeof BASE_TOKENS.typography.displaySmall & { responsiveFontSize: number };
  headlineLarge: typeof BASE_TOKENS.typography.headlineLarge & { responsiveFontSize: number };
  headlineMedium: typeof BASE_TOKENS.typography.headlineMedium & { responsiveFontSize: number };
  headlineSmall: typeof BASE_TOKENS.typography.headlineSmall & { responsiveFontSize: number };
  titleLarge: typeof BASE_TOKENS.typography.titleLarge & { responsiveFontSize: number };
  titleMedium: typeof BASE_TOKENS.typography.titleMedium & { responsiveFontSize: number };
  titleSmall: typeof BASE_TOKENS.typography.titleSmall & { responsiveFontSize: number };
  bodyLarge: typeof BASE_TOKENS.typography.bodyLarge & { responsiveFontSize: number };
  bodyMedium: typeof BASE_TOKENS.typography.bodyMedium & { responsiveFontSize: number };
  bodySmall: typeof BASE_TOKENS.typography.bodySmall & { responsiveFontSize: number };
  labelLarge: typeof BASE_TOKENS.typography.labelLarge & { responsiveFontSize: number };
  labelMedium: typeof BASE_TOKENS.typography.labelMedium & { responsiveFontSize: number };
  labelSmall: typeof BASE_TOKENS.typography.labelSmall & { responsiveFontSize: number };
};

/**
 * Responsive border radius tokens that scale based on device
 */
export type ResponsiveBorderRadius = {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  full: number;
};

/**
 * Complete responsive design tokens
 * Extends base DesignTokens with responsive capabilities
 */
export type ResponsiveDesignTokens = Omit<DesignTokens, 'spacing' | 'typography' | 'borderRadius'> & {
  spacing: ResponsiveSpacing;
  typography: ResponsiveTypography;
  borderRadius: ResponsiveBorderRadius;

  // Original base tokens (for backward compatibility)
  baseSpacing: typeof BASE_TOKENS.spacing;
  baseTypography: typeof BASE_TOKENS.typography;
  baseBorderRadius: typeof BASE_TOKENS.borders.radius;

  // Responsive multiplier value
  spacingMultiplier: number;
};

// =============================================================================
// RESPONSIVE TOKEN FACTORY FUNCTION
// =============================================================================

/**
 * Create responsive design tokens for a specific theme mode
 *
 * @param mode - Theme mode ('light' or 'dark')
 * @param spacingMultiplier - Device-based spacing multiplier (from useResponsive)
 * @param getFontSize - Function to get responsive font size (from useResponsive)
 * @param customColors - Optional custom colors to override default colors
 * @returns Complete responsive design tokens object
 *
 * @example
 * ```typescript
 * const { spacingMultiplier, getFontSize } = useResponsive();
 * const tokens = createResponsiveDesignTokens('light', spacingMultiplier, getFontSize);
 *
 * // Use in components
 * <View style={{ padding: tokens.spacing.md }}>  // Auto-scales: 16px * 1.2 = 19.2px on tablet
 *   <Text style={{ fontSize: tokens.typography.bodyLarge.responsiveFontSize }}>
 *     Hello!
 *   </Text>
 * </View>
 * ```
 */
export const createResponsiveDesignTokens = (
  mode: ThemeMode,
  spacingMultiplier: number,
  getFontSize: (baseFontSize: number) => number,
  customColors?: CustomThemeColors,
): ResponsiveDesignTokens => {
  // Get base tokens from existing factory
  const baseTokens = createDesignTokens(mode, customColors);

  // Create responsive spacing (multiply all base spacing values)
  const responsiveSpacing: ResponsiveSpacing = {
    // Base Spacing Scale
    xs: BASE_TOKENS.spacing.xs * spacingMultiplier,
    sm: BASE_TOKENS.spacing.sm * spacingMultiplier,
    md: BASE_TOKENS.spacing.md * spacingMultiplier,
    lg: BASE_TOKENS.spacing.lg * spacingMultiplier,
    xl: BASE_TOKENS.spacing.xl * spacingMultiplier,
    xxl: BASE_TOKENS.spacing.xxl * spacingMultiplier,
    xxxl: BASE_TOKENS.spacing.xxxl * spacingMultiplier,

    // Semantic Spacing
    screenPadding: BASE_TOKENS.spacing.screenPadding * spacingMultiplier,
    cardPadding: BASE_TOKENS.spacing.cardPadding * spacingMultiplier,
    buttonPadding: BASE_TOKENS.spacing.buttonPadding * spacingMultiplier,
    inputPadding: BASE_TOKENS.spacing.inputPadding * spacingMultiplier,
    sectionSpacing: BASE_TOKENS.spacing.sectionSpacing * spacingMultiplier,

    // Icon Sizes
    iconSizeSmall: Math.round(BASE_TOKENS.spacing.iconSizeSmall * spacingMultiplier),
    iconSizeMedium: Math.round(BASE_TOKENS.spacing.iconSizeMedium * spacingMultiplier),
    iconSizeLarge: Math.round(BASE_TOKENS.spacing.iconSizeLarge * spacingMultiplier),
    iconSizeXLarge: Math.round(BASE_TOKENS.spacing.iconSizeXLarge * spacingMultiplier),
    iconSizeHero: Math.round(BASE_TOKENS.spacing.iconSizeHero * spacingMultiplier),

    // Component Heights
    buttonHeight: Math.round(BASE_TOKENS.spacing.buttonHeight * spacingMultiplier),
    inputHeight: Math.round(BASE_TOKENS.spacing.inputHeight * spacingMultiplier),
    appBarHeight: Math.round(BASE_TOKENS.spacing.appBarHeight * spacingMultiplier),
    tabBarHeight: Math.round(BASE_TOKENS.spacing.tabBarHeight * spacingMultiplier),
  };

  // Create responsive typography (add responsiveFontSize to each level)
  const responsiveTypography: ResponsiveTypography = {
    displayLarge: {
      ...BASE_TOKENS.typography.displayLarge,
      responsiveFontSize: getFontSize(BASE_TOKENS.typography.displayLarge.fontSize!),
    },
    displayMedium: {
      ...BASE_TOKENS.typography.displayMedium,
      responsiveFontSize: getFontSize(BASE_TOKENS.typography.displayMedium.fontSize!),
    },
    displaySmall: {
      ...BASE_TOKENS.typography.displaySmall,
      responsiveFontSize: getFontSize(BASE_TOKENS.typography.displaySmall.fontSize!),
    },
    headlineLarge: {
      ...BASE_TOKENS.typography.headlineLarge,
      responsiveFontSize: getFontSize(BASE_TOKENS.typography.headlineLarge.fontSize!),
    },
    headlineMedium: {
      ...BASE_TOKENS.typography.headlineMedium,
      responsiveFontSize: getFontSize(BASE_TOKENS.typography.headlineMedium.fontSize!),
    },
    headlineSmall: {
      ...BASE_TOKENS.typography.headlineSmall,
      responsiveFontSize: getFontSize(BASE_TOKENS.typography.headlineSmall.fontSize!),
    },
    titleLarge: {
      ...BASE_TOKENS.typography.titleLarge,
      responsiveFontSize: getFontSize(BASE_TOKENS.typography.titleLarge.fontSize!),
    },
    titleMedium: {
      ...BASE_TOKENS.typography.titleMedium,
      responsiveFontSize: getFontSize(BASE_TOKENS.typography.titleMedium.fontSize!),
    },
    titleSmall: {
      ...BASE_TOKENS.typography.titleSmall,
      responsiveFontSize: getFontSize(BASE_TOKENS.typography.titleSmall.fontSize!),
    },
    bodyLarge: {
      ...BASE_TOKENS.typography.bodyLarge,
      responsiveFontSize: getFontSize(BASE_TOKENS.typography.bodyLarge.fontSize!),
    },
    bodyMedium: {
      ...BASE_TOKENS.typography.bodyMedium,
      responsiveFontSize: getFontSize(BASE_TOKENS.typography.bodyMedium.fontSize!),
    },
    bodySmall: {
      ...BASE_TOKENS.typography.bodySmall,
      responsiveFontSize: getFontSize(BASE_TOKENS.typography.bodySmall.fontSize!),
    },
    labelLarge: {
      ...BASE_TOKENS.typography.labelLarge,
      responsiveFontSize: getFontSize(BASE_TOKENS.typography.labelLarge.fontSize!),
    },
    labelMedium: {
      ...BASE_TOKENS.typography.labelMedium,
      responsiveFontSize: getFontSize(BASE_TOKENS.typography.labelMedium.fontSize!),
    },
    labelSmall: {
      ...BASE_TOKENS.typography.labelSmall,
      responsiveFontSize: getFontSize(BASE_TOKENS.typography.labelSmall.fontSize!),
    },
  } as ResponsiveTypography;

  // Create responsive border radius
  const responsiveBorderRadius: ResponsiveBorderRadius = {
    none: 0,
    xs: Math.round(BASE_TOKENS.borders.radius.xs * spacingMultiplier),
    sm: Math.round(BASE_TOKENS.borders.radius.sm * spacingMultiplier),
    md: Math.round(BASE_TOKENS.borders.radius.md * spacingMultiplier),
    lg: Math.round(BASE_TOKENS.borders.radius.lg * spacingMultiplier),
    xl: Math.round(BASE_TOKENS.borders.radius.xl * spacingMultiplier),
    xxl: Math.round(BASE_TOKENS.borders.radius.xxl * spacingMultiplier),
    full: 9999, // Always full circle
  };

  // Return complete responsive tokens
  return {
    ...baseTokens,
    spacing: responsiveSpacing,
    typography: responsiveTypography,
    borderRadius: responsiveBorderRadius,

    // Keep original base tokens for backward compatibility
    baseSpacing: BASE_TOKENS.spacing,
    baseTypography: BASE_TOKENS.typography,
    baseBorderRadius: BASE_TOKENS.borders.radius,

    // Store multiplier for reference
    spacingMultiplier,
  };
};
