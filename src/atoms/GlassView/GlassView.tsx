import React from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { BlurView, BlurTint } from 'expo-blur';
import { useDesignSystemTheme } from '../../theme';

export interface GlassViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  tint?: BlurTint;
  experimentalBlurMethod?: 'dimezisBlurView' | 'none';
}

/**
 * GlassView
 * 
 * A wrapper around Expo BlurView to create glassmorphism effects.
 * Automatically adapts to current theme unless overridden.
 */
export const GlassView: React.FC<GlassViewProps> = ({
  children,
  style,
  intensity = 50,
  tint,
  experimentalBlurMethod,

}) => {
  const { themeMode } = useDesignSystemTheme();
  const isDark = themeMode === 'dark';
  
  // Default tint based on theme if not provided
  // We explicitly cast the default strings to BlurTint to satisfy TS
  const defaultTint = (isDark ? 'dark' : 'light') as BlurTint;
  const resolvedTint = tint || defaultTint;

  return (
    <BlurView
      intensity={intensity}
      tint={resolvedTint}
      style={[styles.container, style]}
      experimentalBlurMethod={experimentalBlurMethod}
    >
      {children}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
