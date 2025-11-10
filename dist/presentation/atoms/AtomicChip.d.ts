/**
 * AtomicChip - Universal Chip/Tag Component
 *
 * Displays small tags, labels, or status indicators
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ATOM
 * Purpose: Tag and label display
 *
 * Usage:
 * - Category tags
 * - Status indicators
 * - Filter chips
 * - Skill labels
 * - Badge displays
 */
import React from 'react';
import { ViewStyle } from 'react-native';
export interface AtomicChipProps {
    /** Text content of the chip */
    children: React.ReactNode;
    /** Chip variant */
    variant?: 'filled' | 'outlined' | 'soft';
    /** Chip size */
    size?: 'sm' | 'md' | 'lg';
    /** Chip color theme */
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
    /** Custom background color */
    backgroundColor?: string;
    /** Custom text color */
    textColor?: string;
    /** Custom border color */
    borderColor?: string;
    /** Leading icon */
    leadingIcon?: string;
    /** Trailing icon */
    trailingIcon?: string;
    /** Whether the chip is clickable */
    clickable?: boolean;
    /** Click handler */
    onPress?: () => void;
    /** Whether the chip is selected */
    selected?: boolean;
    /** Whether the chip is disabled */
    disabled?: boolean;
    /** Style overrides */
    style?: ViewStyle;
    /** Test ID for testing */
    testID?: string;
}
export declare const AtomicChip: React.FC<AtomicChipProps>;
export default AtomicChip;
