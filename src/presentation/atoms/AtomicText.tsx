import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';
import { useAppDesignTokens } from '../hooks/useAppDesignTokens';

export type TextStyleVariant =
  | 'displayLarge' | 'displayMedium' | 'displaySmall'
  | 'headlineLarge' | 'headlineMedium' | 'headlineSmall'
  | 'titleLarge' | 'titleMedium' | 'titleSmall'
  | 'bodyLarge' | 'bodyMedium' | 'bodySmall'
  | 'labelLarge' | 'labelMedium' | 'labelSmall';

export type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'disabled'
  | 'inverse'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export interface AtomicTextProps {
  children: React.ReactNode;
  type?: TextStyleVariant;
  color?: ColorVariant | string;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
  testID?: string;
}

export const AtomicText: React.FC<AtomicTextProps> = ({
  children,
  type = 'bodyMedium',
  color,
  numberOfLines,
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

    // Check if it's a semantic color name
    const colorMap: Record<ColorVariant, string> = {
      primary: tokens.colors.textPrimary,
      secondary: tokens.colors.textSecondary,
      tertiary: tokens.colors.textTertiary,
      disabled: tokens.colors.textDisabled,
      inverse: tokens.colors.textInverse,
      success: tokens.colors.success,
      error: tokens.colors.error,
      warning: tokens.colors.warning,
      info: tokens.colors.info,
    };

    return colorMap[color as ColorVariant] || color;
  };

  const textStyle: StyleProp<TextStyle> = [
    typographyStyle,
    { color: getTextColor() },
    style,
  ];

  return (
    <Text
      numberOfLines={numberOfLines}
      style={textStyle}
      testID={testID}
    >
      {children}
    </Text>
  );
};
