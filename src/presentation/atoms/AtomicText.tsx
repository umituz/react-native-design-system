import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-theme';

export type TextStyleVariant =
  | 'displayLarge' | 'displayMedium' | 'displaySmall'
  | 'headlineLarge' | 'headlineMedium' | 'headlineSmall'
  | 'titleLarge' | 'titleMedium' | 'titleSmall'
  | 'bodyLarge' | 'bodyMedium' | 'bodySmall'
  | 'labelLarge' | 'labelMedium' | 'labelSmall';

/**
 * Material Design 3 Text Color Variants
 * 
 * TEXT COLORS (for text on surfaces):
 * - textPrimary, textSecondary, textTertiary: General text colors
 * - onSurface, onBackground: Text on surface/background
 * 
 * ON COLORS (for text on colored backgrounds):
 * - onPrimary, onSecondary: Text on primary/secondary colored backgrounds
 * - onSuccess, onError, onWarning, onInfo: Text on semantic colored backgrounds
 * 
 * SEMANTIC COLORS (can be used as text colors):
 * - success, error, warning, info: Semantic colors (can be text or background)
 * 
 * NOTE: 'primary' and 'secondary' are BACKGROUND colors, not text colors.
 * Use 'onPrimary'/'onSecondary' for text on colored backgrounds, or
 * 'textPrimary'/'textSecondary' for general text.
 */
export type ColorVariant =
  // General text colors (Material Design 3)
  | 'textPrimary'
  | 'textSecondary'
  | 'textTertiary'
  | 'textDisabled'
  | 'textInverse'
  // Text on surfaces (Material Design 3)
  | 'onSurface'
  | 'onBackground'
  // Text on colored backgrounds (Material Design 3)
  | 'onPrimary'
  | 'onSecondary'
  | 'onSuccess'
  | 'onError'
  | 'onWarning'
  | 'onInfo'
  // Semantic colors (can be used as text)
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  // Legacy support (deprecated - use textPrimary/textSecondary instead)
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'disabled'
  | 'inverse'
  // Legacy: surfaceVariant is a background color, maps to textSecondary
  | 'surfaceVariant';

export interface AtomicTextProps {
  children: React.ReactNode;
  type?: TextStyleVariant;
  color?: ColorVariant | string;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  style?: StyleProp<TextStyle>;
  testID?: string;
}

export const AtomicText: React.FC<AtomicTextProps> = ({
  children,
  type = 'bodyMedium',
  color,
  numberOfLines,
  ellipsizeMode,
  textAlign,
  style,
  testID,
}) => {
  const tokens = useAppDesignTokens();

  // Get typography style from tokens
  const typographyStyle = tokens.typography[type];

  // Get color from tokens or use custom color
  const getTextColor = (): string => {
    if (!color) {
      return tokens.colors.textPrimary;
    }

    // Material Design 3 text color mapping
    const colorMap: Partial<Record<ColorVariant, string>> = {
      // General text colors (Material Design 3)
      textPrimary: tokens.colors.textPrimary,
      textSecondary: tokens.colors.textSecondary,
      textTertiary: tokens.colors.textTertiary,
      textDisabled: tokens.colors.textDisabled,
      textInverse: tokens.colors.textInverse,
      
      // Text on surfaces (Material Design 3)
      onSurface: tokens.colors.onSurface,
      onBackground: tokens.colors.onBackground,
      
      // Text on colored backgrounds (Material Design 3)
      onPrimary: tokens.colors.onPrimary,
      onSecondary: tokens.colors.onSecondary,
      onSuccess: tokens.colors.onSuccess,
      onError: tokens.colors.onError,
      onWarning: tokens.colors.onWarning,
      onInfo: tokens.colors.onInfo,
      
      // Semantic colors (can be used as text)
      success: tokens.colors.success,
      error: tokens.colors.error,
      warning: tokens.colors.warning,
      info: tokens.colors.info,
      
      // Legacy support (deprecated - maps to new names)
      primary: tokens.colors.textPrimary, // Legacy: use textPrimary or onPrimary
      secondary: tokens.colors.textSecondary, // Legacy: use textSecondary or onSecondary
      tertiary: tokens.colors.textTertiary, // Legacy: use textTertiary
      disabled: tokens.colors.textDisabled, // Legacy: use textDisabled
      inverse: tokens.colors.textInverse, // Legacy: use textInverse
      // Legacy: surfaceVariant is a background color, but used as text - map to textSecondary
      surfaceVariant: tokens.colors.textSecondary, // Legacy: use textSecondary instead
    };

    return colorMap[color as ColorVariant] || color;
  };

  const textStyle: StyleProp<TextStyle> = [
    typographyStyle,
    { 
      color: getTextColor(),
      ...(textAlign && { textAlign }),
    },
    style,
  ];

  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={textStyle}
      testID={testID}
    >
      {children}
    </Text>
  );
};
