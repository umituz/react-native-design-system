/**
 * TOKEN FACTORY - THEME INJECTION LOGIC
 *
 * ✅ Factory Pattern for creating complete design tokens
 * ✅ Combines static tokens (BaseTokens) + dynamic colors (ColorPalette)
 * ✅ Type-safe token generation
 * ✅ Zero duplication - SINGLE SOURCE OF TRUTH
 *
 * @module TokenFactory
 */

import { BASE_TOKENS } from './BaseTokens';
import { getColorPalette, withAlpha, type ThemeMode, type ColorPalette } from './ColorPalette';
import { applyCustomColors, type CustomThemeColors } from './CustomColors';

// =============================================================================
// DESIGN TOKENS TYPE
// =============================================================================

/**
 * Complete design tokens shape
 * Combines static tokens (spacing, typography, borders) + dynamic colors
 */
export type DesignTokens = {
  colors: ColorPalette;
  spacing: typeof BASE_TOKENS.spacing;
  typography: typeof BASE_TOKENS.typography;
  iconSizes: typeof BASE_TOKENS.iconSizes;
  opacity: typeof BASE_TOKENS.opacity;
  avatarSizes: typeof BASE_TOKENS.avatarSizes;
  borderRadius: typeof BASE_TOKENS.borders.radius;
  borders: typeof BASE_TOKENS.borders & {
    card: typeof BASE_TOKENS.borders.card & { borderColor: string };
    input: typeof BASE_TOKENS.borders.input & { borderColor: string };
  };
};

// =============================================================================
// TOKEN FACTORY FUNCTION
// =============================================================================

/**
 * Create complete design tokens for a specific theme mode
 *
 * @param mode - Theme mode ('light' or 'dark')
 * @param customColors - Optional custom colors to override default colors
 * @returns Complete design tokens object
 *
 * @example
 * ```typescript
 * const lightTokens = createDesignTokens('light');
 * const darkTokens = createDesignTokens('dark');
 * const customTokens = createDesignTokens('dark', { primary: '#FF6B35' });
 *
 * // Use in components
 * <View style={{ backgroundColor: lightTokens.colors.primary }}>
 *   <Text style={lightTokens.typography.bodyLarge}>Hello!</Text>
 * </View>
 * ```
 */
export const createDesignTokens = (
  mode: ThemeMode,
  customColors?: CustomThemeColors,
): DesignTokens => {
  // Get color palette for theme mode
  const baseColors = getColorPalette(mode);

  // Apply custom colors if provided
  const colors = applyCustomColors(baseColors, customColors);

  // Combine static tokens + dynamic colors
  return {
    // ✅ DYNAMIC: Colors from theme mode + custom overrides
    colors,

    // ✅ STATIC: These don't change with theme
    spacing: BASE_TOKENS.spacing,
    typography: BASE_TOKENS.typography,
    iconSizes: BASE_TOKENS.iconSizes,
    opacity: BASE_TOKENS.opacity,
    avatarSizes: BASE_TOKENS.avatarSizes,
    borderRadius: BASE_TOKENS.borders.radius,

    // ✅ BORDERS: Static + injected border colors from theme
    borders: {
      ...BASE_TOKENS.borders,
      card: {
        ...BASE_TOKENS.borders.card,
        borderColor: colors.border,
      },
      input: {
        ...BASE_TOKENS.borders.input,
        borderColor: colors.border,
      },
    },
  };
};

// =============================================================================
// UTILITY EXPORTS
// =============================================================================

export { withAlpha };
export type { ThemeMode, ColorPalette };

