/**
 * AtomicSkeleton - Universal Skeleton Loading Component
 *
 * Displays animated skeleton placeholders for loading states
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

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ViewStyle, Animated, DimensionValue } from 'react-native';
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
  /** Animation duration in milliseconds */
  duration?: number;
  /** Whether to show animation */
  animated?: boolean;
  /** Skeleton color */
  color?: string;
  /** Highlight color for animation */
  highlightColor?: string;
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
  duration,
  animated = true,
  color,
  highlightColor,
  style,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Default values
  const finalDuration = duration ?? tokens.animations.slowest;
  const skeletonColor = color || tokens.colors.surfaceVariant;
  const skeletonHighlight = highlightColor || tokens.colors.surface;

  // Animation effect
  useEffect(() => {
    if (animated) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: finalDuration,
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: finalDuration,
            useNativeDriver: false,
          }),
        ])
      );
      animation.start();

      return () => animation.stop();
    }
  }, [animated, finalDuration, animatedValue]);

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

  if (animated) {
    const animatedStyle = {
      backgroundColor: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [skeletonColor, skeletonHighlight],
      }),
    };

    return (
      <Animated.View
        style={[skeletonStyle, animatedStyle, style]}
        testID={testID}
      />
    );
  }

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
