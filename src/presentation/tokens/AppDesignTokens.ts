/**
 * DESIGN TOKENS - PUBLIC API
 *
 * ✅ CLEAN BARREL EXPORT - Single source of truth
 * ✅ ZERO DUPLICATION - All tokens from TokenFactory
 * ✅ TYPE-SAFE - Full TypeScript support
 * ✅ FACTORY-FIRST - Benefits all 100+ generated apps
 *
 * @module AppDesignTokens
 */

// =============================================================================
// CORE EXPORTS (from TokenFactory)
// =============================================================================

export {
  createDesignTokens,
  STATIC_DESIGN_TOKENS,
  STATIC_TOKENS,
  withAlpha,
  type DesignTokens,
  type ThemeMode,
  type ColorPalette,
} from './core/TokenFactory';

// =============================================================================
// BASE TOKEN EXPORTS
// =============================================================================

export {
  BASE_TOKENS,
  spacing,
  typography,
  borders,
  iconSizes,
  opacity,
  avatarSizes,
  type Spacing,
  type Typography,
  type Borders,
  type IconSizes,
  type Opacity,
  type AvatarSizes,
  type BaseTokens,
} from './core/BaseTokens';

// =============================================================================
// COLOR PALETTE EXPORTS
// =============================================================================

export {
  lightColors,
  darkColors,
  getColorPalette,
} from './core/ColorPalette';
