/**
 * AlertModal Component
 */

import React from 'react';
import { StyleSheet, View, Modal, Pressable } from 'react-native';
import { AtomicButton } from '../../atoms';
import { useAppDesignTokens } from '../../theme';
import { Alert } from './AlertTypes';
import { getAlertBackgroundColor } from './utils/alertUtils';
import { useAlertDismissHandler } from './hooks';
import { AlertContent } from './components';

interface AlertModalProps {
    alert: Alert;
}

export const AlertModal: React.FC<AlertModalProps> = ({ alert }) => {
    const tokens = useAppDesignTokens();

    // Use shared hook (replaces 8 lines of duplicate code)
    const handleClose = useAlertDismissHandler(alert);

    const headerColor = getAlertBackgroundColor(alert.type, tokens);

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
                        borderRadius: tokens.borders.radius.lg,
                        borderWidth: 1,
                        borderColor: tokens.colors.border,
                    }
                ]}>
                    <View style={[styles.header, { backgroundColor: headerColor }]}>
                        <AlertContent
                            title={alert.title}
                            message={alert.message ?? ""}
                            titleColor={tokens.colors.textInverse}
                            messageColor={tokens.colors.textInverse}
                            titleType="titleLarge"
                            textAlign="center"
                        />
                    </View>

                    <View style={[styles.content, { padding: tokens.spacing.lg }]}>

                        <View style={[styles.actions, { marginTop: tokens.spacing.lg, gap: tokens.spacing.sm }]}>
                            {alert.actions.map((action) => (
                                <AtomicButton
                                    key={action.id}
                                    title={action.label}
                                    variant={action.style === 'destructive' ? 'danger' : action.style === 'secondary' ? 'secondary' : 'primary'}
                                    onPress={async () => {
                                        // BUG FIX: Execute action BEFORE closing (was backwards)
                                        await action.onPress();
                                        if (action.closeOnPress ?? true) {
                                            handleClose();
                                        }
                                    }}
                                    fullWidth
                                />
                            ))}
                            {alert.actions.length === 0 && (
                                <AtomicButton
                                    title="Close"
                                    onPress={handleClose}
                                    fullWidth
                                />
                            )}
                        </View>
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
        padding: 20,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    modal: {
        width: '100%',
        maxWidth: 400,
        overflow: 'hidden',
    },
    header: {
        padding: 20,
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    actions: {
        width: '100%',
    },
});
