/**
 * SectionContainer Molecule - Universal Section Wrapper
 *
 * Provides consistent section layout with optional title
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: MOLECULE
 * Composition: View + AtomicText + Layout
 *
 * Usage:
 * - Home screen sections
 * - Dashboard sections
 * - Settings groups
 * - Content sections
 */
import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
export interface SectionContainerProps {
    /** Section title (optional) */
    title?: string;
    /** Section title color (default: textPrimary) */
    titleColor?: string;
    /** Section title style override */
    titleStyle?: TextStyle;
    /** Container style override */
    style?: ViewStyle;
    /** Content to render inside section */
    children: React.ReactNode;
    /** Right action element (e.g., "See All" link) */
    rightAction?: React.ReactNode;
}
export declare const SectionContainer: React.FC<SectionContainerProps>;
