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
import { ViewStyle } from 'react-native';
export interface AtomicDividerProps {
    /** Divider orientation */
    orientation?: 'horizontal' | 'vertical';
    /** Divider thickness */
    thickness?: 'thin' | 'medium' | 'thick';
    /** Divider color */
    color?: string;
    /** Divider length (for horizontal: width, for vertical: height) */
    length?: number | string;
    /** Margin around the divider */
    margin?: number;
    /** Margin top */
    marginTop?: number;
    /** Margin bottom */
    marginBottom?: number;
    /** Margin left */
    marginLeft?: number;
    /** Margin right */
    marginRight?: number;
    /** Style overrides */
    style?: ViewStyle;
    /** Test ID for testing */
    testID?: string;
}
export declare const AtomicDivider: React.FC<AtomicDividerProps>;
export default AtomicDivider;
