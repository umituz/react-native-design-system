/**
 * SectionCard Molecule Component
 *
 * Reusable section card with title and content area.
 * Used throughout settings screens for consistent grouping.
 *
 * Features:
 * - Automatic theme-aware styling
 * - Uppercase section titles with proper spacing
 * - Built on AtomicCard for consistency
 * - Flexible content area
 *
 * Atomic Design: Molecule (Card + Text)
 */
import React from 'react';
interface SectionCardProps {
    title: string;
    children: React.ReactNode;
    style?: object;
    contentStyle?: object;
    testID?: string;
}
export declare const SectionCard: React.FC<SectionCardProps>;
export {};
