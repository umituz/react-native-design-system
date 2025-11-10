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
import { SwitchProps, ViewStyle } from 'react-native';
export interface AtomicSwitchProps extends Omit<SwitchProps, 'style'> {
    /** Switch value */
    value: boolean;
    /** Value change handler */
    onValueChange: (value: boolean) => void;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Color variant */
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    /** Disabled state */
    disabled?: boolean;
    /** Container style override */
    style?: ViewStyle;
    /** Track color override */
    trackColor?: {
        false: string;
        true: string;
    };
    /** Thumb color override */
    thumbColor?: string;
    /** iOS specific props */
    ios_backgroundColor?: string;
}
export declare const AtomicSwitch: React.FC<AtomicSwitchProps>;
export default AtomicSwitch;
