import { StyleSheet } from "react-native";
import { useAppDesignTokens } from "../../../../theme";

export const createCelebrationModalStyles = () => {
    const tokens = useAppDesignTokens();

    return StyleSheet.create({
        overlay: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: tokens.spacing.lg || 20,
        },
        modal: {
            width: "100%",
            maxWidth: 400,
            borderRadius: tokens.borders.radius.xl || 20,
            padding: tokens.spacing.xl || 28,
            borderWidth: 1,
            alignItems: "center",
        },
        iconContainer: {
            marginBottom: tokens.spacing.xl || 24,
        },
        iconCircle: {
            width: 80,
            height: 80,
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
        },
        iconText: {
            fontSize: 40,
            color: "#FFFFFF",
            fontWeight: "bold",
        },
        title: {
            fontSize: (tokens.typography.headlineSmall as any).fontSize || 22,
            fontWeight: "700",
            marginBottom: tokens.spacing.xs || 8,
            textAlign: "center",
        },
        message: {
            fontSize: (tokens.typography.bodyLarge as any).fontSize || 15,
            marginBottom: tokens.spacing.xl || 24,
            textAlign: "center",
            lineHeight: 22,
        },
        actions: {
            width: "100%",
            gap: tokens.spacing.md || 12,
        },
        button: {
            width: "100%",
            paddingVertical: 14,
            paddingHorizontal: 24,
            borderRadius: tokens.borders.radius.lg || 12,
            alignItems: "center",
        },
        buttonText: {
            fontSize: 16,
            fontWeight: "600",
        },
    });
};
