import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AtomicIcon } from "../../atoms";
import { AtomicText } from "../../atoms";
import { useAppDesignTokens } from "../../theme";
import { LAYOUT } from "./constants";

export interface CircularMenuItemProps {
  icon: string;
  label: string;
  onPress: () => void;
}

export const CircularMenuItem: React.FC<CircularMenuItemProps> = ({
  icon,
  label,
  onPress,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: tokens.colors.surfaceVariant,
            width: LAYOUT.ITEM_SIZE,
            height: LAYOUT.ITEM_SIZE,
            borderRadius: LAYOUT.ITEM_SIZE / 2,
            borderWidth: 1,
            borderColor: tokens.colors.border,
          },
        ]}
      >
        <AtomicIcon name={icon} size="lg" color="primary" />
      </View>
      <AtomicText
        type="labelSmall"
        style={[styles.label, { color: tokens.colors.textPrimary }]}
      >
        {label}
      </AtomicText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 6,
    width: 90,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
  },
});
