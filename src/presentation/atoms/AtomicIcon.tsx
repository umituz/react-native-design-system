/**
 * AtomicIcon - Design System Icon Component
 *
 * Universal icon component using Lucide icons.
 * Provides semantic color mappings and size presets.
 */

import React from 'react';
import type { ViewStyle } from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { useAppDesignTokens } from '../hooks/useAppDesignTokens';

/**
 * Icon size presets
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Semantic color tokens
 */
export type IconColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'success'
  | 'info'
  | 'onPrimary'
  | 'onSurface'
  | 'textPrimary'
  | 'textSecondary'
  | 'textDisabled';

/**
 * Icon component props
 */
export interface IconProps {
  /** Icon name from Lucide icon set (PascalCase) */
  name: string;
  /** Semantic color token */
  color?: IconColor;
  /** Size preset */
  size?: IconSize;
  /** Custom size override (pixels) */
  customSize?: number;
  /** Custom color override (hex) */
  customColor?: string;
  /** Optional style */
  style?: ViewStyle;
  /** Optional test ID */
  testID?: string;
  /** Legacy prop support: icon (alias for name) */
  icon?: string;
}

/**
 * Icon name type (all Lucide icon names as string)
 */
export type IconName = string;

/**
 * Size mapping (pixels)
 */
const sizeMap: Record<IconSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 48,
};

/**
 * AtomicIcon Component
 *
 * Universal icon component with theme integration
 */
export const AtomicIcon: React.FC<IconProps> = ({
  name,
  icon, // Legacy support
  color = 'textPrimary',
  size = 'md',
  customSize,
  customColor,
  style,
  testID,
}) => {
  const tokens = useAppDesignTokens();

  // Support legacy 'icon' prop (fallback to 'name')
  const iconName = name || icon || '';

  // Get icon component from Lucide
  const IconComponent = (LucideIcons as any)[iconName];

  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in Lucide icon set`);
    return null;
  }

  // Resolve color from semantic token
  const resolveColor = (): string => {
    if (customColor) return customColor;

    const colorMap: Record<IconColor, string> = {
      primary: tokens.colors.primary,
      secondary: tokens.colors.secondary,
      error: tokens.colors.error,
      warning: tokens.colors.warning,
      success: tokens.colors.success,
      info: tokens.colors.info,
      onPrimary: tokens.colors.onPrimary,
      onSurface: tokens.colors.onSurface,
      textPrimary: tokens.colors.textPrimary,
      textSecondary: tokens.colors.textSecondary,
      textDisabled: tokens.colors.textDisabled,
    };

    return colorMap[color];
  };

  // Resolve size
  const iconSize = customSize || sizeMap[size];

  return <IconComponent color={resolveColor()} size={iconSize} style={style} testID={testID} />;
};

// Re-export types for backward compatibility
export type AtomicIconProps = IconProps;
export type AtomicIconSize = IconSize;
export type AtomicIconColor = IconColor;
export type AtomicIconName = IconName;
