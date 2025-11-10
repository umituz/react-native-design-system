import React from 'react';
import { View, Pressable } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-theme';
export const AtomicCard = ({ variant = 'elevated', padding = 'md', onPress, disabled = false, style, children, testID, }) => {
    const tokens = useAppDesignTokens();
    const handlePress = () => {
        if (onPress && !disabled) {
            onPress();
        }
    };
    // Map padding to token values
    const getPaddingValue = () => {
        const paddingMap = {
            none: 0,
            sm: tokens.spacing.sm,
            md: tokens.spacing.md,
            lg: tokens.spacing.lg,
            xl: tokens.spacing.xl,
        };
        return paddingMap[padding];
    };
    // Get variant styles
    const getVariantStyle = () => {
        const baseStyle = {
            backgroundColor: tokens.colors.surface,
            borderRadius: tokens.borders.radius.md,
        };
        switch (variant) {
            case 'elevated':
                return {
                    ...baseStyle,
                    borderWidth: 1,
                    borderColor: tokens.colors.border,
                };
            case 'outlined':
                return {
                    ...baseStyle,
                    borderWidth: 1,
                    borderColor: tokens.colors.border,
                };
            case 'flat':
                return {
                    ...baseStyle,
                    borderWidth: 0,
                };
            default:
                return baseStyle;
        }
    };
    const cardStyle = [
        getVariantStyle(),
        {
            padding: getPaddingValue(),
            opacity: disabled ? 0.5 : 1,
        },
        style,
    ];
    const cardContent = (<View style={cardStyle} testID={testID}>
      {children}
    </View>);
    // If onPress provided, wrap with pressable
    if (onPress && !disabled) {
        return (<Pressable onPress={handlePress}>
        {cardContent}
      </Pressable>);
    }
    // Otherwise just return static card
    return cardContent;
};
