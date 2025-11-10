import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-theme';
import { AtomicIcon } from './AtomicIcon';
export const AtomicSearchBar = ({ value, onChangeText, placeholder = 'Search...', autoFocus = false, editable = true, onClear, onFocus, onBlur, onSubmitEditing, style, inputStyle, accessibilityLabel = 'Search input', accessibilityHint, }) => {
    const tokens = useAppDesignTokens();
    const handleClear = () => {
        onChangeText('');
        onClear?.();
    };
    return (<View style={[
            {
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: tokens.colors.surfaceSecondary,
                borderRadius: tokens.borders.radius.lg,
                borderWidth: 1,
                borderColor: tokens.colors.border,
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                gap: tokens.spacing.sm,
                minHeight: 48,
            },
            style,
        ]} accessibilityRole="search">
      <AtomicIcon name="Search" size="sm" color="secondary"/>

      <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={tokens.colors.textSecondary} autoFocus={autoFocus} editable={editable} onFocus={onFocus} onBlur={onBlur} onSubmitEditing={onSubmitEditing} style={[
            {
                flex: 1,
                ...tokens.typography.bodyMedium,
                color: tokens.colors.textPrimary,
                padding: 0,
                margin: 0,
            },
            inputStyle,
        ]} accessibilityLabel={accessibilityLabel} accessibilityHint={accessibilityHint} returnKeyType="search" underlineColorAndroid="transparent"/>

      {value.length > 0 && (<TouchableOpacity onPress={handleClear} style={{
                padding: tokens.spacing.xs,
            }} accessibilityLabel="Clear search" accessibilityRole="button">
          <AtomicIcon name="X" size="sm" color="secondary"/>
        </TouchableOpacity>)}
    </View>);
};
