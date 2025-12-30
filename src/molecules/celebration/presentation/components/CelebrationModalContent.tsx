import React from "react";
import { View } from "react-native";
import { Animated } from "../../../animation";
import { useAppDesignTokens } from "../../../../theme";
import { AtomicButton, AtomicText, AtomicIcon } from "../../../../atoms";
import type { CelebrationConfig } from "../../domain/entities/CelebrationConfig";
import type { ThemeColors } from "../../domain/entities/FireworksConfig";
import type { useCelebrationModalAnimation } from "../hooks/useCelebrationModalAnimation";
import { createCelebrationModalStyles } from "../styles/CelebrationModalStyles";

// Access View through Animated namespace with type assertion for reanimated v3 compatibility
const AnimatedView = (Animated as unknown as { View: React.ComponentType<{ style?: unknown; children?: React.ReactNode }> }).View;

export interface CelebrationModalContentProps {
    config: CelebrationConfig;
    onClose: () => void;
    themeColors?: ThemeColors;
    iconStyle: ReturnType<typeof useCelebrationModalAnimation>["iconStyle"];
    modalStyle: ReturnType<typeof useCelebrationModalAnimation>["modalStyle"];
}

export const CelebrationModalContent: React.FC<CelebrationModalContentProps> = ({
    config,
    onClose,
    themeColors,
    iconStyle,
    modalStyle,
}) => {
    const tokens = useAppDesignTokens();
    const styles = createCelebrationModalStyles();

    const successColor = themeColors?.success || tokens.colors.success;
    const primaryColor = themeColors?.primary || tokens.colors.primary;

    return (
        <AnimatedView
            style={[
                styles.modal,
                modalStyle,
                {
                    backgroundColor: tokens.colors.surface,
                    borderColor: tokens.colors.surfaceVariant,
                },
            ]}
        >
            <AnimatedView style={[styles.iconContainer, iconStyle]}>
                <View style={[styles.iconCircle, { backgroundColor: successColor }]}>
                    <AtomicIcon name="checkmark" size="xl" color="onPrimary" />
                </View>
            </AnimatedView>

            <AtomicText type="headlineSmall" style={[styles.title, { color: tokens.colors.onSurface }]}>
                {config.title}
            </AtomicText>

            <AtomicText type="bodyLarge" style={[styles.message, { color: tokens.colors.onSurface }]}>
                {config.message}
            </AtomicText>

            <View style={styles.actions}>
                {config.primaryAction && (
                    <AtomicButton
                        title={config.primaryAction.label}
                        onPress={() => {
                            config.primaryAction?.onPress();
                            onClose();
                        }}
                        variant="primary"
                        style={{ backgroundColor: primaryColor }}
                        fullWidth
                    />
                )}

                {config.secondaryAction && (
                    <AtomicButton
                        title={config.secondaryAction.label}
                        onPress={() => {
                            config.secondaryAction?.onPress();
                            onClose();
                        }}
                        variant="secondary"
                        fullWidth
                    />
                )}
            </View>
        </AnimatedView>
    );
};
