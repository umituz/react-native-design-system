/**
 * Custom Colors Types
 *
 * Types for custom theme color overrides
 *
 * ARCHITECTURE:
 * - Apps provide CustomThemeColors to DesignSystemProvider
 * - These colors override the default palette
 * - Supports both light and dark mode overrides
 * - Apps control their own brand colors completely
 *
 * BEST PRACTICES (based on Shopify Restyle, React Native Paper, Tamagui):
 * - All color keys are optional - only override what you need
 * - Provide separate light/dark palettes for proper theme switching
 * - Use semantic color names (primary, surface, etc.) not literal colors
 */

import type { ColorPalette } from './ColorPalette';
import { isValidHexColor } from './colors/ColorUtils';

/**
 * Complete custom theme colors - can override ANY color in the palette
 * All properties are optional - apps only provide what they want to customize
 */
export interface CustomThemeColors {
  // PRIMARY BRAND COLORS
  primary?: string;
  primaryLight?: string;
  primaryDark?: string;

  // SECONDARY COLORS
  secondary?: string;
  secondaryLight?: string;
  secondaryDark?: string;

  // ACCENT COLORS
  accent?: string;
  accentLight?: string;
  accentDark?: string;

  // ON-COLORS (text on colored backgrounds - CRITICAL for contrast)
  onPrimary?: string;
  onSecondary?: string;
  onSuccess?: string;
  onError?: string;
  onWarning?: string;
  onInfo?: string;
  onSurface?: string;
  onBackground?: string;
  onSurfaceDisabled?: string;
  onSurfaceVariant?: string;

  // CONTAINER COLORS
  primaryContainer?: string;
  onPrimaryContainer?: string;
  secondaryContainer?: string;
  onSecondaryContainer?: string;
  errorContainer?: string;
  onErrorContainer?: string;

  // OUTLINE COLORS
  outline?: string;
  outlineVariant?: string;
  outlineDisabled?: string;

  // SEMANTIC UI COLORS
  success?: string;
  successLight?: string;
  successDark?: string;
  error?: string;
  errorLight?: string;
  errorDark?: string;
  warning?: string;
  warningLight?: string;
  warningDark?: string;
  info?: string;
  infoLight?: string;
  infoDark?: string;

  // SEMANTIC CONTAINER COLORS
  successContainer?: string;
  onSuccessContainer?: string;
  warningContainer?: string;
  onWarningContainer?: string;
  infoContainer?: string;
  onInfoContainer?: string;

  // BACKGROUND COLORS
  backgroundPrimary?: string;
  backgroundSecondary?: string;

  // SURFACE COLORS
  surface?: string;
  surfaceVariant?: string;
  surfaceSecondary?: string;
  surfaceDisabled?: string;

  // TEXT COLORS
  textPrimary?: string;
  textSecondary?: string;
  textTertiary?: string;
  textDisabled?: string;
  textInverse?: string;

  // BORDER COLORS
  border?: string;
  borderLight?: string;
  borderMedium?: string;
  borderFocus?: string;
  borderDisabled?: string;

  // COMPONENT-SPECIFIC COLORS
  buttonPrimary?: string;
  buttonSecondary?: string;
  inputBackground?: string;
  inputBorder?: string;
  cardBackground?: string;

  // SPECIAL & UTILITY COLORS
  transparent?: string;
  black?: string;
  white?: string;
  modalOverlay?: string;
}

/**
 * Validate custom colors object
 * @param customColors - Custom colors to validate
 * @returns true if all colors are valid hex format
 */
export const validateCustomColors = (customColors: CustomThemeColors): boolean => {
  const colorValues = Object.values(customColors).filter(Boolean) as string[];

  for (const color of colorValues) {
    if (!isValidHexColor(color)) {
      return false;
    }
  }

  return true;
};

/**
 * Apply custom colors to color palette
 *
 * This function takes a base palette and merges custom colors into it.
 * Apps can override ANY color key - the system simply spreads custom values
 * over the base palette.
 *
 * @param palette - Base color palette (light or dark)
 * @param customColors - Custom colors to apply (partial override)
 * @returns Color palette with custom colors applied
 */
export const applyCustomColors = (
  palette: ColorPalette,
  customColors?: CustomThemeColors,
): ColorPalette => {
  if (!customColors) {
    return palette;
  }

  // Validate custom colors
  if (!validateCustomColors(customColors)) {
    if (__DEV__) {
      console.warn('[DesignSystem] Invalid custom colors provided - using default palette');
    }
    return palette;
  }

  // Start with base palette
  const result: Partial<ColorPalette> = {
    ...palette,
  };

  // Apply ALL custom colors dynamically
  // This approach allows any color key to be overridden
  const colorKeys = Object.keys(customColors) as (keyof CustomThemeColors)[];

  for (const key of colorKeys) {
    const value = customColors[key];
    if (value !== undefined) {
      // Direct assignment for matching keys
      (result as Record<string, string>)[key] = value;
    }
  }

  // Apply smart defaults and aliases
  // Primary -> buttonPrimary (if buttonPrimary not explicitly set)
  if (customColors.primary && !customColors.buttonPrimary) {
    result.buttonPrimary = customColors.primary;
  }

  // Secondary -> buttonSecondary (if buttonSecondary not explicitly set)
  if (customColors.secondary && !customColors.buttonSecondary) {
    result.buttonSecondary = customColors.secondary;
  }

  // Background aliases
  if (customColors.backgroundPrimary) {
    result.background = customColors.backgroundPrimary;
  }

  // Surface aliases
  if (customColors.surface) {
    result.card = customColors.surface;
    result.cardBackground = customColors.surface;
  }
  if (customColors.surfaceVariant && !customColors.surfaceSecondary) {
    result.surfaceSecondary = customColors.surfaceVariant;
  }

  // Text aliases
  if (customColors.textPrimary) {
    result.text = customColors.textPrimary;
  }

  // Input aliases
  if (customColors.inputBorder && !result.inputBorder) {
    result.inputBorder = customColors.inputBorder;
  }
  if (customColors.border && !customColors.inputBorder) {
    result.inputBorder = customColors.border;
  }

  return result as ColorPalette;
};
