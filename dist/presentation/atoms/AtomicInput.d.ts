import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { AtomicIconName } from './AtomicIcon';
export type AtomicInputVariant = 'outlined' | 'filled' | 'flat';
export type AtomicInputState = 'default' | 'error' | 'success' | 'disabled';
export type AtomicInputSize = 'sm' | 'md' | 'lg';
export interface AtomicInputProps {
    /** Input label */
    label?: string;
    /** Current input value */
    value?: string;
    /** Value change callback */
    onChangeText?: (text: string) => void;
    /** Input variant (outlined, filled, flat) */
    variant?: AtomicInputVariant;
    /** Input state (default, error, success, disabled) */
    state?: AtomicInputState;
    /** Input size (sm, md, lg) */
    size?: AtomicInputSize;
    /** Placeholder text */
    placeholder?: string;
    /** Helper text below input */
    helperText?: string;
    /** Leading icon (Lucide icon name) */
    leadingIcon?: AtomicIconName;
    /** Trailing icon (Lucide icon name) */
    trailingIcon?: AtomicIconName;
    /** Callback when trailing icon is pressed */
    onTrailingIconPress?: () => void;
    /** Show password toggle for secure inputs */
    showPasswordToggle?: boolean;
    /** Secure text entry (password field) */
    secureTextEntry?: boolean;
    /** Maximum character length */
    maxLength?: number;
    /** Show character counter */
    showCharacterCount?: boolean;
    /** Keyboard type */
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url' | 'number-pad' | 'decimal-pad';
    /** Auto-capitalize */
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    /** Auto-correct */
    autoCorrect?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Container style */
    style?: StyleProp<ViewStyle>;
    /** Input text style */
    inputStyle?: StyleProp<TextStyle>;
    /** Test ID for E2E testing */
    testID?: string;
    /** Blur callback */
    onBlur?: () => void;
    /** Focus callback */
    onFocus?: () => void;
}
/**
 * AtomicInput - Pure React Native Text Input
 *
 * Features:
 * - Pure React Native implementation (no Paper dependency)
 * - Lucide icons for password toggle and custom icons
 * - Outlined/filled/flat variants
 * - Error, success, disabled states
 * - Character counter
 * - Responsive sizing
 * - Full accessibility support
 */
export declare const AtomicInput: React.FC<AtomicInputProps>;
export type { AtomicInputProps as InputProps };
