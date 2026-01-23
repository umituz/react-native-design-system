/**
 * Presentation - Text Editor Tabs
 */

import React from "react";
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AtomicText } from "../../../../atoms/AtomicText";
import { AtomicIcon } from "../../../../atoms/AtomicIcon";
import { useAppDesignTokens } from "../../../../theme/hooks/useAppDesignTokens";

interface TabProps {
  t: (key: string) => string;
}

export const TextContentTab: React.FC<
  TabProps & { text: string; onTextChange: (t: string) => void }
> = ({ text, onTextChange, t }) => {
  const tokens = useAppDesignTokens();
  return (
    <View style={{ gap: tokens.spacing.lg }}>
      <TextInput
        value={text}
        onChangeText={onTextChange}
        placeholder={t("editor.text_placeholder")}
        style={[
          styles.textInput,
          {
            ...tokens.typography.bodyLarge,
            borderColor: tokens.colors.border,
            borderRadius: tokens.borders.radius.md,
            padding: tokens.spacing.md,
            minHeight: 120,
            color: tokens.colors.textPrimary,
          },
        ]}
        multiline
      />
    </View>
  );
};

export const TextStyleTab: React.FC<
  TabProps & {
    fontSize: number;
    setFontSize: (s: number) => void;
    color: string;
    setColor: (c: string) => void;
    fontFamily: string;
    setFontFamily: (f: string) => void;
  }
> = ({ fontSize, setFontSize, color, setColor, fontFamily, setFontFamily }) => {
  const tokens = useAppDesignTokens();
  const colors = [
    "#FFFFFF",
    "#000000",
    "#FF0000",
    "#FFFF00",
    "#0000FF",
    "#00FF00",
    "#FF00FF",
    "#FFA500",
  ];
  const fonts = ["System", "serif", "sans-serif", "monospace"];
  const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32];

  return (
    <View style={{ gap: tokens.spacing.xl }}>
      <View>
        <AtomicText
          style={{
            ...tokens.typography.labelMedium,
            marginBottom: tokens.spacing.sm,
          }}
        >
          Font
        </AtomicText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: tokens.spacing.sm }}
        >
          {fonts.map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFontFamily(f)}
              style={[
                styles.fontButton,
                {
                  paddingHorizontal: tokens.spacing.md,
                  paddingVertical: tokens.spacing.xs,
                  borderRadius: tokens.borders.radius.full,
                  borderWidth: 1,
                  borderColor:
                    fontFamily === f
                      ? tokens.colors.primary
                      : tokens.colors.border,
                  backgroundColor:
                    fontFamily === f
                      ? tokens.colors.primary
                      : tokens.colors.surface,
                },
              ]}
            >
              <AtomicText style={{ fontFamily: f }}>{f}</AtomicText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View>
        <AtomicText
          style={{
            ...tokens.typography.labelMedium,
            marginBottom: tokens.spacing.sm,
          }}
        >
          Color
        </AtomicText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: tokens.spacing.sm }}
        >
          {colors.map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => setColor(c)}
              style={[
                styles.colorButton,
                {
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: c,
                  borderWidth: color === c ? 3 : 1,
                  borderColor: tokens.colors.primary,
                },
              ]}
            />
          ))}
        </ScrollView>
      </View>

      <View>
        <AtomicText
          style={{
            ...tokens.typography.labelMedium,
            marginBottom: tokens.spacing.xs,
          }}
        >
          Size: {fontSize}px
        </AtomicText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: tokens.spacing.sm }}
        >
          {fontSizes.map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setFontSize(s)}
              style={[
                styles.sizeButton,
                {
                  paddingHorizontal: tokens.spacing.md,
                  paddingVertical: tokens.spacing.sm,
                  borderRadius: tokens.borders.radius.md,
                  borderWidth: 1,
                  borderColor:
                    fontSize === s
                      ? tokens.colors.primary
                      : tokens.colors.border,
                  backgroundColor:
                    fontSize === s
                      ? tokens.colors.primary
                      : tokens.colors.surface,
                },
              ]}
            >
              <AtomicText
                style={{
                  color: fontSize === s ? "white" : tokens.colors.textPrimary,
                  fontWeight: "600",
                }}
              >
                {s}
              </AtomicText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export const TextTransformTab: React.FC<
  TabProps & {
    scale: number;
    setScale: (s: number) => void;
    rotation: number;
    setRotation: (r: number) => void;
    opacity: number;
    setOpacity: (o: number) => void;
    onDelete?: () => void;
  }
> = ({
  scale,
  setScale,
  rotation,
  setRotation,
  opacity,
  setOpacity,
  onDelete,
}) => {
  const tokens = useAppDesignTokens();
  const scales = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const rotations = [0, 45, 90, 135, 180, 225, 270, 315];
  const opacities = [0.2, 0.4, 0.6, 0.8, 1];

  return (
    <View style={{ gap: tokens.spacing.xl }}>
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
          {scales.map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setScale(s)}
              style={[
                styles.transformButton,
                {
                  paddingHorizontal: tokens.spacing.md,
                  paddingVertical: tokens.spacing.sm,
                  borderRadius: tokens.borders.radius.md,
                  borderWidth: 1,
                  borderColor:
                    scale === s ? tokens.colors.primary : tokens.colors.border,
                  backgroundColor:
                    scale === s ? tokens.colors.primary : tokens.colors.surface,
                },
              ]}
            >
              <AtomicText
                style={{
                  color: scale === s ? "white" : tokens.colors.textPrimary,
                }}
              >
                {s.toFixed(1)}x
              </AtomicText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

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
          {rotations.map((r) => (
            <TouchableOpacity
              key={r}
              onPress={() => setRotation(r)}
              style={[
                styles.transformButton,
                {
                  paddingHorizontal: tokens.spacing.md,
                  paddingVertical: tokens.spacing.sm,
                  borderRadius: tokens.borders.radius.md,
                  borderWidth: 1,
                  borderColor:
                    rotation === r
                      ? tokens.colors.primary
                      : tokens.colors.border,
                  backgroundColor:
                    rotation === r
                      ? tokens.colors.primary
                      : tokens.colors.surface,
                },
              ]}
            >
              <AtomicText
                style={{
                  color: rotation === r ? "white" : tokens.colors.textPrimary,
                }}
              >
                {r}°
              </AtomicText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

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
          {opacities.map((o) => (
            <TouchableOpacity
              key={o}
              onPress={() => setOpacity(o)}
              style={[
                styles.transformButton,
                {
                  paddingHorizontal: tokens.spacing.md,
                  paddingVertical: tokens.spacing.sm,
                  borderRadius: tokens.borders.radius.md,
                  borderWidth: 1,
                  borderColor:
                    opacity === o
                      ? tokens.colors.primary
                      : tokens.colors.border,
                  backgroundColor:
                    opacity === o
                      ? tokens.colors.primary
                      : tokens.colors.surface,
                },
              ]}
            >
              <AtomicText
                style={{
                  color: opacity === o ? "white" : tokens.colors.textPrimary,
                }}
              >
                {Math.round(o * 100)}%
              </AtomicText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {onDelete && (
        <TouchableOpacity
          onPress={onDelete}
          style={[
            styles.deleteButton,
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

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    textAlignVertical: "top",
  },
  fontButton: {
    paddingVertical: 8,
    minWidth: 80,
    alignItems: "center",
  },
  colorButton: {
    width: 40,
    height: 40,
  },
  sizeButton: {
    minWidth: 50,
    alignItems: "center",
  },
  transformButton: {
    minWidth: 60,
    alignItems: "center",
  },
  deleteButton: {
    alignSelf: "flex-start",
  },
});
