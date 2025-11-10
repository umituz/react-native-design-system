/**
 * EmptyState Molecule - Universal Empty State Display
 *
 * Displays icon, title, and subtitle for empty data scenarios
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: MOLECULE
 * Composition: Icon + AtomicText + Layout
 *
 * Usage:
 * - Empty lists
 * - Empty grids
 * - No search results
 * - No data states
 */
import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
export interface EmptyStateProps {
    /** Material icon name */
    icon: string;
    /** Icon size (default: xl) */
    iconSize?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    /** Main heading text */
    title: string;
    /** Descriptive subtitle text */
    subtitle?: string;
    /** Custom icon color (default: textTertiary) */
    iconColor?: string;
    /** Custom title color (default: textPrimary) */
    titleColor?: string;
    /** Custom subtitle color (default: textSecondary) */
    subtitleColor?: string;
    /** Container style override */
    style?: ViewStyle;
    /** Title style override */
    titleStyle?: TextStyle;
    /** Subtitle style override */
    subtitleStyle?: TextStyle;
}
export declare const EmptyState: React.FC<EmptyStateProps>;
