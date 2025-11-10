import React from 'react';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
export interface AtomicSearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    autoFocus?: boolean;
    editable?: boolean;
    onClear?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onSubmitEditing?: () => void;
    style?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    accessibilityLabel?: string;
    accessibilityHint?: string;
}
export declare const AtomicSearchBar: React.FC<AtomicSearchBarProps>;
