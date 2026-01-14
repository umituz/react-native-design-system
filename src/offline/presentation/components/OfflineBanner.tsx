/**
 * OfflineBanner Component
 *
 * Displays a banner when the device is offline.
 * Simple conditional rendering - NO animations per CLAUDE.md
 *
 * @example
 * ```tsx
 * import { OfflineBanner, useOffline } from '@umituz/react-native-design-system';
 *
 * const App = () => {
 *   const { isOffline } = useOffline();
 *   return (
 *     <>
 *       <OfflineBanner visible={isOffline} message="No internet connection" />
 *       <YourContent />
 *     </>
 *   );
 * };
 * ```
 */

import React, { memo } from 'react';
import { View, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import { AtomicText } from '../../../atoms';

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
  /** Height of the banner */
  height?: number;
}

const DEFAULT_HEIGHT = 44;

export const OfflineBanner: React.FC<OfflineBannerProps> = memo(({
  visible,
  message = 'No internet connection',
  backgroundColor = '#FF6B6B',
  textColor = '#FFFFFF',
  icon = '📡',
  position = 'top',
  style,
  textStyle,
  height = DEFAULT_HEIGHT,
}) => {
  // Simple conditional rendering - no animations
  if (!visible) {
    return null;
  }

  const positionStyle: ViewStyle = position === 'top' ? { top: 0 } : { bottom: 0 };

  return (
    <View
      style={[
        styles.container,
        positionStyle,
        { backgroundColor, height },
        style,
      ]}
    >
      <View style={styles.content}>
        {typeof icon === 'string' ? (
          <AtomicText style={styles.icon}>{icon}</AtomicText>
        ) : (
          icon
        )}
        <AtomicText
          style={[styles.message, { color: textColor }, textStyle]}
          numberOfLines={1}
        >
          {message}
        </AtomicText>
      </View>
    </View>
  );
});

OfflineBanner.displayName = 'OfflineBanner';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
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
