/**
 * COLOR PALETTE - THEME-SPECIFIC COLORS
 *
 * ✅ Light and Dark theme color definitions
 * ✅ Semantic color naming for clarity
 * ✅ Template placeholders for factory generation
 * ✅ Type-safe color definitions
 *
 * @module ColorPalette
 */

// =============================================================================
// COLOR UTILITIES
// =============================================================================

/**
 * Add alpha transparency to hex color
 * @param hexColor - Hex color string (#RRGGBB or #RGB)
 * @param alpha - Alpha value 0-1
 * @returns Hex color with alpha (#RRGGBBAA)
 */
export const withAlpha = (hexColor: string, alpha: number): string => {
  if (!hexColor.startsWith('#') || (hexColor.length !== 7 && hexColor.length !== 4)) {
    return hexColor;
  }

  if (alpha < 0 || alpha > 1) {
    return hexColor;
  }

  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, '0');

  return hexColor + alphaHex;
};

// =============================================================================
// LIGHT THEME COLORS
// =============================================================================

export const lightColors = {
  // =============================================================================
  // PRIMARY BRAND COLORS
  // =============================================================================
  primary: '#3B82F6',
  primaryLight: '#60A5FA',
  primaryDark: '#2563EB',

  secondary: '#8B5CF6',
  secondaryLight: '#A78BFA',
  secondaryDark: '#7C3AED',

  accent: '#F59E0B',
  accentLight: '#FBBF24',
  accentDark: '#D97706',

  // =============================================================================
  // MATERIAL DESIGN 3 - ON COLORS (Text on colored backgrounds)
  // =============================================================================
  onPrimary: '#FFFFFF',           // Text on primary background
  onSecondary: '#FFFFFF',         // Text on secondary background
  onSuccess: '#FFFFFF',           // Text on success background
  onError: '#FFFFFF',             // Text on error background
  onWarning: '#000000',           // Text on warning background
  onInfo: '#FFFFFF',              // Text on info background
  onSurface: '#1E293B',           // Text on surface
  onBackground: '#1E293B',        // Text on background
  onSurfaceDisabled: '#CBD5E1',   // Disabled text color

  // =============================================================================
  // MATERIAL DESIGN 3 - CONTAINER COLORS (Lighter versions for containers)
  // =============================================================================
  primaryContainer: '#DBEAFE',    // Light container using primary
  onPrimaryContainer: '#1E40AF',  // Text on primary container
  secondaryContainer: '#E0E7FF',  // Light container using secondary
  onSecondaryContainer: '#3730A3', // Text on secondary container
  errorContainer: '#FEE2E2',      // Light container using error
  onErrorContainer: '#991B1B',    // Text on error container

  // =============================================================================
  // MATERIAL DESIGN 3 - OUTLINE
  // =============================================================================
  outline: '#CBD5E1',             // Default outline color
  outlineVariant: '#E2E8F0',      // Lighter outline variant
  outlineDisabled: '#E2E8F0',     // Disabled outline color

  // =============================================================================
  // SEMANTIC UI COLORS
  // =============================================================================
  success: '#10B981',
  successLight: '#34D399',
  successDark: '#059669',

  error: '#EF4444',
  errorLight: '#F87171',
  errorDark: '#DC2626',

  warning: '#F59E0B',
  warningLight: '#FBBF24',
  warningDark: '#D97706',

  info: '#3B82F6',
  infoLight: '#60A5FA',
  infoDark: '#2563EB',

  // =============================================================================
  // SEMANTIC CONTAINER COLORS (Light mode)
  // =============================================================================
  successContainer: '#D1FAE5',        // Light container for success states
  onSuccessContainer: '#065F46',      // Text on success container
  warningContainer: '#FEF3C7',        // Light container for warning states
  onWarningContainer: '#92400E',      // Text on warning container
  infoContainer: '#DBEAFE',           // Light container for info states
  onInfoContainer: '#1E40AF',         // Text on info container

  // =============================================================================
  // GRAYSCALE PALETTE
  // =============================================================================
  gray50: '#FAFAFA',
  gray100: '#F4F4F5',
  gray200: '#E4E4E7',
  gray300: '#D4D4D8',
  gray400: '#A1A1AA',
  gray500: '#71717A',
  gray600: '#52525B',
  gray700: '#3F3F46',
  gray800: '#27272A',
  gray900: '#18181B',

  // =============================================================================
  // BACKGROUND COLORS
  // =============================================================================
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F8FAFC',

  surface: '#FFFFFF',
  surfaceVariant: '#F1F5F9',
  surfaceSecondary: '#F1F5F9', // Alias
  surfaceDisabled: '#F4F4F5',     // Disabled surface color

  // =============================================================================
  // TEXT COLORS
  // =============================================================================
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  textDisabled: '#CBD5E1',
  textInverse: '#FFFFFF',

  // =============================================================================
  // BORDER COLORS
  // =============================================================================
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  borderMedium: '#CBD5E1',
  borderFocus: '#3B82F6',

  // =============================================================================
  // COMPONENT-SPECIFIC COLORS
  // =============================================================================
  buttonPrimary: '#3B82F6',
  buttonSecondary: '#8B5CF6',

  inputBackground: '#FFFFFF',
  inputBorder: '#E2E8F0',

  cardBackground: '#FFFFFF',

  // =============================================================================
  // SPECIAL COLORS
  // =============================================================================
  transparent: 'transparent',
  black: '#000000',
  white: '#FFFFFF',

  // =============================================================================
  // RGBA OVERLAY COLORS (for modals, cards, etc.)
  // =============================================================================
  modalOverlay: 'rgba(0, 0, 0, 0.5)',
  overlaySubtle: 'rgba(0, 0, 0, 0.05)',
  overlayLight: 'rgba(0, 0, 0, 0.1)',
  overlayMedium: 'rgba(0, 0, 0, 0.3)',
  overlayBackground: 'rgba(0, 0, 0, 0.05)',

  whiteOverlay: 'rgba(255, 255, 255, 0.2)',
  whiteOverlayStrong: 'rgba(255, 255, 255, 0.95)',
  whiteOverlayBorder: 'rgba(255, 255, 255, 0.5)',

  textWhiteOpacity: 'rgba(255, 255, 255, 0.8)',

  errorBackground: 'rgba(239, 68, 68, 0.1)',
  primaryBackground: 'rgba(99, 102, 241, 0.1)',

  cardOverlay: 'rgba(0, 0, 0, 0.15)',

  inputBackground_RGBA: 'rgba(248, 250, 252, 0.9)',

  // =============================================================================
  // SHADOW COLORS - REMOVED (React Native Web incompatibility)
  // NOTE: Use borders and background colors for depth instead
  // =============================================================================

  // =============================================================================
  // GRADIENTS
  // =============================================================================
  gradient: ['#3B82F6', '#8B5CF6'],
};

