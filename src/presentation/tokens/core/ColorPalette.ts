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
  borderDisabled: '#F1F5F9',

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
  // PRIMARY BRAND COLORS (darker versions for dark mode)
  // =============================================================================
  primary: '#60A5FA',          // Lighter blue for dark backgrounds
  primaryLight: '#93C5FD',
  primaryDark: '#3B82F6',

  secondary: '#A78BFA',        // Lighter purple for dark backgrounds
  secondaryLight: '#C4B5FD',
  secondaryDark: '#8B5CF6',

  accent: '#FBBF24',           // Lighter amber for dark backgrounds
  accentLight: '#FCD34D',
  accentDark: '#F59E0B',

  // =============================================================================
  // MATERIAL DESIGN 3 - ON COLORS (Dark mode text colors)
  // =============================================================================
  onPrimary: '#000000',           // Dark text on light primary
  onSecondary: '#000000',         // Dark text on light secondary
  onSuccess: '#000000',           // Dark text on light success
  onError: '#FFFFFF',             // Light text on dark error
  onWarning: '#000000',           // Dark text on light warning
  onInfo: '#000000',              // Dark text on light info
  onSurface: '#E2E8F0',           // Light text on dark surface
  onBackground: '#F1F5F9',        // Light text on dark background
  onSurfaceDisabled: '#64748B',   // Disabled dark mode text

  // =============================================================================
  // MATERIAL DESIGN 3 - CONTAINER COLORS (Dark mode containers)
  // =============================================================================
  primaryContainer: '#1E3A8A',    // Dark blue container
  onPrimaryContainer: '#DBEAFE',  // Light text on dark primary container
  secondaryContainer: '#4C1D95',  // Dark purple container
  onSecondaryContainer: '#E0E7FF', // Light text on dark secondary container
  errorContainer: '#7F1D1D',      // Dark red container
  onErrorContainer: '#FEE2E2',    // Light text on dark error container

  // =============================================================================
  // MATERIAL DESIGN 3 - OUTLINE (Dark mode outlines)
  // =============================================================================
  outline: '#475569',             // Medium gray outline for dark mode
  outlineVariant: '#334155',      // Darker outline variant
  outlineDisabled: '#334155',     // Disabled outline

  // =============================================================================
  // SEMANTIC UI COLORS (slightly lighter for dark backgrounds)
  // =============================================================================
  success: '#34D399',             // Lighter green for dark mode
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
  // BACKGROUND COLORS (dark mode - true dark backgrounds)
  // =============================================================================
  backgroundPrimary: '#0F172A',      // Slate 900 - Deep dark background
  backgroundSecondary: '#1E293B',    // Slate 800 - Slightly lighter

  surface: '#1E293B',                // Slate 800 - Card/surface backgrounds
  surfaceVariant: '#334155',         // Slate 700 - Variant surfaces
  surfaceSecondary: '#334155',       // Alias for surfaceVariant
  surfaceDisabled: '#475569',        // Slate 600 - Disabled surfaces

  // =============================================================================
  // TEXT COLORS (dark mode - light text on dark backgrounds)
  // =============================================================================
  textPrimary: '#F1F5F9',            // Slate 100 - Primary text (very light)
  textSecondary: '#CBD5E1',          // Slate 300 - Secondary text
  textTertiary: '#94A3B8',           // Slate 400 - Tertiary text
  textDisabled: '#64748B',           // Slate 500 - Disabled text
  textInverse: '#0F172A',            // Dark text for light backgrounds

  // =============================================================================
  // BORDER COLORS (dark mode - subtle borders)
  // =============================================================================
  border: '#334155',                 // Slate 700 - Default border
  borderLight: '#475569',            // Slate 600 - Light border
  borderMedium: '#64748B',           // Slate 500 - Medium border
  borderFocus: '#60A5FA',            // Blue 400 - Focus border (lighter)
  borderDisabled: '#475569',         // Slate 600 - Disabled border

  // =============================================================================
  // COMPONENT-SPECIFIC COLORS (dark mode specific)
  // =============================================================================
  buttonPrimary: '#60A5FA',          // Lighter blue for dark mode
  buttonSecondary: '#A78BFA',        // Lighter purple for dark mode

  inputBackground: '#1E293B',        // Dark input background
  inputBorder: '#475569',            // Subtle input border

  cardBackground: '#1E293B',         // Dark card background

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
