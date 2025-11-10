/**
 * AtomicBadge - Universal Badge Component
 *
 * Provides consistent badge/notification count display
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ATOM
 * Purpose: Display counts, notifications, status indicators
 *
 * Usage:
 * - Notification counts
 * - Cart item counts
 * - Status indicators
 * - Achievement badges
 */
import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
export interface AtomicBadgeProps {
    /** Badge content (number, text, or custom element) */
    children: React.ReactNode;
    /** Size variant */
    size?: 'xs' | 'sm' | 'md' | 'lg';
    /** Color variant */
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
    /** Shape variant */
    shape?: 'circle' | 'rounded' | 'square';
    /** Maximum value to display (e.g., 99+) */
    max?: number;
    /** Show badge even when count is 0 */
    showZero?: boolean;
    /** Container style override */
    style?: StyleProp<ViewStyle>;
    /** Text style override */
    textStyle?: StyleProp<TextStyle>;
    /** Minimum width */
    minWidth?: number;
    /** Maximum width */
    maxWidth?: number;
}
export declare const AtomicBadge: React.FC<AtomicBadgeProps>;
export default AtomicBadge;
