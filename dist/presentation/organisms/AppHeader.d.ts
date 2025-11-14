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
export interface AppHeaderProps {
    title: string;
    subtitle?: string;
    leftIcon?: string;
    onLeftPress?: () => void;
    rightIcon?: string;
    onRightPress?: () => void;
    showShadow?: boolean;
    backgroundColor?: string;
    style?: ViewStyle;
}
export declare const AppHeader: React.FC<AppHeaderProps>;
//# sourceMappingURL=AppHeader.d.ts.map