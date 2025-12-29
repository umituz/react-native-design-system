/**
 * AtomicIcon - Theme-aware Icon Component
 *
 * Uses @expo/vector-icons/Ionicons internally
 * Adds theme-aware semantic colors and background support
 */

import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppDesignTokens } from '../theme';
import {
  type IconSize as BaseIconSize
} from "./AtomicIcon.types";

// Re-export IconSize for convenience
export type IconSize = BaseIconSize;

const FALLBACK_ICON = "help-circle-outline";

// Semantic color names that map to theme tokens
export type IconColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "onSurface"
  | "surfaceVariant"
  | "onPrimary"
  | "onSecondary"
  | "textInverse"
  | "textPrimary"
  | "textSecondary"
  | "textTertiary"
  | "onSurfaceVariant";

// Accept any string for flexibility
export type IconName = string;

export interface AtomicIconProps {
  /** Icon name (Ionicons) */
  name: IconName;
  /** Semantic size preset */
  size?: IconSize;
  /** Custom size in pixels (overrides size) */
  customSize?: number;
  /** Semantic color from theme */
  color?: IconColor;
  /** Custom color (overrides color) */
  customColor?: string;
  /** Add circular background */
  withBackground?: boolean;
  /** Background color */
  backgroundColor?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Test ID */
  testID?: string;
  /** Additional styles */
  style?: StyleProp<ViewStyle>;
}

const getSemanticColor = (
  color: IconColor,
  tokens: ReturnType<typeof useAppDesignTokens>
): string => {
  const colorMap: Record<IconColor, string> = {
    primary: tokens.colors.primary,
    secondary: tokens.colors.secondary,
    success: tokens.colors.success,
    warning: tokens.colors.warning,
    error: tokens.colors.error,
    info: tokens.colors.info,
    onSurface: tokens.colors.onSurface,
    surfaceVariant: tokens.colors.surfaceVariant,
    onPrimary: tokens.colors.onPrimary,
    onSecondary: tokens.colors.onSecondary,
    textInverse: tokens.colors.textInverse,
    textPrimary: tokens.colors.textPrimary,
    textSecondary: tokens.colors.textSecondary,
    textTertiary: tokens.colors.textTertiary,
    onSurfaceVariant: tokens.colors.onSurfaceVariant,
  };
  return colorMap[color];
};

/**
 * Theme-aware icon component
 *
 * @example
 * <AtomicIcon name="heart-outline" size="md" color="primary" />
 * <AtomicIcon name="star" customSize={32} customColor="#FFD700" />
 * <AtomicIcon name="settings" size="lg" withBackground />
 */
export const AtomicIcon: React.FC<AtomicIconProps> = React.memo(({
  name,
  size = "md",
  customSize,
  color,
  customColor,
  withBackground = false,
  backgroundColor,
  accessibilityLabel,
  testID,
  style,
}) => {
  const tokens = useAppDesignTokens();

  // Calculate size
  const baseSize = customSize ?? size;
  const iconSizesMap = tokens.iconSizes as Record<string, number>;
  const sizeInPixels: number = typeof baseSize === 'number'
    ? baseSize * tokens.spacingMultiplier
    : iconSizesMap[baseSize] ?? iconSizesMap['md'] ?? 24;

  // Calculate color
  const iconColor = customColor
    ? customColor
    : color
      ? getSemanticColor(color, tokens)
      : tokens.colors.textPrimary;

  // Validate icon - use fallback silently if invalid
  const isValidIcon = name in Ionicons.glyphMap;
  const iconName = isValidIcon ? name : FALLBACK_ICON;

  const iconElement = (
    <Ionicons
      name={iconName as keyof typeof Ionicons.glyphMap}
      size={sizeInPixels}
      color={iconColor}
      testID={testID ? `${testID}-icon` : undefined}
    />
  );

  if (withBackground) {
    const bgColor = backgroundColor || tokens.colors.surfaceVariant;
    const containerSize = sizeInPixels + 16;

    return (
      <View
        style={[
          styles.backgroundContainer,
          {
            width: containerSize,
            height: containerSize,
            borderRadius: containerSize / 2,
            backgroundColor: bgColor,
          },
          style,
        ]}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
      >
        {iconElement}
      </View>
    );
  }

  return (
    <View accessibilityLabel={accessibilityLabel} testID={testID} style={style}>
      {iconElement}
    </View>
  );
});

AtomicIcon.displayName = "AtomicIcon";

const styles = StyleSheet.create({
  backgroundContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

// Legacy type alias for backward compatibility
export type IconProps = AtomicIconProps;

