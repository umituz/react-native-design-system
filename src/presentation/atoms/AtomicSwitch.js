/**
 * AtomicSwitch - Universal Switch Component
 *
 * Provides consistent switch/toggle functionality with theme integration
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ATOM
 * Purpose: Basic switch/toggle input
 *
 * Usage:
 * - Settings toggles
 * - Feature enable/disable
 * - Boolean preferences
 * - Form inputs
 */
import React from 'react';
import { Switch, StyleSheet } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-theme';
// =============================================================================
// SIZE CONFIGURATION
// =============================================================================
const SIZE_CONFIG = {
    sm: { scaleX: 0.8, scaleY: 0.8 },
    md: { scaleX: 1, scaleY: 1 },
    lg: { scaleX: 1.2, scaleY: 1.2 },
};
// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================
export const AtomicSwitch = ({ value, onValueChange, size = 'md', variant = 'primary', disabled = false, style, trackColor, thumbColor, ios_backgroundColor, ...props }) => {
    const tokens = useAppDesignTokens();
    const styles = getStyles(tokens);
    const sizeConfig = SIZE_CONFIG[size];
    const colors = getVariantColors(tokens, variant);
    const defaultTrackColor = trackColor || {
        false: colors.trackFalse,
        true: colors.trackTrue,
    };
    const defaultThumbColor = thumbColor || colors.thumb;
    const defaultIosBackgroundColor = ios_backgroundColor || colors.trackFalse;
    return (<Switch value={value} onValueChange={onValueChange} disabled={disabled} trackColor={defaultTrackColor} thumbColor={defaultThumbColor} ios_backgroundColor={defaultIosBackgroundColor} style={[
            styles.switch,
            {
                transform: [{ scaleX: sizeConfig.scaleX }, { scaleY: sizeConfig.scaleY }],
            },
            style,
        ]} {...props}/>);
};
// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
const getVariantColors = (tokens, variant) => {
    switch (variant) {
        case 'primary':
            return {
                trackFalse: tokens.colors.surfaceSecondary,
                trackTrue: tokens.colors.primary,
                thumb: tokens.colors.surface,
            };
        case 'secondary':
            return {
                trackFalse: tokens.colors.surfaceSecondary,
                trackTrue: tokens.colors.secondary,
                thumb: tokens.colors.surface,
            };
        case 'success':
            return {
                trackFalse: tokens.colors.surfaceSecondary,
                trackTrue: tokens.colors.success,
                thumb: tokens.colors.surface,
            };
        case 'warning':
            return {
                trackFalse: tokens.colors.surfaceSecondary,
                trackTrue: tokens.colors.warning,
                thumb: tokens.colors.surface,
            };
        case 'error':
            return {
                trackFalse: tokens.colors.surfaceSecondary,
                trackTrue: tokens.colors.error,
                thumb: tokens.colors.surface,
            };
        default:
            return {
                trackFalse: tokens.colors.surfaceSecondary,
                trackTrue: tokens.colors.primary,
                thumb: tokens.colors.surface,
            };
    }
};
// =============================================================================
// STYLES
// =============================================================================
const getStyles = (tokens) => StyleSheet.create({
    switch: {
    // Default switch styling is handled by platform
    },
});
// =============================================================================
// EXPORTS
// =============================================================================
export default AtomicSwitch;
