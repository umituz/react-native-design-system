/**
 * Style Composer Utility
 * Centralized style composition logic to avoid duplication across components
 */

import type { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

type StyleType = ViewStyle | TextStyle | ImageStyle;

/**
 * Composes multiple styles into a single style array
 * Handles conditional styles and prevents undefined values
 *
 * @param baseStyle - The base style object
 * @param additionalStyles - Additional styles to compose (can be conditional)
 * @returns Composed style array
 */
export function composeStyles<T extends StyleType>(
  baseStyle?: StyleProp<T>,
  ...additionalStyles: (StyleProp<T> | boolean | undefined | null)[]
): StyleProp<T> {
  const composed: any[] = [];

  // Add base style if provided
  if (baseStyle) {
    composed.push(baseStyle);
  }

  // Add additional styles, filtering out falsy values
  additionalStyles.forEach((style) => {
    if (style && style !== true) {
      composed.push(style);
    }
  });

  return composed as StyleProp<T>;
}

/**
 * Composes styles with condition handling
 * Useful for variant-based style composition
 *
 * @param baseStyles - Base style object
 * @param variantStyles - Variant-specific styles
 * @param condition - Whether to apply variant styles
 * @returns Composed style array
 */
export function composeVariantStyles<T extends StyleType>(
  baseStyles: StyleProp<T>,
  variantStyles: StyleProp<T>,
  condition: boolean
): StyleProp<T> {
  return composeStyles(baseStyles, condition && variantStyles);
}

/**
 * Merges multiple style objects into one
 * Deep merges style properties
 *
 * @param styles - Styles to merge
 * @returns Merged style object
 */
export function mergeStyles<T extends StyleType>(
  ...styles: (StyleProp<T> | undefined | null)[]
): StyleProp<T> {
  const merged: T = {} as T;

  styles.forEach((style) => {
    if (style && typeof style === 'object') {
      Object.assign(merged, style);
    }
  });

  return merged;
}

/**
 * Creates a style resolver for responsive designs
 * Returns appropriate style based on screen size
 *
 * @param small - Style for small screens
 * @param medium - Style for medium screens
 * @param large - Style for large screens
 * @param screenSize - Current screen size category
 * @returns Appropriate style for the screen size
 */
export function resolveResponsiveStyle<T extends StyleType>(
  small: T,
  medium: T,
  large: T,
  screenSize: 'small' | 'medium' | 'large'
): T {
  return screenSize === 'large' ? large : screenSize === 'medium' ? medium : small;
}
