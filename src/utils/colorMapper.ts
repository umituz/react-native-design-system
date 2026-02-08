/**
 * Color Mapper Utility
 * Centralized color mapping logic for consistent theming
 */

import type { DesignTokens } from '../theme';

/**
 * Standard color variants available in the design system
 */
export type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'surface'
  | 'background'
  | 'text'
  | 'border'
  | 'disabled';

/**
 * Color intensity levels
 */
export type ColorIntensity = 'primary' | 'secondary' | 'light' | 'dark';

/**
 * Maps a color variant to actual color value from tokens
 *
 * @param variant - Color variant to map
 * @param tokens - Design tokens containing color definitions
 * @param intensity - Optional color intensity level
 * @returns Hex color string
 */
export function mapColorVariant(
  variant: ColorVariant,
  tokens: DesignTokens,
  intensity: ColorIntensity = 'primary'
): string {
  const colors = tokens.colors as any;

  const colorMap: Record<ColorVariant, Record<ColorIntensity, string>> = {
    primary: {
      primary: colors.primary,
      secondary: colors.primarySecondary || colors.primary,
      light: colors.primaryLight || colors.primary,
      dark: colors.primaryDark || colors.primary,
    },
    secondary: {
      primary: colors.secondary,
      secondary: colors.secondarySecondary || colors.secondary,
      light: colors.secondaryLight || colors.secondary,
      dark: colors.secondaryDark || colors.secondary,
    },
    tertiary: {
      primary: colors.tertiary || colors.primary,
      secondary: colors.tertiary || colors.primary,
      light: colors.tertiary || colors.primary,
      dark: colors.tertiary || colors.primary,
    },
    success: {
      primary: colors.success || '#4CAF50',
      secondary: colors.successSecondary || '#81C784',
      light: colors.successLight || '#A5D6A7',
      dark: colors.successDark || '#388E3C',
    },
    warning: {
      primary: colors.warning || '#FF9800',
      secondary: colors.warningSecondary || '#FFB74D',
      light: colors.warningLight || '#FFCC80',
      dark: colors.warningDark || '#F57C00',
    },
    error: {
      primary: colors.error || '#F44336',
      secondary: colors.errorSecondary || '#E57373',
      light: colors.errorLight || '#EF9A9A',
      dark: colors.errorDark || '#D32F2F',
    },
    info: {
      primary: colors.info || '#2196F3',
      secondary: colors.infoSecondary || '#64B5F6',
      light: colors.infoLight || '#90CAF9',
      dark: colors.infoDark || '#1976D2',
    },
    surface: {
      primary: colors.surface,
      secondary: colors.surfaceSecondary || colors.surface,
      light: colors.surfaceLight || colors.surface,
      dark: colors.surfaceDark || colors.surface,
    },
    background: {
      primary: colors.backgroundPrimary,
      secondary: colors.backgroundSecondary || colors.backgroundPrimary,
      light: colors.backgroundLight || colors.backgroundPrimary,
      dark: colors.backgroundDark || colors.backgroundPrimary,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
      light: colors.textLight || colors.textPrimary,
      dark: colors.textDark || colors.textPrimary,
    },
    border: {
      primary: colors.borderLight,
      secondary: colors.borderMedium || colors.borderLight,
      light: colors.borderLight,
      dark: colors.borderDark || colors.borderLight,
    },
    disabled: {
      primary: colors.disabled || colors.textSecondary,
      secondary: colors.disabledSecondary || colors.disabled || colors.textSecondary,
      light: colors.disabledLight || colors.disabled || colors.textSecondary,
      dark: colors.disabledDark || colors.disabled || colors.textSecondary,
    },
  };

  return colorMap[variant]?.[intensity] || colors.primary;
}

/**
 * Creates a color mapping object for components
 * Useful for icon colors, button colors, etc.
 *
 * @param tokens - Design tokens
 * @param colorKeys - Array of color keys to map
 * @returns Object mapping color keys to values
 */
export function createColorMap(
  tokens: DesignTokens,
  colorKeys: ColorVariant[]
): Record<string, string> {
  const colorMap: Record<string, string> = {};

  colorKeys.forEach((key) => {
    colorMap[key] = mapColorVariant(key, tokens);
  });

  return colorMap;
}

/**
 * Gets text color based on background color for contrast
 *
 * @param backgroundColor - Background color hex value
 * @returns Appropriate text color (light or dark)
 */
export function getContrastTextColor(backgroundColor: string): string {
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

/**
 * Checks if a color is light
 *
 * @param color - Hex color string
 * @returns True if color is light
 */
export function isLightColor(color: string): boolean {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5;
}

/**
 * Adjusts color opacity
 *
 * @param color - Hex color string
 * @param opacity - Opacity value (0-1)
 * @returns RGBA color string
 */
export function adjustColorOpacity(color: string, opacity: number): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
