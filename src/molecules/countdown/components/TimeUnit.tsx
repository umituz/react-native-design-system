import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AtomicText } from '../../../atoms';
import { useAppDesignTokens } from '../../../theme';

export interface TimeUnitProps {
    value: number;
    label: string;
    size?: 'small' | 'medium' | 'large';
}

export const TimeUnit: React.FC<TimeUnitProps> = ({
    value,
    label,
    size = 'medium',
}) => {
    const tokens = useAppDesignTokens();

    const sizeConfig = {
        small: { fontSize: 24, padding: tokens.spacing.sm, minHeight: 70 },
        medium: { fontSize: 32, padding: tokens.spacing.md, minHeight: 90 },
        large: { fontSize: 40, padding: tokens.spacing.lg, minHeight: 110 },
    };

    const config = sizeConfig[size];

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: tokens.colors.surfaceSecondary,
                    borderRadius: tokens.borders.radius.lg,
                    paddingVertical: config.padding,
                    minHeight: config.minHeight,
                },
            ]}
        >
            <AtomicText
                type="displaySmall"
                color="onSurface"
                style={[styles.value, { fontSize: config.fontSize }]}
            >
                {String(value).padStart(2, '0')}
            </AtomicText>
            <AtomicText
                type="labelSmall"
                color="onSurface"
                style={styles.label}
            >
                {label}
            </AtomicText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    value: {
        fontWeight: '700',
        lineHeight: 38,
    },
    label: {
        fontWeight: '600',
        marginTop: 2,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
});
