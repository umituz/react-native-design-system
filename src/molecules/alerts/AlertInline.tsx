/**
 * AlertInline Component
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AtomicText } from '../../atoms';
import { useAppDesignTokens } from '../../theme';
import { Alert } from './AlertTypes';
import { getAlertBorderColor, getAlertBackgroundColorInline } from './utils/alertUtils';

interface AlertInlineProps {
    alert: Alert;
}

export const AlertInline: React.FC<AlertInlineProps> = ({ alert }) => {
    const tokens = useAppDesignTokens();

    return (
        <View style={[
            styles.container,
            {
                borderColor: getAlertBorderColor(alert.type, tokens),
                backgroundColor: getAlertBackgroundColorInline(alert.type, tokens),
                borderRadius: tokens.borders.radius.sm,
                padding: tokens.spacing.md,
                marginVertical: tokens.spacing.sm,
            }
        ]}>
            <AtomicText type="bodyMedium" style={{ color: tokens.colors.textPrimary, fontWeight: '700' }}>
                {alert.title}
            </AtomicText>
            {alert.message && (
                <AtomicText type="bodySmall" style={{ color: tokens.colors.textSecondary, marginTop: tokens.spacing.xs }}>
                    {alert.message}
                </AtomicText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        width: '100%',
    },
});
