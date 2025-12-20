/**
 * AtomicCard Component
 * 
 * A simple, styled card container component
 */

import React from 'react';
import { View, StyleSheet, type ViewStyle, type StyleProp } from 'react-native';
import { useAppDesignTokens } from '../theme';

export type AtomicCardVariant = 'elevated' | 'outlined' | 'filled';
export type AtomicCardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface AtomicCardProps {
    children: React.ReactNode;
    variant?: AtomicCardVariant;
    padding?: AtomicCardPadding;
    style?: StyleProp<ViewStyle>;
    testID?: string;
}

export const AtomicCard: React.FC<AtomicCardProps> = ({
    children,
    variant = 'elevated',
    padding = 'md',
    style,
    testID,
}) => {
    const tokens = useAppDesignTokens();

    const paddingValues: Record<AtomicCardPadding, number> = {
        none: 0,
        sm: tokens.spacing.sm,
        md: tokens.spacing.md,
        lg: tokens.spacing.lg,
    };

    const getVariantStyle = (): ViewStyle => {
        switch (variant) {
            case 'elevated':
                return {
                    backgroundColor: tokens.colors.surface,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2,
                };
            case 'outlined':
                return {
                    backgroundColor: tokens.colors.surface,
                    borderWidth: 1,
                    borderColor: tokens.colors.outline,
                };
            case 'filled':
                return {
                    backgroundColor: tokens.colors.surfaceVariant,
                };
            default:
                return {};
        }
    };

    return (
        <View
            style={[
                styles.card,
                { borderRadius: tokens.borders.radius.md },
                { padding: paddingValues[padding] },
                getVariantStyle(),
                style,
            ]}
            testID={testID}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        overflow: 'hidden',
    },
});
