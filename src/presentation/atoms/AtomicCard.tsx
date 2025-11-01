import React from 'react';
import { Card as PaperCard } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Pressable } from 'react-native';

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

  // Map variants to Paper modes
  const getPaperMode = (): 'elevated' | 'outlined' | 'contained' => {
    switch (variant) {
      case 'elevated':
        return 'elevated';
      case 'outlined':
        return 'outlined';
      case 'flat':
        return 'contained';
      default:
        return 'elevated';
    }
  };

  // Map padding to actual values
  const getContentStyle = () => {
    const paddingMap = {
      none: 0,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    };
    const paddingValue = paddingMap[padding];
    return { padding: paddingValue };
  };

  const cardContent = (
    <PaperCard
      mode={getPaperMode()}
      style={style}
      testID={testID}
    >
      <PaperCard.Content style={getContentStyle()}>
        {children}
      </PaperCard.Content>
    </PaperCard>
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
