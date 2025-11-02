/**
 * AtomicIcon - Design System Icon Component
 *
 * Universal icon component using Lucide icons.
 * Provides semantic color mappings and size presets.
 */

import React from 'react';
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
}

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
  color = 'textPrimary',
  size = 'md',
  customSize,
  customColor,
}) => {
  const tokens = useAppDesignTokens();

  // Get icon component from Lucide
  const IconComponent = (LucideIcons as any)[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Lucide icon set`);
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

  return <IconComponent color={resolveColor()} size={iconSize} />;
};

// Re-export types for backward compatibility
export type AtomicIconProps = IconProps;
export type AtomicIconSize = IconSize;
export type AtomicIconColor = IconColor;
