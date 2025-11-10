/**
 * SearchBar Molecule - Search Input with Icon and Clear Button
 *
 * Combines AtomicInput + AtomicIcon + AtomicButton
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: MOLECULE
 * Composition: AtomicInput + AtomicIcon + TouchableOpacity
 */
import React from 'react';
import { ViewStyle } from 'react-native';
import { AtomicInputProps } from '../atoms/AtomicInput';
export interface SearchBarProps extends Omit<AtomicInputProps, 'leftIcon' | 'rightIcon'> {
    onClear?: () => void;
    containerStyle?: ViewStyle;
}
export declare const SearchBar: React.FC<SearchBarProps>;
