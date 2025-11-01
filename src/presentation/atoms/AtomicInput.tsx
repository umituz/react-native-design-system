import React, { useState } from 'react';
import { View, Pressable, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { useAppDesignTokens } from '../hooks/useAppDesignTokens';
import { AtomicIcon } from './AtomicIcon';
import type { AtomicIconName, AtomicIconSize } from './AtomicIcon';

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
 * AtomicInput - Material Design 3 Text Input
 *
 * Features:
 * - React Native Paper TextInput integration
 * - Lucide icons for password toggle and custom icons
 * - Material Design 3 outlined/filled/flat variants
 * - Error, success, disabled states
 * - Character counter
 * - Responsive sizing
 * - Full accessibility support
 */
export const AtomicInput: React.FC<AtomicInputProps> = ({
  variant = 'outlined',
  state = 'default',
  size = 'md',
  label,
  value = '',
  onChangeText,
  placeholder,
  helperText,
  leadingIcon,
  trailingIcon,
  onTrailingIconPress,
  showPasswordToggle = false,
  secureTextEntry = false,
  maxLength,
  showCharacterCount = false,
  keyboardType = 'default',
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isDisabled = state === 'disabled' || disabled;
  const characterCount = value?.toString().length || 0;

  // Map variant to Paper mode
  const getPaperMode = (): 'outlined' | 'flat' => {
    if (variant === 'outlined') return 'outlined';
    return 'flat'; // filled and flat both use 'flat' mode
  };

  // Map state to Paper error prop
  const hasError = state === 'error';

  // Get icon size based on input size
  const getIconSize = (): AtomicIconSize => {
    switch (size) {
      case 'sm': return 'xs';
      case 'lg': return 'md';
      default: return 'sm';
    }
  };

  const iconSizeName = getIconSize();
  const iconColor = isDisabled
    ? tokens.colors.onSurfaceDisabled
    : tokens.colors.surfaceVariant;

  // Render leading icon
  const renderLeadingIcon = leadingIcon ? () => (
    <AtomicIcon
      name={leadingIcon}
      size={iconSizeName}
      customColor={iconColor}
    />
  ) : undefined;

  // Render trailing icon or password toggle
  const renderTrailingIcon = () => {
    if (showPasswordToggle && secureTextEntry) {
      return (
        <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <AtomicIcon
            name={isPasswordVisible ? "EyeOff" : "Eye"}
            size={iconSizeName}
            customColor={iconColor}
          />
        </Pressable>
      );
    }

    if (trailingIcon) {
      const icon = (
        <AtomicIcon
          name={trailingIcon}
          size={iconSizeName}
          customColor={iconColor}
        />
      );

      return onTrailingIconPress ? (
        <Pressable onPress={onTrailingIconPress}>{icon}</Pressable>
      ) : icon;
    }

    return undefined;
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
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        maxLength={maxLength}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        left={renderLeadingIcon ? <TextInput.Icon icon={renderLeadingIcon} /> : undefined}
        right={renderTrailingIcon() ? <TextInput.Icon icon={renderTrailingIcon} /> : undefined}
        style={inputStyle}
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

export type { AtomicInputProps as InputProps };
