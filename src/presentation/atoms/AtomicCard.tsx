import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Pressable } from 'react-native';
import { useAppDesignTokens } from '../hooks/useAppDesignTokens';

export type AtomicCardVariant = 'flat' | 'elevated' | 'outlined';
export type AtomicCardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface AtomicCardProps {
  variant?: AtomicCardVariant;
  padding?: AtomicCardPadding;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  testID?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AtomicCard: React.FC<AtomicCardProps> = ({
  variant = 'elevated',
  padding = 'md',
  onPress,
  disabled = false,
  style,
  children,
  testID,
}) => {
  const tokens = useAppDesignTokens();

  // Animation for tap feedback
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (onPress && !disabled) {
      scale.value = withSpring(0.98, {
        damping: 15,
        stiffness: 150,
      });
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handlePress = () => {
    if (onPress && !disabled) {
      onPress();
    }
  };

  // Map padding to token values
  const getPaddingValue = (): number => {
    const paddingMap = {
      none: 0,
      sm: tokens.spacing.sm,
      md: tokens.spacing.md,
      lg: tokens.spacing.lg,
      xl: tokens.spacing.xl,
    };
    return paddingMap[padding];
  };

  // Get variant styles
  const getVariantStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: tokens.colors.surface,
      borderRadius: tokens.borders.radius.md,
    };

    switch (variant) {
      case 'elevated':
        return {
          ...baseStyle,
          borderWidth: 1,
          borderColor: tokens.colors.border,
        };

      case 'outlined':
        return {
          ...baseStyle,
          borderWidth: 1,
          borderColor: tokens.colors.border,
        };

      case 'flat':
        return {
          ...baseStyle,
          borderWidth: 0,
        };

      default:
        return baseStyle;
    }
  };

  const cardStyle: StyleProp<ViewStyle> = [
    getVariantStyle(),
    {
      padding: getPaddingValue(),
      opacity: disabled ? 0.5 : 1,
    },
    style,
  ];

  const cardContent = (
    <View style={cardStyle} testID={testID}>
      {children}
    </View>
  );

  // If onPress provided, wrap with animated pressable
  if (onPress && !disabled) {
    return (
      <AnimatedPressable
        style={animatedStyle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        {cardContent}
      </AnimatedPressable>
    );
  }

  // Otherwise just return static card
  return cardContent;
};
