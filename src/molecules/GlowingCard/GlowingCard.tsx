import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Pressable, GestureResponderEvent } from 'react-native';
import { useAppDesignTokens } from '../../theme';

export interface GlowingCardProps {
  children: React.ReactNode;
  glowColor?: string;
  intensity?: number; // 0 to 1, default 1
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  testID?: string;
}

/**
 * GlowingCard
 * 
 * A card component with a neon-like glow effect using shadows.
 */
export const GlowingCard: React.FC<GlowingCardProps> = ({
  children,
  glowColor,
  intensity = 1,
  style,
  onPress,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const resolvedColor = glowColor || tokens.colors.primary;

  const shadowStyle: ViewStyle = {
    shadowColor: resolvedColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6 * intensity,
    shadowRadius: 10 * intensity,
    elevation: 8 * intensity, // Android elevation
    // We allow the style prop to override backgroundColor, default to surface if not provided
    backgroundColor: tokens.colors.surface, 
    borderRadius: tokens.borders.radius.md,
    borderColor: resolvedColor,
    borderWidth: 1,
  };

  // Extract background color from style if present to override default
  const styleObj = StyleSheet.flatten(style) || {};
  const finalBackgroundColor = styleObj.backgroundColor || shadowStyle.backgroundColor;

  const containerStyle = [
    styles.container,
    shadowStyle,
    style,
    // Ensure background color is consistent
    { backgroundColor: finalBackgroundColor }
  ];

  if (onPress) {
    return (
      <Pressable 
        style={({ pressed }) => [
          containerStyle,
          pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
        ]} 
        onPress={onPress}
        testID={testID}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={containerStyle} testID={testID}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'visible', // Needed for shadow
  },
});
