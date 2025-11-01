import React from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Pressable } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface AtomicButtonProps {
  title?: string;
  children?: React.ReactNode;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AtomicButton: React.FC<AtomicButtonProps> = ({
  title,
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  style,
  testID,
}) => {
  // Animation
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!disabled && !loading) {
      scale.value = withSpring(0.95, {
        damping: 15,
        stiffness: 150,
      });
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handlePress = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };

  // Map variants to Paper modes
  const getPaperMode = (): 'contained' | 'outlined' | 'text' | 'contained-tonal' | 'elevated' => {
    switch (variant) {
      case 'primary':
        return 'contained';
      case 'secondary':
        return 'contained-tonal';
      case 'outline':
        return 'outlined';
      case 'text':
        return 'text';
      case 'danger':
        return 'contained';
      default:
        return 'contained';
    }
  };

  // Map size to padding
  const getContentStyle = () => {
    const paddingMap = {
      sm: { paddingVertical: 4, paddingHorizontal: 12 },
      md: { paddingVertical: 8, paddingHorizontal: 16 },
      lg: { paddingVertical: 12, paddingHorizontal: 20 },
    };
    return paddingMap[size];
  };

  const buttonStyle: StyleProp<ViewStyle> = StyleSheet.flatten([
    fullWidth ? { width: '100%' } : undefined,
    style,
  ]);

  const buttonText = title || children;

  return (
    <AnimatedPressable
      style={animatedStyle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <PaperButton
        mode={getPaperMode()}
        disabled={disabled}
        loading={loading}
        icon={icon}
        style={buttonStyle}
        contentStyle={getContentStyle()}
        testID={testID}
        buttonColor={variant === 'danger' ? '#DC2626' : undefined}
      >
        {buttonText}
      </PaperButton>
    </AnimatedPressable>
  );
};

export type { AtomicButtonProps as ButtonProps };
