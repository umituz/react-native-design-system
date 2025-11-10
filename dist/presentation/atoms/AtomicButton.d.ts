import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { IconName } from '@umituz/react-native-icon';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export interface AtomicButtonProps {
    title?: string;
    children?: React.ReactNode;
    onPress: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    icon?: IconName;
    fullWidth?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    testID?: string;
}
export declare const AtomicButton: React.FC<AtomicButtonProps>;
export type { AtomicButtonProps as ButtonProps };
