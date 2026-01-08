/**
 * Custom Colors Types
 * 
 * Types for custom theme color overrides
 */

import type { ColorPalette } from './ColorPalette';
import { isValidHexColor } from './colors/ColorUtils';

/**
 * Custom theme colors that can override default colors
 */
export interface CustomThemeColors {
  primary?: string;
  primaryLight?: string;
  primaryDark?: string;
  secondary?: string;
  secondaryLight?: string;
  secondaryDark?: string;
  accent?: string;
  accentLight?: string;
  accentDark?: string;
  buttonPrimary?: string;
  buttonSecondary?: string;
  
  // Background overrides
  backgroundPrimary?: string;
  backgroundSecondary?: string;
  surface?: string;
  surfaceVariant?: string;
  
  // Text overrides
  textPrimary?: string;
  textSecondary?: string;
  textTertiary?: string;
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
 * @param palette - Base color palette
 * @param customColors - Custom colors to apply
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
    return palette;
  }

  const result: Partial<ColorPalette> = {
    ...palette,
  };

  // Apply custom primary colors
  if (customColors.primary) {
    result.primary = customColors.primary;
    if (!customColors.buttonPrimary) {
      result.buttonPrimary = customColors.primary;
    }
  }
  if (customColors.primaryLight) {
    result.primaryLight = customColors.primaryLight;
  }
  if (customColors.primaryDark) {
    result.primaryDark = customColors.primaryDark;
  }

  // Apply custom secondary colors
  if (customColors.secondary) {
    result.secondary = customColors.secondary;
    if (!customColors.buttonSecondary) {
      result.buttonSecondary = customColors.secondary;
    }
  }
  if (customColors.secondaryLight) {
    result.secondaryLight = customColors.secondaryLight;
  }
  if (customColors.secondaryDark) {
    result.secondaryDark = customColors.secondaryDark;
  }

  // Apply custom accent colors
  if (customColors.accent) {
    result.accent = customColors.accent;
  }
  if (customColors.accentLight) {
    result.accentLight = customColors.accentLight;
  }
  if (customColors.accentDark) {
    result.accentDark = customColors.accentDark;
  }

  // Apply custom button colors (override primary/secondary if set)
  if (customColors.buttonPrimary) {
    result.buttonPrimary = customColors.buttonPrimary;
  }
  if (customColors.buttonSecondary) {
    result.buttonSecondary = customColors.buttonSecondary;
  }

  // Apply background override
  if (customColors.backgroundPrimary) {
    result.backgroundPrimary = customColors.backgroundPrimary;
    result.background = customColors.backgroundPrimary; // Alias
  }
  if (customColors.backgroundSecondary) {
    result.backgroundSecondary = customColors.backgroundSecondary;
  }
  
  // Apply surface overrides
  if (customColors.surface) {
    result.surface = customColors.surface;
    result.card = customColors.surface; // Alias
    result.cardBackground = customColors.surface; // Alias
  }
  if (customColors.surfaceVariant) {
    result.surfaceVariant = customColors.surfaceVariant;
    result.surfaceSecondary = customColors.surfaceVariant; // Alias
  }
  
  // Apply text overrides
  if (customColors.textPrimary) {
    result.textPrimary = customColors.textPrimary;
    result.text = customColors.textPrimary; // Alias
  }
  if (customColors.textSecondary) {
    result.textSecondary = customColors.textSecondary;
  }
  if (customColors.textTertiary) {
    result.textTertiary = customColors.textTertiary;
  }

  return result as ColorPalette;
};
