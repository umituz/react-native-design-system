import React, { useMemo } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useAppDesignTokens } from '../../theme/hooks/useAppDesignTokens';
import { calculateResponsiveSize } from '../../utils/responsiveUtils';
import { BASE_SPACING, BASE_STEP_DIMENSIONS } from './StepProgress.constants';

export interface StepProgressProps {
    currentStep: number;
    totalSteps: number;
    style?: ViewStyle;
}

export const StepProgress: React.FC<StepProgressProps> = ({
    currentStep,
    totalSteps,
    style,
}) => {
    const tokens = useAppDesignTokens();
    const spacingMultiplier = tokens.spacingMultiplier;

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flexDirection: "row",
                    gap: calculateResponsiveSize(BASE_SPACING.gap, spacingMultiplier),
                    paddingHorizontal: calculateResponsiveSize(BASE_SPACING.paddingHorizontal, spacingMultiplier),
                    paddingVertical: calculateResponsiveSize(BASE_SPACING.paddingVertical, spacingMultiplier),
                },
                step: {
                    flex: 1,
                    height: calculateResponsiveSize(BASE_STEP_DIMENSIONS.height, spacingMultiplier),
                    borderRadius: calculateResponsiveSize(BASE_STEP_DIMENSIONS.borderRadius, spacingMultiplier),
                    backgroundColor: tokens.colors.border,
                },
                activeStep: {
                    backgroundColor: tokens.colors.primary,
                },
            }),
        [tokens, spacingMultiplier],
    );

    return (
        <View style={[styles.container, style]}>
            {Array.from({ length: totalSteps }).map((_, index) => (
                <View
                    key={index}
                    style={[styles.step, index < currentStep && styles.activeStep]}
                />
            ))}
        </View>
    );
};
