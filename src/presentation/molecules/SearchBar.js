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
import { View } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-theme';
import { AtomicInput } from '../atoms/AtomicInput';
// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================
export const SearchBar = ({ value, onChangeText, onClear, placeholder = 'Search...', containerStyle, ...inputProps }) => {
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
    return (<View style={[styles.container, containerStyle]}>
      <AtomicInput {...inputProps} value={value} onChangeText={onChangeText} placeholder={placeholder} variant="filled" style={styles.input} leadingIcon="Search" trailingIcon={value && value.length > 0 ? "X" : undefined} onTrailingIconPress={value && value.length > 0 ? handleClear : undefined}/>
    </View>);
};
// =============================================================================
// STYLES
// =============================================================================
const getStyles = (tokens) => ({
    container: {
        width: '100%',
        marginVertical: tokens.spacing.sm,
    },
    input: {
        backgroundColor: tokens.colors.surfaceVariant,
    },
});
// =============================================================================
// EXPORTS
// =============================================================================
