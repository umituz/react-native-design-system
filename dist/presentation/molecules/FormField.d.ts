/**
 * FormField Molecule - Complete Form Input with Label and Error
 *
 * Combines AtomicText (label/error) + AtomicInput (field)
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: MOLECULE
 * Composition: AtomicText + AtomicInput
 */
import React from 'react';
import { ViewStyle } from 'react-native';
import { AtomicInputProps } from '../atoms/AtomicInput';
export interface FormFieldProps extends Omit<AtomicInputProps, 'state' | 'label'> {
    label?: string;
    error?: string;
    helperText?: string;
    required?: boolean;
    containerStyle?: ViewStyle;
    style?: ViewStyle;
}
export declare const FormField: React.FC<FormFieldProps>;
