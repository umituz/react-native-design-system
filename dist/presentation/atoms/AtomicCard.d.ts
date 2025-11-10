import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export type AtomicCardVariant = 'flat' | 'elevated' | 'outlined';
export type AtomicCardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export interface AtomicCardProps {
    variant?: AtomicCardVariant;
    padding?: AtomicCardPadding;
    onPress?: () => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
    testID?: string;
}
export declare const AtomicCard: React.FC<AtomicCardProps>;
