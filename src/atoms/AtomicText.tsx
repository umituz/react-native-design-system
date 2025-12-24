import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';
import { useAppDesignTokens, useResponsiveDesignTokens } from '@theme';
import type { TextStyleVariant, ColorVariant } from '@typography';
import { getTextColor } from '@typography';

export interface AtomicTextProps {
  children: React.ReactNode;
  type?: TextStyleVariant;
  color?: ColorVariant | string;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  style?: StyleProp<TextStyle>;
  testID?: string;
  /** Enable responsive font sizing (scales based on device) */
  responsive?: boolean;
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
  responsive = false,
}) => {
  const staticTokens = useAppDesignTokens();
  const responsiveTokens = useResponsiveDesignTokens();

  // Use responsive tokens if enabled, otherwise use static
  const tokens = responsive ? responsiveTokens : staticTokens;

  // Get typography style from tokens
  const typographyStyle = (tokens.typography as Record<string, any>)[type];

  // Get color from tokens or use custom color using utility function
  const resolvedColor = getTextColor(color, tokens);

  // Use responsive font size if enabled and available
  const fontSize = responsive && typographyStyle.responsiveFontSize
    ? typographyStyle.responsiveFontSize
    : typographyStyle.fontSize;

  const textStyle: StyleProp<TextStyle> = [
    typographyStyle,
    {
      color: resolvedColor,
      ...(fontSize && { fontSize }),
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
