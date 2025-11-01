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
import { View, ViewStyle } from 'react-native';
import { useAppDesignTokens } from '../hooks/useAppDesignTokens';
import { AtomicText } from '../atoms/AtomicText';
import { AtomicInput, AtomicInputProps } from '../atoms/AtomicInput';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface FormFieldProps extends Omit<AtomicInputProps, 'state' | 'label'> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  containerStyle?: ViewStyle;
  style?: ViewStyle; // Alias for containerStyle (for convenience)
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helperText,
  required = false,
  containerStyle,
  style, // Accept both style and containerStyle
  ...inputProps
}) => {
  const tokens = useAppDesignTokens();
  const inputState = error ? 'error' : 'default';

  const styles = getStyles(tokens);

  return (
    <View style={[styles.container, containerStyle || style]}>
      {/* Label */}
      {label && (
        <View style={styles.labelContainer}>
          <AtomicText type="labelMedium" color="primary" style={styles.label}>
            {label}
          </AtomicText>
          {required && (
            <AtomicText type="labelMedium" color="error">
              {' *'}
            </AtomicText>
          )}
        </View>
      )}

      {/* Input Field */}
      <AtomicInput
        {...inputProps}
        label={label || ''}
        state={inputState}
      />

      {/* Error Message */}
      {error && (
        <AtomicText
          type="bodySmall"
         
          color="error"
          style={styles.errorText}
        >
          {error}
        </AtomicText>
      )}

      {/* Helper Text */}
      {!error && helperText && (
        <AtomicText
          type="bodySmall"
         
          color="secondary"
          style={styles.helperText}
        >
          {helperText}
        </AtomicText>
      )}
    </View>
  );
};

// =============================================================================
// STYLES
// =============================================================================

const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) => ({
  container: {
    marginBottom: tokens.spacing.md,
  } as ViewStyle,
  labelContainer: {
    flexDirection: 'row',
    marginBottom: tokens.spacing.sm,
  } as ViewStyle,
  label: {
    fontWeight: tokens.typography.labelMedium.fontWeight,
    color: tokens.colors.textPrimary,
  } as ViewStyle,
  inputError: {
    borderColor: tokens.colors.error,
  } as ViewStyle,
  errorText: {
    marginTop: tokens.spacing.xs,
  } as ViewStyle,
  helperText: {
    marginTop: tokens.spacing.xs,
  } as ViewStyle,
});

// =============================================================================
// EXPORTS
// =============================================================================

