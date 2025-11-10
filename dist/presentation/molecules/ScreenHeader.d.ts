/**
 * ScreenHeader Component - {{APP_NAME}}
 *
 * Reusable screen header with consistent back button placement
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Features:
 * - Top-left back button (arrow-back icon)
 * - Centered title text
 * - Optional right action button
 * - Consistent spacing and layout
 * - Works with all 100+ generated apps
 *
 * CRITICAL: Back button MUST ALWAYS be top-left (never bottom, never center)
 */
import React from 'react';
import { ViewStyle } from 'react-native';
export interface ScreenHeaderProps {
    /** Screen title (centered) */
    title: string;
    /** Optional right action button */
    rightAction?: React.ReactNode;
    /** Custom back button action (default: navigation.goBack()) */
    onBackPress?: () => void;
    /** Hide back button (rare cases only) */
    hideBackButton?: boolean;
    /** Additional header style */
    style?: ViewStyle;
    /** Test ID for E2E testing */
    testID?: string;
}
/**
 * ScreenHeader Component
 *
 * @example
 * // Basic usage (most common)
 * <ScreenHeader title="Settings" />
 *
 * @example
 * // With right action
 * <ScreenHeader
 *   title="Edit Profile"
 *   rightAction={<TouchableOpacity onPress={handleSave}><Text>Save</Text></TouchableOpacity>}
 * />
 *
 * @example
 * // Custom back action
 * <ScreenHeader
 *   title="Unsaved Changes"
 *   onBackPress={handleUnsavedChanges}
 * />
 */
export declare const ScreenHeader: React.FC<ScreenHeaderProps>;
export default ScreenHeader;
