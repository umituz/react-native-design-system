/**
 * ScreenLayout - Universal Screen Container Component
 *
 * Provides consistent layout structure for all screens:
 * - SafeAreaView with configurable edges
 * - Optional ScrollView for content
 * - Theme-aware background colors
 * - Optional header/footer slots
 * - Consistent spacing and padding
 *
 * Usage:
 * <ScreenLayout>
 *   <View>Your content here</View>
 * </ScreenLayout>
 *
 * Advanced:
 * <ScreenLayout
 *   scrollable={false}
 *   edges={['top', 'bottom']}
 *   header={<CustomHeader />}
 * >
 *   <View>Content</View>
 * </ScreenLayout>
 */
import React from 'react';
import { ViewStyle } from 'react-native';
import { Edge } from 'react-native-safe-area-context';
export interface ScreenLayoutProps {
    /**
     * Content to render inside the layout
     */
    children: React.ReactNode;
    /**
     * Enable scrolling (default: true)
     * Set to false for screens with custom scroll logic
     */
    scrollable?: boolean;
    /**
     * Safe area edges to apply (default: ['top'])
     * Common values:
     * - ['top'] - For screens with bottom tabs
     * - ['top', 'bottom'] - For modal screens
     * - [] - No safe area (use cautiously)
     */
    edges?: Edge[];
    /**
     * Optional header component
     * Rendered above scrollable content
     */
    header?: React.ReactNode;
    /**
     * Optional footer component
     * Rendered below scrollable content
     */
    footer?: React.ReactNode;
    /**
     * Override background color
     * If not provided, uses theme's backgroundPrimary
     */
    backgroundColor?: string;
    /**
     * Custom container style
     */
    containerStyle?: ViewStyle;
    /**
     * Custom content container style (for ScrollView)
     */
    contentContainerStyle?: ViewStyle;
    /**
     * Test ID for automation
     */
    testID?: string;
    /**
     * Hide vertical scroll indicator (default: false)
     */
    hideScrollIndicator?: boolean;
    /**
     * Enable keyboard avoiding behavior (default: false)
     * Useful for screens with inputs
     */
    keyboardAvoiding?: boolean;
}
export declare const ScreenLayout: React.FC<ScreenLayoutProps>;
