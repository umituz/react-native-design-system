/**
 * AlertModal Component
 */

import React from 'react';
import { StyleSheet, View, Modal, Pressable } from 'react-native';
import { AtomicButton, AtomicText, AtomicIcon } from '../../atoms';
import { useAppDesignTokens } from '../../theme';
import { Alert, AlertType } from './AlertTypes';
import { getAlertBackgroundColor } from './utils/alertUtils';
import { useAlertDismissHandler } from './hooks';

interface AlertModalProps {
    alert: Alert;
}

const getAlertIconName = (type: AlertType): string => {
    switch (type) {
        case AlertType.SUCCESS: return 'checkmark-circle';
        case AlertType.ERROR: return 'alertCircle';
        case AlertType.WARNING: return 'alertCircle';
        case AlertType.INFO: return 'info';
        default: return 'info';
    }
};

export const AlertModal: React.FC<AlertModalProps> = ({ alert }) => {
    const tokens = useAppDesignTokens();
    const handleClose = useAlertDismissHandler(alert);

    const accentColor = getAlertBackgroundColor(alert.type, tokens);
    const iconName = getAlertIconName(alert.type);
    const hasTwoActions = alert.actions.length === 2;

    return (
        <Modal
            visible
            transparent
            animationType="none"
            onRequestClose={handleClose}
        >
            <View style={styles.overlay}>
                <Pressable
                    style={styles.backdrop}
                    onPress={alert.dismissible ? handleClose : undefined}
                />
                <View style={[
                    styles.modal,
                    {
                        backgroundColor: tokens.colors.backgroundPrimary,
                        borderRadius: tokens.borders.radius.xl ?? 20,
                        borderWidth: 1,
                        borderColor: tokens.colors.border,
                    }
                ]}>
                    {/* Icon circle */}
                    <View style={[
                        styles.iconCircle,
                        { backgroundColor: accentColor + '22' }
                    ]}>
                        <AtomicIcon
                            name={iconName}
                            customSize={36}
                            customColor={accentColor}
                        />
                    </View>

                    {/* Title */}
                    <AtomicText
                        type="titleLarge"
                        style={[styles.title, { color: tokens.colors.textPrimary }]}
                    >
                        {alert.title}
                    </AtomicText>

                    {/* Message */}
                    {!!alert.message && (
                        <AtomicText
                            type="bodyMedium"
                            style={[styles.message, { color: tokens.colors.textSecondary }]}
                        >
                            {alert.message}
                        </AtomicText>
                    )}

                    {/* Actions */}
                    <View style={[
                        hasTwoActions ? styles.actionsRow : styles.actionsColumn,
                        { marginTop: tokens.spacing.lg, gap: tokens.spacing.sm }
                    ]}>
                        {alert.actions.length === 0 ? (
                            <AtomicButton
                                title="Close"
                                onPress={handleClose}
                                fullWidth
                            />
                        ) : (
                            alert.actions.map((action, index) => (
                                <AtomicButton
                                    key={action.id ?? String(index)}
                                    title={action.label}
                                    variant={
                                        action.style === 'destructive' ? 'danger'
                                        : action.style === 'secondary' ? 'outline'
                                        : 'primary'
                                    }
                                    onPress={async () => {
                                        await action.onPress();
                                        if (action.closeOnPress ?? true) {
                                            handleClose();
                                        }
                                    }}
                                    fullWidth={!hasTwoActions}
                                    style={hasTwoActions ? styles.actionButtonHalf : undefined}
                                />
                            ))
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.55)',
    },
    modal: {
        width: '100%',
        maxWidth: 360,
        padding: 28,
        alignItems: 'center',
    },
    iconCircle: {
        width: 76,
        height: 76,
        borderRadius: 38,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 8,
    },
    message: {
        textAlign: 'center',
        lineHeight: 22,
        opacity: 0.85,
    },
    actionsRow: {
        flexDirection: 'row',
        width: '100%',
    },
    actionsColumn: {
        width: '100%',
    },
    actionButtonHalf: {
        flex: 1,
    },
});
