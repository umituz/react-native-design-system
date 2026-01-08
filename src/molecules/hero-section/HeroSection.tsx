
import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useAppDesignTokens } from '../../theme';
import type { HeroSectionProps } from './types';

export const HeroSection: React.FC<HeroSectionProps> = ({
  icon,
  imageUrl,
  imageSource,
  height,
  style,
}) => {
  const tokens = useAppDesignTokens();
  // Default height 50% of screen if not provided? No, components shouldn't guess screen height directly if possible, or use prop.
  // We'll leave height control to the parent or style, but provide a sensible default if passed as prop.

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: height || 400,
      position: 'relative',
      backgroundColor: tokens.colors.surface,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      overflow: 'hidden',
    },
    background: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: tokens.colors.surfaceVariant,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
    },
    iconWrapper: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: tokens.colors.surfaceVariant,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      borderWidth: 2,
      borderColor: tokens.colors.outlineVariant,
      zIndex: 10,
    },
    emoji: {
      fontSize: 64,
      textAlign: 'left',
      includeFontPadding: false,
    },
    fadeOverlay: {
      position: 'absolute',
      bottom: -1,
      left: 0,
      right: 0,
      height: 100,
      // We can't use LinearGradient here per rules.
      // Use a solid color with opacity or a series of views if really needed, but user said NO GRADIENT.
      // The original code used backgroundColor: "rgba(15, 5, 10, 0.7)".
      // We'll use a semi-transparent overlay at the bottom.
      backgroundColor: 'rgba(0,0,0,0.5)', // Generic dark overlay
    },
  });

  const source = imageUrl ? { uri: imageUrl } : imageSource;

  return (
    <View style={[styles.container, style]}>
      {source ? (
        <Image
          source={source}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.background} />
      )}

      {/* Show icon only if no image */}
      {!source && icon && (
        <View style={styles.iconWrapper}>
          <Text style={styles.emoji}>{icon}</Text>
        </View>
      )}

      <View style={styles.fadeOverlay} />
    </View>
  );
};
