/**
 * OfflineBanner Component
 *
 * Displays a banner when the device is offline.
 * Fully customizable for use across 100+ apps.
 *
 * @example
 * ```tsx
 * import { OfflineBanner, useOffline } from '@umituz/react-native-offline';
 *
 * const App = () => {
 *   const { isOffline } = useOffline();
 *
 *   return (
 *     <>
 *       <OfflineBanner
 *         visible={isOffline}
 *         message="No internet connection"
 *         backgroundColor="#FF6B6B"
 *       />
 *       <YourContent />
 *     </>
 *   );
 * };
 * ```
 */

import React, { useEffect, useRef, memo } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';

export interface OfflineBannerProps {
  /** Whether the banner is visible */
  visible: boolean;
  /** Message to display */
  message?: string;
  /** Background color of the banner */
  backgroundColor?: string;
  /** Text color */
  textColor?: string;
  /** Icon to display (emoji or custom element) */
  icon?: string | React.ReactNode;
  /** Position of the banner */
  position?: 'top' | 'bottom';
  /** Custom container style */
  style?: ViewStyle;
  /** Custom text style */
  textStyle?: TextStyle;
  /** Animation duration in ms */
  animationDuration?: number;
  /** Height of the banner */
  height?: number;
}

const DEFAULT_HEIGHT = 44;
const DEFAULT_ANIMATION_DURATION = 300;

export const OfflineBanner: React.FC<OfflineBannerProps> = memo(({
  visible,
  message = 'No internet connection',
  backgroundColor = '#FF6B6B',
  textColor = '#FFFFFF',
  icon = '📡',
  position = 'top',
  style,
  textStyle,
  animationDuration = DEFAULT_ANIMATION_DURATION,
  height = DEFAULT_HEIGHT,
}) => {
  const animatedValue = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      animatedValue.setValue(visible ? 1 : 0);
      return;
    }

    Animated.timing(animatedValue, {
      toValue: visible ? 1 : 0,
      duration: animationDuration,
      useNativeDriver: false,
    }).start();
  }, [visible, animatedValue, animationDuration]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [position === 'top' ? -height : height, 0],
  });

  const animatedHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.8, 1],
  });

  const positionStyle: ViewStyle = position === 'top'
    ? { top: 0 }
    : { bottom: 0 };

  return (
    <Animated.View
      style={[
        styles.container,
        positionStyle,
        {
          backgroundColor,
          height: animatedHeight,
          transform: [{ translateY }],
          opacity,
        },
        style,
      ]}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      <View style={styles.content}>
        {typeof icon === 'string' ? (
          <Text style={styles.icon}>{icon}</Text>
        ) : (
          icon
        )}
        <Text
          style={[
            styles.message,
            { color: textColor },
            textStyle,
          ]}
          numberOfLines={1}
        >
          {message}
        </Text>
      </View>
    </Animated.View>
  );
});

OfflineBanner.displayName = 'OfflineBanner';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  icon: {
    fontSize: 16,
  },
  message: {
    fontSize: 14,
    fontWeight: '500',
  },
});
