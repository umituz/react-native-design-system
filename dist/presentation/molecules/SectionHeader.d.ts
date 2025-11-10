/**
 * SectionHeader Molecule - Universal Section Header
 *
 * Displays section title with optional subtitle
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: MOLECULE
 * Composition: AtomicText + Layout
 *
 * Usage:
 * - List headers
 * - Grid headers
 * - Section dividers
 * - Screen headers
 */
import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
export interface SectionHeaderProps {
    /** Main heading text */
    title: string;
    /** Optional subtitle text */
    subtitle?: string;
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
    /** Right action element (e.g., button, icon) */
    rightAction?: React.ReactNode;
}
export declare const SectionHeader: React.FC<SectionHeaderProps>;
