/**
 * AtomicSkeleton - Universal Skeleton Loading Component
 *
 * Displays skeleton placeholders for loading states
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ATOM
 * Purpose: Loading state placeholder
 *
 * Usage:
 * - Content loading placeholders
 * - List item skeletons
 * - Card skeletons
 * - Text line skeletons
 * - Image placeholders
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, DimensionValue } from 'react-native';
import { useAppDesignTokens } from '../hooks/useAppDesignTokens';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface AtomicSkeletonProps {
  /** Skeleton width */
  width?: number | string;
  /** Skeleton height */
  height?: number | string;
  /** Skeleton shape */
  shape?: 'rectangle' | 'circle' | 'rounded';
  /** Border radius for rounded shapes */
  borderRadius?: number;
  /** Skeleton color */
  color?: string;
  /** Style overrides */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const AtomicSkeleton: React.FC<AtomicSkeletonProps> = ({
  width = '100%',
  height = 20,
  shape = 'rectangle',
  borderRadius,
  color,
  style,
  testID,
}) => {
  const tokens = useAppDesignTokens();

  // Default values
  const skeletonColor = color || tokens.colors.surfaceVariant;

  // Calculate border radius based on shape
  const getBorderRadius = (): number => {
    if (borderRadius !== undefined) return borderRadius;
    
    switch (shape) {
      case 'circle':
        return typeof height === 'number' ? height / 2 : 20;
      case 'rounded':
        return tokens.borders.radius.md;
      case 'rectangle':
      default:
        return tokens.borders.radius.sm;
    }
  };

  const skeletonStyle: ViewStyle = {
    width: width as DimensionValue,
    height: height as DimensionValue,
    backgroundColor: skeletonColor,
    borderRadius: getBorderRadius(),
  };

  return (
    <View
      style={[skeletonStyle, style]}
      testID={testID}
    />
  );
};

// =============================================================================
// EXPORTS
// =============================================================================

export default AtomicSkeleton;
