/**
 * AtomicDivider - Universal Divider Component
 *
 * Displays horizontal or vertical dividers for content separation
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ATOM
 * Purpose: Content separation and visual hierarchy
 *
 * Usage:
 * - Section separators
 * - List item dividers
 * - Card separators
 * - Menu dividers
 * - Form field separators
 */
import React from 'react';
import { View } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-theme';
// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================
export const AtomicDivider = ({ orientation = 'horizontal', thickness = 'thin', color, length, margin, marginTop, marginBottom, marginLeft, marginRight, style, testID, }) => {
    const tokens = useAppDesignTokens();
    // Thickness mapping
    const thicknessMap = {
        thin: 1,
        medium: 2,
        thick: 4,
    };
    const dividerThickness = thicknessMap[thickness];
    const dividerColor = color || tokens.colors.border;
    // Compute final length values with proper type handling
    const finalLength = length !== undefined ? length : (orientation === 'horizontal' ? '100%' : 20);
    // Base styles for all dividers
    const baseStyle = {
        backgroundColor: dividerColor,
        margin: margin,
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
    };
    // Orientation-specific styles with explicit type casting
    const orientationStyle = (orientation === 'horizontal' ? {
        width: finalLength,
        height: dividerThickness,
    } : {
        width: dividerThickness,
        height: finalLength,
    });
    return (<View style={[baseStyle, orientationStyle, style]} testID={testID}/>);
};
// =============================================================================
// EXPORTS
// =============================================================================
export default AtomicDivider;
