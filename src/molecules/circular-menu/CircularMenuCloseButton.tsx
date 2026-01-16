import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { AtomicIcon } from "../../atoms";
import { useAppDesignTokens } from "../../theme";
import { LAYOUT } from "./constants";

export interface CircularMenuCloseButtonProps {
  onPress: () => void;
}

export const CircularMenuCloseButton: React.FC<CircularMenuCloseButtonProps> = ({
  onPress,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: tokens.colors.surfaceVariant,
          width: LAYOUT.CLOSE_BUTTON_SIZE,
          height: LAYOUT.CLOSE_BUTTON_SIZE,
          borderRadius: LAYOUT.CLOSE_BUTTON_SIZE / 2,
          borderWidth: 1,
          borderColor: tokens.colors.border,
        },
      ]}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel="Close menu"
    >
      <AtomicIcon name="close" size="md" color="secondary" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
