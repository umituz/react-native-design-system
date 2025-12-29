/**
 * AtomicTextArea - Multiline Text Input Component
 *
 * Atomic Design Level: ATOM
 * Purpose: Multiline text input across all apps
 */

import React from 'react';
import { View, TextInput, StyleSheet, ViewStyle } from 'react-native';
import { useAppDesignTokens } from '../theme';
import { AtomicText } from './AtomicText';

export interface AtomicTextAreaProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  maxLength?: number;
  numberOfLines?: number;
  rows?: number;
  minHeight?: number;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export const AtomicTextArea: React.FC<AtomicTextAreaProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  helperText,
  errorText,
  maxLength,
  numberOfLines,
  rows = 4,
  minHeight,
  disabled = false,
  style,
  testID,
}) => {
  const lineCount = numberOfLines ?? rows;
  const calculatedMinHeight = minHeight ?? lineCount * 24;
  const tokens = useAppDesignTokens();
  const hasError = !!errorText;

  return (
    <View style={[styles.container, style]} testID={testID}>
      {label && (
        <AtomicText
          type="labelMedium"
          style={[styles.label, { color: tokens.colors.textSecondary }]}
        >
          {label}
        </AtomicText>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={tokens.colors.textTertiary}
        maxLength={maxLength}
        numberOfLines={lineCount}
        multiline
        editable={!disabled}
        textAlignVertical="top"
        style={[
          styles.input,
          {
            backgroundColor: tokens.colors.surface,
            borderColor: hasError ? tokens.colors.error : tokens.colors.border,
            color: tokens.colors.textPrimary,
            minHeight: calculatedMinHeight,
          },
          disabled && { opacity: 0.5 },
        ]}
      />
      {(helperText || errorText) && (
        <AtomicText
          type="bodySmall"
          style={[
            styles.helperText,
            { color: hasError ? tokens.colors.error : tokens.colors.textSecondary },
          ]}
        >
          {errorText || helperText}
        </AtomicText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  helperText: {
    marginTop: 4,
  },
});
