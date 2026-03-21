/**
 * StepHeader Component
 * Header component for step-by-step flows with title and subtitle
 *
 * @package @umituz/react-native-design-system
 */

import React, { useMemo } from "react";
import { View, StyleSheet, type ViewStyle, type StyleProp } from "react-native";
import { AtomicText } from "../../atoms/AtomicText";
import { useAppDesignTokens } from "../../theme/hooks/useAppDesignTokens";
import {
  calculateResponsiveSize,
  calculateLineHeight,
} from "../../utils/responsiveUtils";
import {
  BASE_FONT_SIZES,
  BASE_SPACING,
  BASE_STEP_DOT_SIZES,
  DEFAULT_CONFIG,
} from "./StepHeader.constants";

export interface StepHeaderConfig {
  showStepIndicator?: boolean;
  currentStep?: number;
  totalSteps?: number;
  titleAlignment?: "left" | "center" | "right";
  titleFontSize?: number;
  subtitleFontSize?: number;
  spacing?: {
    marginBottom?: number;
    paddingHorizontal?: number;
  };
}

export interface StepHeaderProps {
  title: string;
  subtitle?: string;
  config?: StepHeaderConfig;
  style?: StyleProp<ViewStyle>;
}

export const StepHeader: React.FC<StepHeaderProps> = ({
  title,
  subtitle,
  config = DEFAULT_CONFIG,
  style,
}) => {
  const tokens = useAppDesignTokens();
  const cfg = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [config]);
  const spacingMultiplier = tokens.spacingMultiplier;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingHorizontal: calculateResponsiveSize(
            cfg.spacing?.paddingHorizontal ?? BASE_SPACING.paddingHorizontal,
            spacingMultiplier
          ),
          marginBottom: calculateResponsiveSize(
            cfg.spacing?.marginBottom ?? BASE_SPACING.marginBottom,
            spacingMultiplier
          ),
        },
        stepIndicator: {
          flexDirection: "row",
          alignItems: "center",
          marginBottom: calculateResponsiveSize(BASE_SPACING.stepIndicatorMarginBottom, spacingMultiplier),
        },
        stepDot: {
          width: calculateResponsiveSize(BASE_STEP_DOT_SIZES.width, spacingMultiplier),
          height: calculateResponsiveSize(BASE_STEP_DOT_SIZES.height, spacingMultiplier),
          borderRadius: calculateResponsiveSize(BASE_STEP_DOT_SIZES.borderRadius, spacingMultiplier),
          marginHorizontal: calculateResponsiveSize(BASE_STEP_DOT_SIZES.marginHorizontal, spacingMultiplier),
        },
        activeDot: {
          backgroundColor: tokens.colors.primary,
        },
        inactiveDot: {
          backgroundColor: `${tokens.colors.primary}30`,
        },
        title: {
          fontSize: calculateResponsiveSize(cfg.titleFontSize ?? BASE_FONT_SIZES.title, spacingMultiplier),
          fontWeight: "900",
          color: tokens.colors.textPrimary,
          textAlign: cfg.titleAlignment,
          marginBottom: subtitle ? calculateResponsiveSize(BASE_SPACING.titleMarginBottom, spacingMultiplier) : 0,
          letterSpacing: 0.3,
        },
        subtitle: {
          fontSize: calculateResponsiveSize(cfg.subtitleFontSize ?? BASE_FONT_SIZES.subtitle, spacingMultiplier),
          fontWeight: "500",
          color: tokens.colors.textSecondary,
          textAlign: cfg.titleAlignment,
          lineHeight: calculateLineHeight(cfg.subtitleFontSize ?? BASE_FONT_SIZES.subtitle, spacingMultiplier),
          opacity: 0.9,
        },
      }),
    [tokens, cfg, subtitle, spacingMultiplier],
  );

  return (
    <View style={[styles.container, style]}>
      {cfg.showStepIndicator &&
        cfg.currentStep !== undefined &&
        cfg.totalSteps !== undefined && (
          <View style={styles.stepIndicator}>
            {Array.from({ length: cfg.totalSteps }, (_, i) => (
              <View
                key={`step-${i}`}
                style={[
                  styles.stepDot,
                  i + 1 <= cfg.currentStep!
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        )}

      <AtomicText style={styles.title}>{title}</AtomicText>

      {subtitle && <AtomicText style={styles.subtitle}>{subtitle}</AtomicText>}
    </View>
  );
};
