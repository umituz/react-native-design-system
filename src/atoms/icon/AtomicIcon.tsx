/**
 * AtomicIcon - Agnostic Icon Component
 *
 * This component is completely icon-library agnostic.
 * Apps MUST provide their own icon renderer via DesignSystemProvider.
 *
 * @example
 * // In your app, provide an icon renderer:
 * import { MaterialIcons } from '@expo/vector-icons';
 *
 * <DesignSystemProvider
 *   iconRenderer={({ name, size, color }) => (
 *     <MaterialIcons name={name} size={size} color={color} />
 *   )}
 * >
 *   <App />
 * </DesignSystemProvider>
 *
 * // Then use AtomicIcon anywhere:
 * <AtomicIcon name="favorite" size="md" color="primary" />
 */

import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useAppDesignTokens } from "../../theme";
import { useIconRenderer, type IconRenderProps } from "./iconStore";
import {
  type IconSize as BaseIconSize,
  type IconColor,
} from "./AtomicIcon.types";

export type IconSize = BaseIconSize;
export type IconName = string;
export type { IconColor, IconRenderProps };

export interface AtomicIconProps {
  /** Icon name - interpreted by the app's icon renderer */
  name?: string;
  /** Semantic size preset */
  size?: IconSize;
  /** Custom size in pixels (overrides size) */
  customSize?: number;
  /** Semantic color from theme */
  color?: IconColor;
  /** Custom color (overrides color) */
  customColor?: string;
  /** Custom SVG path for inline SVG icons */
  svgPath?: string;
  /** ViewBox for custom SVG (default: 0 0 24 24) */
  svgViewBox?: string;
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
 * Agnostic icon component - requires iconRenderer in DesignSystemProvider
 */
export const AtomicIcon: React.FC<AtomicIconProps> = React.memo(
  ({
    name,
    size = "md",
    customSize,
    color,
    customColor,
    withBackground = false,
    backgroundColor,
    svgPath,
    svgViewBox = "0 0 24 24",
    accessibilityLabel,
    testID,
    style,
  }) => {
    const tokens = useAppDesignTokens();
    const iconRenderer = useIconRenderer();

    // Calculate size
    const baseSize = customSize ?? size;
    const iconSizesMap = tokens.iconSizes as Record<string, number>;
    const sizeInPixels: number =
      typeof baseSize === "number"
        ? baseSize * tokens.spacingMultiplier
        : iconSizesMap[baseSize] ?? iconSizesMap["md"] ?? 24;

    // Calculate color
    const iconColor = customColor
      ? customColor
      : color
        ? getSemanticColor(color, tokens)
        : tokens.colors.textPrimary;

    // SVG path rendering (built-in, no external dependency)
    if (svgPath) {
      const svgElement = (
        <Svg
          viewBox={svgViewBox}
          width={sizeInPixels}
          height={sizeInPixels}
          key="custom-svg-icon"
          testID={testID}
          accessibilityLabel={accessibilityLabel}
        >
          <Path d={svgPath} fill={iconColor} />
        </Svg>
      );

      if (withBackground) {
        return renderWithBackground(
          svgElement,
          sizeInPixels,
          backgroundColor || tokens.colors.surfaceVariant,
          style,
          testID,
          accessibilityLabel
        );
      }

      return svgElement;
    }

    // No icon renderer provided - warn in dev and render nothing
    if (!iconRenderer) {
      if (__DEV__) {
        console.warn(
          "[DesignSystem] AtomicIcon requires an iconRenderer in DesignSystemProvider.\n" +
            "Example:\n" +
            "<DesignSystemProvider\n" +
            '  iconRenderer={({ name, size, color }) => (\n' +
            '    <YourIconLibrary name={name} size={size} color={color} />\n' +
            "  )}\n" +
            ">"
        );
      }
      return null;
    }

    // Build render props
    const renderProps: IconRenderProps = {
      name: name || "",
      size: sizeInPixels,
      color: iconColor,
      style: style as StyleProp<ViewStyle>,
      testID,
      accessibilityLabel,
    };

    const iconElement = iconRenderer(renderProps);

    if (withBackground) {
      return renderWithBackground(
        iconElement,
        sizeInPixels,
        backgroundColor || tokens.colors.surfaceVariant,
        style,
        testID,
        accessibilityLabel
      );
    }

    return <>{iconElement}</>;
  }
);

AtomicIcon.displayName = "AtomicIcon";

/**
 * Helper to render icon with circular background
 */
function renderWithBackground(
  iconElement: React.ReactNode,
  sizeInPixels: number,
  bgColor: string,
  style: StyleProp<ViewStyle> | undefined,
  testID: string | undefined,
  accessibilityLabel: string | undefined
): React.ReactElement {
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

const styles = StyleSheet.create({
  backgroundContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
