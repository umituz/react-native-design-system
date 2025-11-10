/**
 * AtomicAvatarGroup - Universal Avatar Group Component
 *
 * Displays multiple avatars in a group with overlap and overflow handling
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ATOM
 * Purpose: Multiple avatar display with group behavior
 *
 * Usage:
 * - Team member avatars
 * - Group chat participants
 * - Project collaborators
 * - Event attendees
 * - Social connections
 */
import React from 'react';
import { ViewStyle } from 'react-native';
export interface AvatarData {
    id: string;
    source?: {
        uri: string;
    } | number;
    name?: string;
    backgroundColor?: string;
    textColor?: string;
}
export interface AtomicAvatarGroupProps {
    /** Array of avatar data */
    avatars: AvatarData[];
    /** Maximum number of avatars to show */
    maxVisible?: number;
    /** Avatar size */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    /** Custom avatar size */
    customSize?: number;
    /** Spacing between avatars */
    spacing?: number;
    /** Whether to show overflow count */
    showOverflow?: boolean;
    /** Overflow count background color */
    overflowBackgroundColor?: string;
    /** Overflow count text color */
    overflowTextColor?: string;
    /** Avatar border width */
    borderWidth?: number;
    /** Avatar border color */
    borderColor?: string;
    /** Style overrides */
    style?: ViewStyle;
    /** Test ID for testing */
    testID?: string;
}
export declare const AtomicAvatarGroup: React.FC<AtomicAvatarGroupProps>;
export default AtomicAvatarGroup;
