import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AtomicText, AtomicIcon, useIconName } from '../../../atoms';
import { useAppDesignTokens } from '../../../theme';
import type { IconName } from '../../../atoms';

export interface CountdownHeaderProps {
    title: string;
    icon?: IconName;
    iconColor?: string;
    showToggle?: boolean;
    onToggle?: () => void;
}

export const CountdownHeader: React.FC<CountdownHeaderProps> = ({
    title,
    icon,
    iconColor = 'primary',
    showToggle = false,
    onToggle,
}) => {
    const tokens = useAppDesignTokens();
    const swapIcon = useIconName('swap');

    return (
        <View style={[styles.container, { marginBottom: tokens.spacing.md }]}>
            <View style={[styles.titleRow, { gap: tokens.spacing.sm }]}>
                {icon && (
                    <AtomicIcon
                        name={icon}
                        size="sm"
                        customColor={iconColor}
                    />
                )}
                <AtomicText
                    type="titleMedium"
                    color="onSurface"
                    style={styles.title}
                >
                    {title}
                </AtomicText>
            </View>

            {showToggle && onToggle && (
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        {
                            backgroundColor: tokens.colors.surfaceSecondary,
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                        },
                    ]}
                    onPress={onToggle}
                >
                    <AtomicIcon
                        name={swapIcon}
                        size="sm"
                        color="onSurface"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontWeight: '700',
    },
    toggleButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
