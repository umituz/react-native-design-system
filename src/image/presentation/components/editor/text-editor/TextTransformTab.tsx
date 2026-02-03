/**
 * Text Transform Tab - Scale, rotation, opacity, delete
 */

import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { AtomicText, AtomicIcon } from "../../../../../atoms";
import { useAppDesignTokens } from "../../../../../theme/hooks/useAppDesignTokens";
import { textEditorStyles, type TabProps } from "./TextEditorTabs.styles";

const DEFAULT_SCALES = [0.5, 0.75, 1, 1.25, 1.5, 2];
const DEFAULT_ROTATIONS = [0, 45, 90, 135, 180, 225, 270, 315];
const DEFAULT_OPACITIES = [0.2, 0.4, 0.6, 0.8, 1];

export interface TextTransformTabProps extends TabProps {
  scale: number;
  setScale: (s: number) => void;
  rotation: number;
  setRotation: (r: number) => void;
  opacity: number;
  setOpacity: (o: number) => void;
  onDelete?: () => void;
}

export const TextTransformTab: React.FC<TextTransformTabProps> = ({
  scale,
  setScale,
  rotation,
  setRotation,
  opacity,
  setOpacity,
  onDelete,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={{ gap: tokens.spacing.xl }}>
      {/* Scale Selection */}
      <View>
        <AtomicText
          style={{
            ...tokens.typography.labelMedium,
            marginBottom: tokens.spacing.xs,
          }}
        >
          Scale: {scale.toFixed(2)}x
        </AtomicText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: tokens.spacing.sm }}
        >
          {DEFAULT_SCALES.map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setScale(s)}
              style={[
                textEditorStyles.transformButton,
                {
                  paddingHorizontal: tokens.spacing.md,
                  paddingVertical: tokens.spacing.sm,
                  borderRadius: tokens.borders.radius.md,
                  borderWidth: 1,
                  borderColor: scale === s ? tokens.colors.primary : tokens.colors.border,
                  backgroundColor: scale === s ? tokens.colors.primary : tokens.colors.surface,
                },
              ]}
            >
              <AtomicText
                style={{ color: scale === s ? "white" : tokens.colors.textPrimary }}
              >
                {s.toFixed(1)}x
              </AtomicText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Rotation Selection */}
      <View>
        <AtomicText
          style={{
            ...tokens.typography.labelMedium,
            marginBottom: tokens.spacing.xs,
          }}
        >
          Rotation: {Math.round(rotation)}°
        </AtomicText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: tokens.spacing.sm }}
        >
          {DEFAULT_ROTATIONS.map((r) => (
            <TouchableOpacity
              key={r}
              onPress={() => setRotation(r)}
              style={[
                textEditorStyles.transformButton,
                {
                  paddingHorizontal: tokens.spacing.md,
                  paddingVertical: tokens.spacing.sm,
                  borderRadius: tokens.borders.radius.md,
                  borderWidth: 1,
                  borderColor: rotation === r ? tokens.colors.primary : tokens.colors.border,
                  backgroundColor: rotation === r ? tokens.colors.primary : tokens.colors.surface,
                },
              ]}
            >
              <AtomicText
                style={{ color: rotation === r ? "white" : tokens.colors.textPrimary }}
              >
                {r}°
              </AtomicText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Opacity Selection */}
      <View>
        <AtomicText
          style={{
            ...tokens.typography.labelMedium,
            marginBottom: tokens.spacing.xs,
          }}
        >
          Opacity: {(opacity * 100).toFixed(0)}%
        </AtomicText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: tokens.spacing.sm }}
        >
          {DEFAULT_OPACITIES.map((o) => (
            <TouchableOpacity
              key={o}
              onPress={() => setOpacity(o)}
              style={[
                textEditorStyles.transformButton,
                {
                  paddingHorizontal: tokens.spacing.md,
                  paddingVertical: tokens.spacing.sm,
                  borderRadius: tokens.borders.radius.md,
                  borderWidth: 1,
                  borderColor: opacity === o ? tokens.colors.primary : tokens.colors.border,
                  backgroundColor: opacity === o ? tokens.colors.primary : tokens.colors.surface,
                },
              ]}
            >
              <AtomicText
                style={{ color: opacity === o ? "white" : tokens.colors.textPrimary }}
              >
                {Math.round(o * 100)}%
              </AtomicText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Delete Button */}
      {onDelete && (
        <TouchableOpacity
          onPress={onDelete}
          style={[
            textEditorStyles.deleteButton,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: tokens.spacing.sm,
              padding: tokens.spacing.md,
              borderRadius: tokens.borders.radius.md,
              borderWidth: 1,
              borderColor: tokens.colors.error,
            },
          ]}
        >
          <AtomicIcon name="trash" size={20} color="error" />
          <AtomicText
            style={{
              ...tokens.typography.labelMedium,
              color: tokens.colors.error,
            }}
          >
            Delete Layer
          </AtomicText>
        </TouchableOpacity>
      )}
    </View>
  );
};
