/**
 * Icon Adapter Interface
 *
 * Universal interface that all icon library adapters must implement.
 * This allows seamless switching between icon libraries.
 *
 * @example
 * // Implementing for a new library:
 * export const MyLibraryAdapter: IIconAdapter = {
 *   getIconComponent: (name) => MyIcons[name],
 *   getIconSize: (size) => sizeMap[size],
 *   getIconColor: (color, tokens) => colorMap[color],
 *   getAllIcons: () => Object.keys(MyIcons),
 * };
 */

import type { DesignTokens } from '@umituz/react-native-design-system';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type IconColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'onSurface'
  | 'surfaceVariant'
  | 'onPrimary'
  | 'onSecondary'
  | 'textInverse';

/**
 * Icon Adapter Interface
 * All icon library adapters must implement this interface
 */
export interface IIconAdapter {
  /**
   * Get the icon component for a given icon name
   * @param name - Icon name (library-specific)
   * @returns Icon component or null if not found
   */
  getIconComponent: (name: string) => any | null;

  /**
   * Convert semantic size to pixel size
   * @param size - Semantic size (xs, sm, md, lg, xl, xxl)
   * @param customSize - Optional custom pixel size
   * @returns Pixel size
   */
  getIconSize: (size: IconSize, customSize?: number) => number;

  /**
   * Convert semantic color to hex color
   * @param color - Semantic color name
   * @param tokens - Design tokens for theme colors
   * @param customColor - Optional custom hex color
   * @returns Hex color string
   */
  getIconColor: (
    color: IconColor,
    tokens: DesignTokens,
    customColor?: string
  ) => string;

  /**
   * Get all available icon names for this library
   * @returns Array of icon names
   */
  getAllIcons: () => string[];

  /**
   * Check if an icon exists in the library
   * @param name - Icon name to check
   * @returns True if icon exists
   */
  hasIcon: (name: string) => boolean;

  /**
   * Get default stroke width for outline icons
   * @returns Stroke width number
   */
  getStrokeWidth?: () => number;
}

/**
 * Icon Props - Universal props for Icon component
 */
export interface IconProps {
  /**
   * Icon name (library-specific)
   */
  name: string;

  /**
   * Icon size preset
   */
  size?: IconSize;

  /**
   * Custom pixel size (overrides size preset)
   */
  customSize?: number;

  /**
   * Semantic color
   */
  color?: IconColor;

  /**
   * Custom hex color (overrides semantic color)
   */
  customColor?: string;

  /**
   * Stroke width for outline icons
   */
  strokeWidth?: number;

  /**
   * Background circle for icon
   */
  withBackground?: boolean;

  /**
   * Background color
   */
  backgroundColor?: string;

  /**
   * Accessibility label
   */
  accessibilityLabel?: string;

  /**
   * Test ID
   */
  testID?: string;

  /**
   * Custom styles
   */
  style?: any;
}
