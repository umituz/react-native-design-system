/**
 * Avatar Constants
 * Configuration constants for avatar component
 */

import type { AvatarSize, AvatarShape, AvatarType, SizeConfig } from './Avatar.types';
import { calculateResponsiveSize, calculateResponsiveSizeSubtle } from '../../utils/responsiveUtils';

/**
 * Base size configurations (px) - will be multiplied by spacingMultiplier
 */
export const BASE_SIZE_CONFIGS: Record<AvatarSize, SizeConfig> = {
  xs: {
    size: 24,
    fontSize: 10,
    iconSize: 12,
    statusSize: 6,
    borderWidth: 1,
  },
  sm: {
    size: 32,
    fontSize: 12,
    iconSize: 16,
    statusSize: 8,
    borderWidth: 1.5,
  },
  md: {
    size: 40,
    fontSize: 14,
    iconSize: 20,
    statusSize: 10,
    borderWidth: 2,
  },
  lg: {
    size: 56,
    fontSize: 18,
    iconSize: 28,
    statusSize: 12,
    borderWidth: 2,
  },
  xl: {
    size: 80,
    fontSize: 24,
    iconSize: 40,
    statusSize: 16,
    borderWidth: 2.5,
  },
  xxl: {
    size: 120,
    fontSize: 36,
    iconSize: 60,
    statusSize: 20,
    borderWidth: 3,
  },
};

/**
 * Get responsive size configurations
 * Multiplies base sizes by spacingMultiplier for tablet/small device support
 */
export const getSizeConfigs = (spacingMultiplier: number): Record<AvatarSize, SizeConfig> => {
  return Object.entries(BASE_SIZE_CONFIGS).reduce((acc, [key, config]) => {
    acc[key as AvatarSize] = {
      size: calculateResponsiveSize(config.size, spacingMultiplier),
      fontSize: calculateResponsiveSize(config.fontSize, spacingMultiplier),
      iconSize: calculateResponsiveSize(config.iconSize, spacingMultiplier),
      statusSize: calculateResponsiveSize(config.statusSize, spacingMultiplier),
      borderWidth: calculateResponsiveSizeSubtle(config.borderWidth, spacingMultiplier),
    };
    return acc;
  }, {} as Record<AvatarSize, SizeConfig>);
};

/**
 * Avatar background colors
 * Vibrant, accessible colors with good contrast
 */
export const AVATAR_COLORS = [
  '#EF4444', // Red
  '#F59E0B', // Orange
  '#10B981', // Green
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#F97316', // Orange-Red
  '#06B6D4', // Cyan
  '#84CC16', // Lime
] as const;

/**
 * Status indicator colors
 */
export const STATUS_COLORS = {
  online: '#10B981', // Green
  offline: '#9CA3AF', // Gray
  away: '#F59E0B', // Orange
  busy: '#EF4444', // Red
} as const;

/**
 * Border radius configurations
 */
export const SHAPE_CONFIGS = {
  circle: 9999, // Full circle
  square: 0, // No radius
  rounded: 8, // Rounded corners
} as const;

/**
 * Avatar constants
 */
export const AVATAR_CONSTANTS = {
  DEFAULT_SIZE: 'md' as AvatarSize,
  DEFAULT_SHAPE: 'circle' as AvatarShape,
  DEFAULT_TYPE: 'initials' as AvatarType,
  DEFAULT_ICON: 'user',
  MAX_GROUP_VISIBLE: 3,
  GROUP_SPACING: -8, // Negative for overlap
  FALLBACK_INITIALS: '?',
} as const;
