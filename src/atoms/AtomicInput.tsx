import React from 'react';
import { View, TextInput, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useAppDesignTokens } from '../theme';
import { useInputState } from './input/hooks/useInputState';
import { getSizeConfig, getVariantStyle, getTextColor } from './input/styles/inputStylesHelper';
import { inputStyles } from './input/styles/inputStyles';
import type { AtomicInputProps } from './input/types';
import { InputLabel } from './input/components/InputLabel';
import { InputIcon } from './input/components/InputIcon';
import { InputHelper } from './input/components/InputHelper';

/**
 * AtomicInput - Pure React Native Text Input
 *
 * Features:
 * - Pure React Native implementation (no Paper dependency)
 * - Ionicons for password toggle and custom icons
 * - Outlined/filled/flat variants
 * - Error, success, disabled states
 * - Character counter
 * - Responsive sizing
 * - Full accessibility support
 */
export const AtomicInput = React.forwardRef<TextInput, AtomicInputProps>(({
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
  returnKeyType,
  onSubmitEditing,
  blurOnSubmit,
  autoFocus,
  autoCapitalize = 'sentences',
  autoCorrect = true,
  disabled = false,
  style,
  inputStyle,
  testID,
  onBlur,
  onFocus,
  multiline = false,
  numberOfLines,
  textContentType,
}, ref) => {
  const tokens = useAppDesignTokens();

  const {
    localValue,
    isFocused,
    isPasswordVisible,
    characterCount,
    setIsFocused,
    handleTextChange,
    togglePasswordVisibility,
  } = useInputState({
    value,
    onChangeText,
    secureTextEntry,
    showPasswordToggle,
    maxLength,
    showCharacterCount,
  });

  const isDisabled = state === 'disabled' || disabled;
  const hasError = state === 'error';
  const hasSuccess = state === 'success';

  const sizeConfig = getSizeConfig({ size, tokens });
  const variantStyle = getVariantStyle({
    variant,
    isFocused,
    hasError,
    hasSuccess,
    isDisabled,
    tokens,
  });
  const textColor = getTextColor({
    isDisabled,
    hasError,
    hasSuccess,
    tokens,
  });

  const iconColor = isDisabled ? tokens.colors.textDisabled : tokens.colors.textSecondary;

  const containerStyle: StyleProp<ViewStyle> = [
    inputStyles.container,
    variantStyle,
    {
      paddingTop: sizeConfig.paddingVertical,
      paddingBottom: sizeConfig.paddingVertical,
      paddingHorizontal: sizeConfig.paddingHorizontal,
      minHeight: sizeConfig.minHeight,
      justifyContent: 'center',
      opacity: isDisabled ? 0.5 : 1,
    },
    style,
  ];

  const textInputStyle: StyleProp<TextStyle> = [
    inputStyles.input,
    {
      fontSize: sizeConfig.fontSize,
      lineHeight: (sizeConfig.fontSize || 16) * 1.2,
      color: textColor,
      paddingVertical: 4,
    },
    leadingIcon ? { paddingLeft: sizeConfig.iconSize + 8 } : undefined,
    (trailingIcon || showPasswordToggle) ? { paddingRight: sizeConfig.iconSize + 8 } : undefined,
    inputStyle,
  ];

  return (
    <View testID={testID}>
      <InputLabel label={label} state={state} />

      <View style={containerStyle}>
        {leadingIcon && (
          <InputIcon
            name={leadingIcon}
            size={sizeConfig.iconSize}
            color={iconColor}
            position="leading"
          />
        )}

        <TextInput
          ref={ref}
          value={localValue}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          placeholderTextColor={tokens.colors.textSecondary}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          maxLength={maxLength}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={blurOnSubmit}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          editable={!isDisabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textContentType={textContentType}
          style={textInputStyle}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          testID={testID ? `${testID}-input` : undefined}
        />

        {(showPasswordToggle && secureTextEntry) && (
          <InputIcon
            name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
            size={sizeConfig.iconSize}
            color={iconColor}
            position="trailing"
            onPress={() => togglePasswordVisibility()}
            testID={testID ? `${testID}-toggle-password` : undefined}
          />
        )}

        {trailingIcon && !showPasswordToggle && (
          <InputIcon
            name={trailingIcon}
            size={sizeConfig.iconSize}
            color={iconColor}
            position="trailing"
            onPress={onTrailingIconPress}
            testID={testID ? `${testID}-trailing-icon` : undefined}
          />
        )}
      </View>

      <InputHelper
        helperText={helperText}
        showCharacterCount={showCharacterCount}
        characterCount={characterCount}
        maxLength={maxLength}
        state={state}
        testID={testID}
      />
    </View>
  );
});
