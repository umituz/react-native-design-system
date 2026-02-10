/**
 * AlertBanner Component
 *
 * Displays a banner-style alert at the top or bottom of the screen.
 * Full-width notification bar for important messages.
 * Auto-dismisses after duration (default 3 seconds).
 */

import React, { useEffect, useCallback } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from '../../safe-area';
import { AtomicText, AtomicIcon, useIconName } from '../../atoms';
import { useAppDesignTokens } from '../../theme';
import { Alert, AlertPosition } from './AlertTypes';
import { useAlertStore } from './AlertStore';
import { getAlertBackgroundColor, getAlertTextColor, DEFAULT_ALERT_DURATION } from './utils/alertUtils';

interface AlertBannerProps {
    alert: Alert;
}

export function AlertBanner({ alert }: AlertBannerProps) {
    const dismissAlert = useAlertStore((state: { dismissAlert: (id: string) => void }) => state.dismissAlert);
    const insets = useSafeAreaInsets();
    const tokens = useAppDesignTokens();
    const closeIcon = useIconName('close');

    const handleDismiss = useCallback(() => {
        dismissAlert(alert.id);
        alert.onDismiss?.();
    }, [alert.id, dismissAlert, alert.onDismiss]);

    // Auto-dismiss after duration
    useEffect(() => {
        const duration = alert.duration ?? DEFAULT_ALERT_DURATION;
        if (duration <= 0) return;

        const timer = setTimeout(handleDismiss, duration);
        return () => clearTimeout(timer);
    }, [alert.duration, handleDismiss]);

    const backgroundColor = getAlertBackgroundColor(alert.type, tokens);
    const textColor = getAlertTextColor(tokens);
    const isTop = alert.position === AlertPosition.TOP;

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor,
                    paddingTop: isTop ? insets.top + tokens.spacing.sm : tokens.spacing.sm,
                    paddingBottom: isTop ? tokens.spacing.sm : insets.bottom + tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                },
            ]}
            testID={alert.testID}
        >
            <View style={styles.content}>
                <View style={styles.row}>
                    {alert.icon && (
                        <AtomicIcon
                            name={alert.icon}
                            customSize={20}
                            customColor={textColor}
                            style={{ marginRight: tokens.spacing.sm }}
                        />
                    )}

                    <View style={styles.textContainer}>
                        <AtomicText
                            type="bodyMedium"
                            style={[styles.title, { color: textColor }]}
                            numberOfLines={1}
                        >
                            {alert.title}
                        </AtomicText>

                        {alert.message && (
                            <AtomicText
                                type="bodySmall"
                                style={[
                                    styles.message,
                                    { color: textColor, marginTop: tokens.spacing.xs },
                                ]}
                                numberOfLines={2}
                            >
                                {alert.message}
                            </AtomicText>
                        )}
                    </View>

                    {alert.dismissible && (
                        <Pressable
                            onPress={handleDismiss}
                            style={[styles.closeButton, { marginLeft: tokens.spacing.sm }]}
                            hitSlop={8}
                        >
                            <AtomicIcon name={closeIcon} customSize={20} customColor={textColor} />
                        </Pressable>
                    )}
                </View>

                {alert.actions && alert.actions.length > 0 && (
                    <View style={[styles.actionsContainer, { marginTop: tokens.spacing.sm }]}>
                        {alert.actions.map((action) => (
                            <Pressable
                                key={action.id}
                                onPress={async () => {
                                    await action.onPress();
                                    if (action.closeOnPress ?? true) {
                                        handleDismiss();
                                    }
                                }}
                                style={[
                                    styles.actionButton,
                                    {
                                        paddingVertical: tokens.spacing.xs,
                                        paddingHorizontal: tokens.spacing.sm,
                                        marginRight: tokens.spacing.xs,
                                    },
                                ]}
                            >
                                <AtomicText
                                    type="bodySmall"
                                    style={[
                                        styles.actionText,
                                        { color: textColor },
                                    ]}
                                >
                                    {action.label}
                                </AtomicText>
                            </Pressable>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    content: {
        paddingVertical: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontWeight: '700',
    },
    message: {
        opacity: 0.9,
    },
    closeButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    actionButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionText: {
        fontWeight: '700',
        textDecorationLine: 'underline',
    },
});
