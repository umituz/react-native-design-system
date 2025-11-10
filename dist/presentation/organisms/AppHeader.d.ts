/**
 * AppHeader Organism - Application Header Component
 *
 * Complex header combining atoms and molecules
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ORGANISM
 * Composition: AtomicIcon + AtomicText + AtomicButton + SearchBar
 */
import React from 'react';
import { ViewStyle } from 'react-native';
import type { IconName } from '@umituz/react-native-icon';
/**
 * AppHeader component props
 *
 * leftIcon/rightIcon: Any MaterialIcons name
 * @see https://fonts.google.com/icons
 */
export interface AppHeaderProps {
    title: string;
    subtitle?: string;
    leftIcon?: IconName;
    onLeftPress?: () => void;
    rightIcon?: IconName;
    onRightPress?: () => void;
    showShadow?: boolean;
    backgroundColor?: string;
    style?: ViewStyle;
}
export declare const AppHeader: React.FC<AppHeaderProps>;
