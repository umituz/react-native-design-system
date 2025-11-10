import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
export type TextStyleVariant = 'displayLarge' | 'displayMedium' | 'displaySmall' | 'headlineLarge' | 'headlineMedium' | 'headlineSmall' | 'titleLarge' | 'titleMedium' | 'titleSmall' | 'bodyLarge' | 'bodyMedium' | 'bodySmall' | 'labelLarge' | 'labelMedium' | 'labelSmall';
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
export type ColorVariant = 'textPrimary' | 'textSecondary' | 'textTertiary' | 'textDisabled' | 'textInverse' | 'onSurface' | 'onBackground' | 'onPrimary' | 'onSecondary' | 'onSuccess' | 'onError' | 'onWarning' | 'onInfo' | 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'inverse' | 'surfaceVariant';
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
export declare const AtomicText: React.FC<AtomicTextProps>;
