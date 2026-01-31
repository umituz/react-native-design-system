import React from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useAppDesignTokens } from '../../theme';
import { AtomicIcon, useIconName } from '../../atoms';
import { AtomicSpinner } from '../../atoms/AtomicSpinner';
import type { SearchBarProps } from './types';

export const SearchBar: React.FC<SearchBarProps> = ({
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
}) => {
    const tokens = useAppDesignTokens();
    const searchIcon = useIconName('search');
    const closeCircleIcon = useIconName('closeCircle');

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
                    height: 48 * tokens.spacingMultiplier,
                    paddingHorizontal: 12 * tokens.spacingMultiplier,
                    borderRadius: 24 * tokens.spacingMultiplier,
                },
                containerStyle,
            ]}
            testID={testID}
        >
            <View style={styles.iconContainer}>
                <AtomicIcon
                    name={searchIcon}
                    size="md"
                    customColor={tokens.colors.textSecondary}
                />
            </View>

            <TextInput
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
                        fontSize: tokens.typography.bodyMedium.responsiveFontSize,
                    },
                    inputStyle,
                ]}
            />

            {(loading || showClear) && (
                <View style={styles.rightActions}>
                    {loading && (
                        <AtomicSpinner
                            size="sm"
                            color="primary"
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
                                name={closeCircleIcon}
                                size="md"
                                customColor={tokens.colors.textSecondary}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12, // Will be scaled by parent if needed, or we rely on token usage elsewhere
        height: 48, // Should be dynamic ideally, but keeping simple for now
        borderRadius: 24,
        borderWidth: 1,
    },
    iconContainer: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: '100%',
        paddingVertical: 0,
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
