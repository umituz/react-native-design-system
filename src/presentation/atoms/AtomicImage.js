/**
 * AtomicImage - Universal Image Component
 *
 * Provides consistent image handling across the app with theme integration
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ATOM
 * Purpose: Basic image display with consistent styling
 *
 * Usage:
 * - Profile pictures
 * - Product images
 * - Icons and illustrations
 * - Background images
 */
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-theme';
// =============================================================================
// SIZE CONFIGURATION
// =============================================================================
const SIZE_CONFIG = {
    xs: 24,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
    xxl: 128,
};
// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================
export const AtomicImage = ({ source, size = 'md', shape = 'rounded', borderRadius, style, imageStyle, backgroundColor, borderColor, borderWidth = 0, ...props }) => {
    const tokens = useAppDesignTokens();
    const styles = getStyles(tokens);
    const imageSize = SIZE_CONFIG[size];
    const calculatedBorderRadius = borderRadius ?? getBorderRadius(shape, imageSize, tokens);
    const containerStyle = [
        styles.container,
        {
            width: imageSize,
            height: imageSize,
            borderRadius: calculatedBorderRadius,
            backgroundColor: backgroundColor || tokens.colors.surface,
            borderColor: borderColor || tokens.colors.border,
            borderWidth,
        },
        style,
    ];
    const finalImageStyle = [
        styles.image,
        {
            borderRadius: calculatedBorderRadius,
        },
        imageStyle,
    ];
    return (<Image source={source} style={finalImageStyle} {...props}/>);
};
// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
const getBorderRadius = (shape, size, tokens) => {
    switch (shape) {
        case 'circle':
            return size / 2;
        case 'square':
            return 0;
        case 'rounded':
        default:
            return tokens.borders.radius.md;
    }
};
// =============================================================================
// STYLES
// =============================================================================
const getStyles = (tokens) => StyleSheet.create({
    container: {
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});
// =============================================================================
// EXPORTS
// =============================================================================
export default AtomicImage;
