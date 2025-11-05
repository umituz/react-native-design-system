/**
 * Lucide Icon Library Adapter
 *
 * Adapter for lucide-react-native library (1,639 icons).
 * Implements IIconAdapter interface for seamless library switching.
 *
 * @library lucide-react-native
 * @version ^0.468.0
 * @icons 1,639
 * @type outline
 *
 * @see https://lucide.dev/icons/
 */

import { icons } from 'lucide-react-native';
import type { IIconAdapter, IconSize, IconColor } from '../../domain/interfaces/IIconAdapter';
import type { DesignTokens } from '../../../../presentation/tokens/core/TokenFactory';

/**
 * Size mapping: Semantic → Pixels
 */
const SIZE_MAP: Record<IconSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 40,
};

/**
 * Lucide Adapter Implementation
 */
export const LucideAdapter: IIconAdapter = {
  /**
   * Get Lucide icon component by name
   */
  getIconComponent: (name: string) => {
    const IconComponent = icons[name as keyof typeof icons];
    if (!IconComponent) {
      if (__DEV__) {
        console.warn(`[LucideAdapter] Icon "${name}" not found in Lucide library`);
      }
      return null;
    }
    return IconComponent;
  },

  /**
   * Get icon size in pixels
   */
  getIconSize: (size: IconSize, customSize?: number) => {
    return customSize || SIZE_MAP[size];
  },

  /**
   * Get icon color from theme
   */
  getIconColor: (color: IconColor, tokens: DesignTokens, customColor?: string) => {
    if (customColor) return customColor;

    const colorMap: Record<IconColor, string> = {
      primary: tokens.colors.primary,
      secondary: tokens.colors.secondary,
      success: tokens.colors.success,
      warning: tokens.colors.warning,
      error: tokens.colors.error,
      info: tokens.colors.info,
      onSurface: tokens.colors.onSurface,
      surfaceVariant: tokens.colors.surfaceVariant,
      onPrimary: tokens.colors.onPrimary,
      onSecondary: tokens.colors.onSecondary,
      textInverse: tokens.colors.textInverse,
    };

    return colorMap[color];
  },

  /**
   * Get all available Lucide icon names
   */
  getAllIcons: () => {
    return Object.keys(icons);
  },

  /**
   * Check if icon exists in Lucide library
   */
  hasIcon: (name: string) => {
    return name in icons;
  },

  /**
   * Default stroke width for Lucide outline icons
   */
  getStrokeWidth: () => 2,
};

/**
 * Lucide icon names type (for TypeScript autocomplete)
 */
export type LucideIconName = keyof typeof icons;
