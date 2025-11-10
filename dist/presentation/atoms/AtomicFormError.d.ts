/**
 * AtomicFormError - Universal Form Error Component
 *
 * Provides consistent error message display for forms
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ATOM
 * Purpose: Display validation error messages
 *
 * Usage:
 * - Form field validation errors
 * - Global form error messages
 * - API error display
 * - Input validation feedback
 */
import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
export interface AtomicFormErrorProps {
    /** Error message to display */
    message: string | null | undefined;
    /** Error display variant */
    variant?: 'global' | 'field';
    /** Custom container style */
    style?: StyleProp<ViewStyle>;
    /** Custom text style */
    textStyle?: StyleProp<TextStyle>;
}
export declare const AtomicFormError: React.FC<AtomicFormErrorProps>;
export default AtomicFormError;
