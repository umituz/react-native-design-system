/**
 * AlertContainer Component
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDesignTokens } from '@theme';
import { useAlertStore } from './AlertStore';
import { AlertToast } from './AlertToast';
import { AlertBanner } from './AlertBanner';
import { AlertModal } from './AlertModal';
import { AlertMode } from './AlertTypes';

export const AlertContainer: React.FC = () => {
    const alerts = useAlertStore((state) => state.alerts);
    const insets = useSafeAreaInsets();
    const tokens = useAppDesignTokens();

    const toasts = alerts.filter((a) => a.mode === AlertMode.TOAST);
    const banners = alerts.filter((a) => a.mode === AlertMode.BANNER);
    const modals = alerts.filter((a) => a.mode === AlertMode.MODAL);

    return (
        <View style={styles.container} pointerEvents="box-none">
            {/* Banners at top */}
            <View style={[styles.bannerContainer, { paddingTop: insets.top }]}>
                {banners.map((alert) => (
                    <AlertBanner key={alert.id} alert={alert} />
                ))}
            </View>

            {/* Toasts at top or bottom (default top) */}
            <View style={[
                styles.toastContainer,
                {
                    top: insets.top + (banners.length > 0 ? tokens.spacing.xl * 2 : tokens.spacing.lg),
                    paddingHorizontal: tokens.spacing.md,
                }
            ]}>
                {toasts.map((alert) => (
                    <View key={alert.id} style={{ marginBottom: tokens.spacing.sm, width: '100%' }}>
                        <AlertToast alert={alert} />
                    </View>
                ))}
            </View>

            {/* Modals on top of everything */}
            {modals.map((alert) => (
                <AlertModal key={alert.id} alert={alert} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 9999,
    },
    bannerContainer: {
        width: '100%',
    },
    toastContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 10000,
    },
});
