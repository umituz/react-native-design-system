import React from 'react';
import { Text } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-theme';
export const AtomicText = ({ children, type = 'bodyMedium', color, numberOfLines, ellipsizeMode, textAlign, style, testID, }) => {
    const tokens = useAppDesignTokens();
    // Get typography style from tokens
    const typographyStyle = tokens.typography[type];
    // Get color from tokens or use custom color
    const getTextColor = () => {
        if (!color) {
            return tokens.colors.textPrimary;
        }
        // Material Design 3 text color mapping
        const colorMap = {
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
        return colorMap[color] || color;
    };
    const textStyle = [
        typographyStyle,
        {
            color: getTextColor(),
            ...(textAlign && { textAlign }),
        },
        style,
    ];
    return (<Text numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode} style={textStyle} testID={testID}>
      {children}
    </Text>);
};
