import React from 'react';
import { Text as PaperText } from 'react-native-paper';
import { StyleProp, TextStyle } from 'react-native';

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
  return (
    <PaperText
      variant={type}
      numberOfLines={numberOfLines}
      style={style}
      testID={testID}
    >
      {children}
    </PaperText>
  );
};
