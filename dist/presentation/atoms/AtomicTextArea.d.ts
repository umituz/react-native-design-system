/**
 * AtomicTextArea Component
 *
 * A multiline text input component with pure React Native implementation
 * for longer text entry with consistent styling.
 *
 * Features:
 * - Pure React Native TextInput with multiline
 * - Outlined/filled/flat variants
 * - Error, success, disabled states
 * - Character counter with max length
 * - Helper text for guidance or errors
 * - Configurable rows for height
 * - Theme-aware styling
 * - Full accessibility support
 *
 * Usage:
 * ```tsx
 * const [description, setDescription] = useState('');
 *
 * <AtomicTextArea
 *   value={description}
 *   onChangeText={setDescription}
 *   label="Description"
 *   placeholder="Enter description..."
 *   maxLength={500}
 *   showCharacterCount
 *   rows={6}
 *   helperText="Provide a detailed description"
 * />
 * ```
 */
import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
export type AtomicTextAreaVariant = 'outlined' | 'filled' | 'flat';
export type AtomicTextAreaState = 'default' | 'error' | 'success' | 'disabled';
export type AtomicTextAreaSize = 'sm' | 'md' | 'lg';
export interface AtomicTextAreaProps {
    /** Textarea label */
    label?: string;
    /** Current textarea value */
    value?: string;
    /** Value change callback */
    onChangeText?: (text: string) => void;
    /** Textarea variant (outlined, filled, flat) */
    variant?: AtomicTextAreaVariant;
    /** Textarea state (default, error, success, disabled) */
    state?: AtomicTextAreaState;
    /** Textarea size (sm, md, lg) */
    size?: AtomicTextAreaSize;
    /** Placeholder text */
    placeholder?: string;
    /** Helper text below textarea */
    helperText?: string;
    /** Maximum character length */
    maxLength?: number;
    /** Show character counter */
    showCharacterCount?: boolean;
    /** Number of visible text rows */
    rows?: number;
    /** Minimum height in pixels */
    minHeight?: number;
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
 * AtomicTextArea - Pure React Native Multiline Text Input
 */
export declare const AtomicTextArea: React.FC<AtomicTextAreaProps>;
export type { AtomicTextAreaProps as TextAreaProps };
