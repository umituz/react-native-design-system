/**
 * SearchBar Molecule - Search Input with Icon and Clear Button
 *
 * Combines AtomicInput + AtomicIcon + AtomicButton
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: MOLECULE
 * Composition: AtomicInput + AtomicIcon + TouchableOpacity
 */

import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-theme';
import { AtomicInput, AtomicInputProps } from '../atoms/AtomicInput';
import { AtomicIcon } from '../atoms/AtomicIcon';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface SearchBarProps extends Omit<AtomicInputProps, 'leftIcon' | 'rightIcon'> {
  onClear?: () => void;
  containerStyle?: ViewStyle;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search...',
  containerStyle,
  ...inputProps
}) => {
  const tokens = useAppDesignTokens();

  const handleClear = () => {
    if (onChangeText) {
      onChangeText('');
    }
    if (onClear) {
      onClear();
    }
  };

  const styles = getStyles(tokens);

  return (
    <View style={[styles.container, containerStyle]}>
      <AtomicInput
        {...inputProps}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        variant="filled"
        style={styles.input}
        leadingIcon="Search"
        trailingIcon={value && value.length > 0 ? "X" : undefined}
        onTrailingIconPress={value && value.length > 0 ? handleClear : undefined}
      />
    </View>
  );
};

// =============================================================================
// STYLES
// =============================================================================

const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) => ({
  container: {
    width: '100%',
    marginVertical: tokens.spacing.sm,
  } as ViewStyle,
  input: {
    backgroundColor: tokens.colors.surfaceVariant,
  } as ViewStyle,
});

// =============================================================================
// EXPORTS
// =============================================================================

