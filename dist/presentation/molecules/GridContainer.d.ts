/**
 * GridContainer Molecule - Responsive Grid Layout
 *
 * Provides flexible grid layout with configurable columns and gap
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: MOLECULE
 * Composition: View + Responsive Layout
 *
 * Usage:
 * - Stats grids (2 columns)
 * - Action grids (2 columns)
 * - Product grids (2-3 columns)
 * - Gallery grids (3-4 columns)
 */
import React from 'react';
import { ViewStyle } from 'react-native';
export interface GridContainerProps {
    /** Number of columns (default: 2) */
    columns?: 2 | 3 | 4;
    /** Gap between items in pixels (default: 8) */
    gap?: number;
    /** Container style override */
    style?: ViewStyle;
    /** Grid items to render */
    children: React.ReactNode;
}
export interface GridItemProps {
    /** Item content */
    children: React.ReactNode;
    /** Item style override */
    style?: ViewStyle;
}
declare const GridContainerComponent: React.FC<GridContainerProps>;
export declare const GridItem: React.FC<GridItemProps>;
export declare const GridContainer: typeof GridContainerComponent & {
    Item: typeof GridItem;
};
export {};
