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
import { View } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-theme';
import { AtomicText } from '../atoms/AtomicText';
import { AtomicInput } from '../atoms/AtomicInput';
// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================
export const FormField = ({ label, error, helperText, required = false, containerStyle, style, // Accept both style and containerStyle
...inputProps }) => {
    const tokens = useAppDesignTokens();
    const inputState = error ? 'error' : 'default';
    const styles = getStyles(tokens);
    return (<View style={[styles.container, containerStyle || style]}>
      {/* Label */}
      {label && (<View style={styles.labelContainer}>
          <AtomicText type="labelMedium" color="primary" style={styles.label}>
            {label}
          </AtomicText>
          {required && (<AtomicText type="labelMedium" color="error">
              {' *'}
            </AtomicText>)}
        </View>)}

      {/* Input Field */}
      <AtomicInput {...inputProps} label={label || ''} state={inputState}/>

      {/* Error Message */}
      {error && (<AtomicText type="bodySmall" color="error" style={styles.errorText}>
          {error}
        </AtomicText>)}

      {/* Helper Text */}
      {!error && helperText && (<AtomicText type="bodySmall" color="secondary" style={styles.helperText}>
          {helperText}
        </AtomicText>)}
    </View>);
};
// =============================================================================
// STYLES
// =============================================================================
const getStyles = (tokens) => ({
    container: {
        marginBottom: tokens.spacing.md,
    },
    labelContainer: {
        flexDirection: 'row',
        marginBottom: tokens.spacing.sm,
    },
    label: {
        fontWeight: tokens.typography.labelMedium.fontWeight,
        color: tokens.colors.textPrimary,
    },
    inputError: {
        borderColor: tokens.colors.error,
    },
    errorText: {
        marginTop: tokens.spacing.xs,
    },
    helperText: {
        marginTop: tokens.spacing.xs,
    },
});
// =============================================================================
// EXPORTS
// =============================================================================
