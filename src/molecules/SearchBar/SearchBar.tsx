import React, { forwardRef } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { useAppDesignTokens } from '../../theme';
import { AtomicIcon } from '../../atoms/AtomicIcon';
import type { SearchBarProps } from './types';

export const SearchBar = forwardRef<React.ComponentRef<typeof TextInput>, SearchBarProps>(({
    value,
    onChangeText,
    onSubmit,
    onClear,
    onFocus,
    onBlur,
    placeholder = 'Search...',
    autoFocus = false,
    loading = false,
    disabled = false,
    containerStyle,
    inputStyle,
    testID,
}, ref) => {
    const tokens = useAppDesignTokens();

    const handleClear = () => {
        onChangeText('');
        onClear?.();
    };

    const showClear = value.length > 0 && !loading;

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: tokens.colors.surfaceVariant,
                    borderColor: tokens.colors.border,
                },
                containerStyle,
            ]}
            testID={testID}
        >
            <View style={styles.iconContainer}>
                <AtomicIcon
                    name="search"
                    size="md"
                    customColor={tokens.colors.textSecondary}
                />
            </View>

            <TextInput
                ref={ref}
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={placeholder}
                placeholderTextColor={tokens.colors.textSecondary}
                autoFocus={autoFocus}
                editable={!disabled}
                returnKeyType="search"
                autoCapitalize="none"
                autoCorrect={false}
                style={[
                    styles.input,
                    {
                        color: tokens.colors.textPrimary,
                        fontSize: 16, // Body medium usually
                    },
                    inputStyle,
                ]}
            />

            {(loading || showClear) && (
                <View style={styles.rightActions}>
                    {loading && (
                        <ActivityIndicator
                            size="small"
                            color={tokens.colors.primary}
                            style={styles.loader}
                        />
                    )}

                    {showClear && (
                        <TouchableOpacity
                            onPress={handleClear}
                            style={styles.clearButton}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            accessibilityRole="button"
                            accessibilityLabel="Clear search"
                        >
                            <AtomicIcon
                                name="close-circle"
                                size="md"
                                customColor={tokens.colors.textSecondary}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
});

SearchBar.displayName = 'SearchBar';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        height: 48,
        borderRadius: 24, // Pill shape
        borderWidth: 1,
    },
    iconContainer: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: '100%',
        paddingVertical: 0, // Reset default padding
    },
    rightActions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    loader: {
        marginRight: 8,
    },
    clearButton: {
        padding: 2,
    },
});
