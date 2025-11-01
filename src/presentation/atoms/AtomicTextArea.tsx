/**
 * AtomicTextArea Component
 *
 * A multiline text input component with Material Design 3 integration
 * for longer text entry with consistent styling.
 *
 * Features:
 * - React Native Paper TextInput with multiline
 * - Material Design 3 outlined/filled/flat variants
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
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { useAppDesignTokens } from '../hooks/useAppDesignTokens';

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
 * AtomicTextArea - Material Design 3 Multiline Text Input
 */
export const AtomicTextArea: React.FC<AtomicTextAreaProps> = ({
  variant = 'outlined',
  state = 'default',
  size = 'md',
  label,
  value = '',
  onChangeText,
  placeholder,
  helperText,
  maxLength,
  showCharacterCount = false,
  rows = 4,
  minHeight,
  autoCapitalize = 'sentences',
  autoCorrect = true,
  disabled = false,
  style,
  inputStyle,
  testID,
  onBlur,
  onFocus,
}) => {
  const tokens = useAppDesignTokens();
  const isDisabled = state === 'disabled' || disabled;
  const characterCount = value?.toString().length || 0;

  // Map variant to Paper mode
  const getPaperMode = (): 'outlined' | 'flat' => {
    if (variant === 'outlined') return 'outlined';
    return 'flat'; // filled and flat both use 'flat' mode
  };

  // Map state to Paper error prop
  const hasError = state === 'error';

  // Calculate height based on rows
  const getTextAreaHeight = () => {
    if (minHeight) return minHeight;

    // Base line height: 24px per row (approximate)
    const lineHeight = 24;
    const padding = 32; // Top and bottom padding
    return (rows * lineHeight) + padding;
  };

  // Get text color based on state
  const getTextColor = () => {
    if (state === 'error') return tokens.colors.error;
    if (state === 'success') return tokens.colors.success;
    return tokens.colors.onSurface;
  };

  return (
    <View style={style} testID={testID}>
      <TextInput
        mode={getPaperMode()}
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        error={hasError}
        disabled={isDisabled}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        multiline={true}
        numberOfLines={rows}
        style={[
          { height: getTextAreaHeight(), textAlignVertical: 'top' },
          inputStyle,
        ]}
        textColor={getTextColor()}
        onBlur={onBlur}
        onFocus={onFocus}
        testID={testID ? `${testID}-input` : undefined}
      />

      {(helperText || showCharacterCount) && (
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: tokens.spacing.xs,
        }}>
          {helperText && (
            <HelperText
              type={hasError ? 'error' : 'info'}
              visible={Boolean(helperText)}
              style={{ flex: 1 }}
              testID={testID ? `${testID}-helper` : undefined}
            >
              {helperText}
            </HelperText>
          )}
          {showCharacterCount && maxLength && (
            <HelperText
              type="info"
              visible={true}
              style={{ marginLeft: tokens.spacing.xs }}
              testID={testID ? `${testID}-count` : undefined}
            >
              {characterCount}/{maxLength}
            </HelperText>
          )}
        </View>
      )}
    </View>
  );
};

export type { AtomicTextAreaProps as TextAreaProps };
