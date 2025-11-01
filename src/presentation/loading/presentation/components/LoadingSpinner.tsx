/**
 * LoadingSpinner - Theme-Aware Activity Indicator
 *
 * Refactored from AtomicLoadingSpinner - now part of Loading domain
 * Uses central useAppDesignTokens() hook for automatic theme switching
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Features:
 * - ✅ AUTOMATIC theme switching via useAppDesignTokens()
 * - ✅ Multiple size variants (small, medium, large)
 * - ✅ Dynamic color customization
 * - ✅ Overlay support
 * - ✅ Message display
 */

import React from 'react';
import { View, ActivityIndicator, ViewStyle } from 'react-native';
import { useAppDesignTokens } from '../../../hooks/useAppDesignTokens';
import { withAlpha } from '../../../tokens/AppDesignTokens';
import { AtomicText } from '../../../atoms/AtomicText';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type LoadingSpinnerSize = 'small' | 'medium' | 'large';
export type LoadingSpinnerColor = 'primary' | 'secondary' | 'white';

export interface LoadingSpinnerProps {
  size?: LoadingSpinnerSize;
  color?: LoadingSpinnerColor;
  message?: string;
  overlay?: boolean;
  style?: ViewStyle;
}

// =============================================================================
// SIZE VARIANTS
// =============================================================================

const sizeVariants: Record<LoadingSpinnerSize, 'small' | 'large'> = {
  small: 'small',
  medium: 'large',
  large: 'large',
};

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = 'primary',
  message,
  overlay = false,
  style,
}) => {
  // ✅ DYNAMIC tokens from central hook
  const tokens = useAppDesignTokens();

  const spinnerSize = sizeVariants[size];

  /**
   * Get spinner color from dynamic theme
   * ✅ Automatically updates when theme changes
   */
  const getSpinnerColor = (): string => {
    switch (color) {
      case 'primary':
        return tokens.colors.primary;
      case 'secondary':
        return tokens.colors.secondary;
      case 'white':
        return tokens.colors.textInverse;
      default:
        return tokens.colors.primary;
    }
  };

  const spinnerColor = getSpinnerColor();

  const containerStyle: ViewStyle = overlay
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: withAlpha(tokens.colors.black, 0.5),
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }
    : {
        justifyContent: 'center',
        alignItems: 'center',
        padding: tokens.spacing.lg,
      };

  return (
    <View style={[containerStyle, style]}>
      <ActivityIndicator size={spinnerSize} color={spinnerColor} />
      {message && (
        <AtomicText
          type="bodyMedium"
          color={overlay ? 'inverse' : 'primary'}
          style={{ marginTop: tokens.spacing.md, textAlign: 'center' }}
        >
          {message}
        </AtomicText>
      )}
    </View>
  );
};

export default LoadingSpinner;