// =============================================================================
// DARK THEME COLORS
// =============================================================================

export const darkColors = {
  // =============================================================================
  // PRIMARY BRAND COLORS (dark mode specific colors)
  // =============================================================================
  primary: '#3B82F6',
  primaryLight: '#60A5FA',
  primaryDark: '#2563EB',

  secondary: '#8B5CF6',
  secondaryLight: '#A78BFA',
  secondaryDark: '#7C3AED',

  accent: '#F59E0B',
  accentLight: '#FBBF24',
  accentDark: '#D97706',

  // =============================================================================
  // MATERIAL DESIGN 3 - ON COLORS (Same as light mode for type consistency)
  // =============================================================================
  onPrimary: '#FFFFFF',           // Text on primary background (consistent)
  onSecondary: '#FFFFFF',         // Text on secondary background (consistent)
  onSuccess: '#FFFFFF',           // Text on success background
  onError: '#FFFFFF',             // Text on error background
  onWarning: '#000000',           // Text on warning background
  onInfo: '#FFFFFF',              // Text on info background
  onSurface: '#1E293B',           // Text on surface (same as light mode for type consistency)
  onBackground: '#1E293B',        // Text on background (same as light mode for type consistency)
  onSurfaceDisabled: '#CBD5E1',   // Disabled text color (same as light mode for type consistency)

  // =============================================================================
  // MATERIAL DESIGN 3 - CONTAINER COLORS (Same as light mode for type consistency)
  // =============================================================================
  primaryContainer: '#DBEAFE',    // Same as light mode for type consistency
  onPrimaryContainer: '#1E40AF',  // Same as light mode for type consistency
  secondaryContainer: '#E0E7FF',  // Same as light mode for type consistency
  onSecondaryContainer: '#3730A3', // Same as light mode for type consistency
  errorContainer: '#FEE2E2',      // Same as light mode for type consistency
  onErrorContainer: '#991B1B',    // Same as light mode for type consistency

  // =============================================================================
  // MATERIAL DESIGN 3 - OUTLINE (Same as light mode for type consistency)
  // =============================================================================
  outline: '#CBD5E1',             // Same as light mode for type consistency
  outlineVariant: '#E2E8F0',      // Same as light mode for type consistency
  outlineDisabled: '#E2E8F0',     // Same as light mode for type consistency

  // =============================================================================
  // SEMANTIC UI COLORS (same as light)
  // =============================================================================
  success: '#10B981',
  successLight: '#34D399',
  successDark: '#059669',

  error: '#EF4444',
  errorLight: '#F87171',
  errorDark: '#DC2626',

  warning: '#F59E0B',
  warningLight: '#FBBF24',
  warningDark: '#D97706',

  info: '#3B82F6',
  infoLight: '#60A5FA',
  infoDark: '#2563EB',

  // =============================================================================
  // SEMANTIC CONTAINER COLORS (Same as light mode for type consistency)
  // =============================================================================
  successContainer: '#D1FAE5',        // Same as light mode for type consistency
  onSuccessContainer: '#065F46',      // Same as light mode for type consistency
  warningContainer: '#FEF3C7',        // Same as light mode for type consistency
  onWarningContainer: '#92400E',      // Same as light mode for type consistency
  infoContainer: '#DBEAFE',           // Same as light mode for type consistency
  onInfoContainer: '#1E40AF',         // Same as light mode for type consistency

  // =============================================================================
  // GRAYSCALE PALETTE (Same as light mode for type consistency)
  // =============================================================================
  gray50: '#FAFAFA',
  gray100: '#F4F4F5',
  gray200: '#E4E4E7',
  gray300: '#D4D4D8',
  gray400: '#A1A1AA',
  gray500: '#71717A',
  gray600: '#52525B',
  gray700: '#3F3F46',
  gray800: '#27272A',
  gray900: '#18181B',

  // =============================================================================
  // BACKGROUND COLORS (dark mode specific colors)
  // =============================================================================
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F8FAFC',

  surface: '#FFFFFF',
  surfaceVariant: '#F1F5F9',
  surfaceSecondary: '#F1F5F9', // Alias
  surfaceDisabled: '#F4F4F5',     // Same as light mode for type consistency

  // =============================================================================
  // TEXT COLORS (same as light mode for type consistency)
  // =============================================================================
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  textDisabled: '#CBD5E1',
  textInverse: '#FFFFFF',

  // =============================================================================
  // BORDER COLORS (same as light mode for type consistency)
  // =============================================================================
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  borderMedium: '#CBD5E1',
  borderFocus: '#3B82F6',

  // =============================================================================
  // COMPONENT-SPECIFIC COLORS (same as light mode for type consistency)
  // =============================================================================
  buttonPrimary: '#3B82F6',
  buttonSecondary: '#8B5CF6',

  inputBackground: '#FFFFFF',
  inputBorder: '#E2E8F0',

  cardBackground: '#FFFFFF',

  // =============================================================================
  // SPECIAL COLORS
  // =============================================================================
  transparent: 'transparent',
  black: '#000000',
  white: '#FFFFFF',

  // =============================================================================
  // RGBA OVERLAY COLORS (Same as light mode for type consistency)
  // =============================================================================
  modalOverlay: 'rgba(0, 0, 0, 0.5)',
  overlaySubtle: 'rgba(0, 0, 0, 0.05)',
  overlayLight: 'rgba(0, 0, 0, 0.1)',
  overlayMedium: 'rgba(0, 0, 0, 0.3)',
  overlayBackground: 'rgba(0, 0, 0, 0.05)',

  whiteOverlay: 'rgba(255, 255, 255, 0.2)',
  whiteOverlayStrong: 'rgba(255, 255, 255, 0.95)',
  whiteOverlayBorder: 'rgba(255, 255, 255, 0.5)',

  textWhiteOpacity: 'rgba(255, 255, 255, 0.8)',

  errorBackground: 'rgba(239, 68, 68, 0.1)',
  primaryBackground: 'rgba(99, 102, 241, 0.1)',

  cardOverlay: 'rgba(0, 0, 0, 0.15)',

  inputBackground_RGBA: 'rgba(248, 250, 252, 0.9)',

  // =============================================================================
  // SHADOW COLORS (Same as light mode for type consistency)
  // =============================================================================
  // SHADOW COLORS - REMOVED (React Native Web incompatibility)
  // NOTE: Use borders and background colors for depth instead
  // =============================================================================

  // =============================================================================
  // GRADIENTS (Same as light mode for type consistency)
  // =============================================================================
  gradient: ['#3B82F6', '#8B5CF6'],
};

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type ColorPalette = typeof lightColors;
export type ThemeMode = 'light' | 'dark';

/**
 * Get color palette for specific theme mode
 * @param mode - 'light' or 'dark'
 * @returns Color palette object
 */
export const getColorPalette = (mode: ThemeMode): ColorPalette => {
  return mode === 'dark' ? darkColors : lightColors;
};
