/**
 * AtomicProgress - Universal Progress Bar Component
 *
 * Displays progress bars for completion tracking
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ATOM
 * Purpose: Progress indication and completion tracking
 *
 * Usage:
 * - File upload progress
 * - Task completion progress
 * - Achievement progress
 * - Form completion
 */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-theme';
// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================
export const AtomicProgress = ({ value, height = 8, width = '100%', color, backgroundColor, shape = 'rounded', showPercentage = false, showValue = false, textColor, style, testID, }) => {
    const tokens = useAppDesignTokens();
    // Clamp value between 0 and 100
    const clampedValue = Math.max(0, Math.min(100, value));
    // Default colors
    const progressColor = color || tokens.colors.primary;
    const progressBackground = backgroundColor || tokens.colors.surfaceVariant;
    const progressTextColor = textColor || tokens.colors.textPrimary;
    // Calculate progress width
    const progressWidth = `${clampedValue}%`;
    // Border radius based on shape
    const borderRadius = shape === 'rounded' ? height / 2 : 0;
    const containerStyle = {
        width: width,
        height,
        backgroundColor: progressBackground,
        borderRadius,
        overflow: 'hidden',
    };
    const progressStyle = {
        width: progressWidth,
        height: '100%',
        backgroundColor: progressColor,
        borderRadius,
    };
    const textStyle = {
        fontSize: tokens.typography.bodySmall.fontSize,
        fontWeight: tokens.typography.labelMedium.fontWeight,
        color: progressTextColor,
        textAlign: 'center',
    };
    return (<View style={[containerStyle, style]} testID={testID}>
      <View style={progressStyle}/>
      {(showPercentage || showValue) && (<View style={styles.textContainer}>
          <Text style={textStyle}>
            {showPercentage ? `${Math.round(clampedValue)}%` : `${Math.round(clampedValue)}`}
          </Text>
        </View>)}
    </View>);
};
// =============================================================================
// STYLES
// =============================================================================
const styles = StyleSheet.create({
    textContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
// =============================================================================
// EXPORTS
// =============================================================================
export default AtomicProgress;
