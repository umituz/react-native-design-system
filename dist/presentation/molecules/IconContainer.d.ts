/**
 * IconContainer Molecule Component
 *
 * Standardized icon container with consistent sizing and styling.
 * Used throughout app for icon displays in lists, cards, and settings.
 *
 * Features:
 * - Consistent sizing system
 * - Optional background circle
 * - Optional gradient background
 * - Theme-aware colors
 * - Accessibility support
 *
 * Atomic Design: Molecule (View + Icon)
 */
import React from 'react';
interface IconContainerProps {
    icon: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    backgroundColor?: string;
    gradient?: string[];
    withBorder?: boolean;
    borderColor?: string;
    style?: object;
    testID?: string;
}
export declare const IconContainer: React.FC<IconContainerProps>;
export {};
