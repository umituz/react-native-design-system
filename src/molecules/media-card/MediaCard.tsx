/**
 * AtomicMediaCard - Reusable media card component
 *
 * Displays an image with optional overlay text, badge, and selection state.
 * Used for grids of images, memes, templates, etc.
 */

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  type ImageStyle,
} from 'react-native';
import { AtomicText, AtomicIcon } from '../../atoms';
import { useAppDesignTokens } from '../../theme';

import type { MediaCardProps } from './types';

export const MediaCard: React.FC<MediaCardProps> = ({
  uri,
  title,
  subtitle,
  badge,
  selected = false,
  size = 'md',
  aspectRatio = 0.8,
  overlayPosition = 'bottom',
  showOverlay = true,
  onPress,
  width,
  testID,
}) => {
  const tokens = useAppDesignTokens();

  const sizeConfig = {
    sm: { width: width || 120, borderRadius: tokens.radius.sm },
    md: { width: width || 144, borderRadius: tokens.radius.md },
    lg: { width: width || 160, borderRadius: tokens.radius.lg },
  };

  const config = sizeConfig[size];
  const height = config.width / aspectRatio;

  const styles = StyleSheet.create({
    container: {
      width: config.width,
      height,
      borderRadius: config.borderRadius,
      overflow: 'hidden',
      backgroundColor: tokens.colors.surfaceVariant,
      borderWidth: selected ? 2 : 1,
      borderColor: selected ? tokens.colors.primary : 'rgba(255,255,255,0.1)',
    },
    image: {
      width: '100%',
      height: '100%',
    } as ImageStyle,
    badge: {
      position: 'absolute',
      top: tokens.spacing.sm,
      right: tokens.spacing.sm,
      backgroundColor: tokens.colors.primary,
      paddingHorizontal: tokens.spacing.sm,
      paddingVertical: 2,
      borderRadius: 999,
      zIndex: 10,
    },
    badgeText: {
      color: tokens.colors.onPrimary,
      fontSize: 10,
      fontWeight: 'bold',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.5)', // Increased from 0.3 for better readability without shadows
      justifyContent:
        overlayPosition === 'center' ? 'center' : 'flex-end',
      alignItems: 'center',
      paddingBottom:
        overlayPosition === 'bottom' ? tokens.spacing.md : 0,
    },
    textContainer: {
      paddingHorizontal: tokens.spacing.md,
      width: '100%',
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: tokens.colors.textInverse,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 12,
      color: tokens.colors.textInverse,
      opacity: 0.8,
      textAlign: 'center',
    },
    checkCircle: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderRadius: 999,
      padding: tokens.spacing.sm,
    },
  });

  const CardWrapper = onPress ? TouchableOpacity : View;
  const wrapperProps = onPress
    ? {
        onPress,
        activeOpacity: 0.8,
        testID,
      }
    : { testID };

  return (
    <CardWrapper style={styles.container} {...wrapperProps}>
      {badge && (
        <View style={styles.badge}>
          <AtomicText style={styles.badgeText}>{badge}</AtomicText>
        </View>
      )}
      <Image source={{ uri }} style={styles.image} resizeMode="cover" />

      {showOverlay && (title || subtitle) && (
        <View style={styles.overlay}>
          <View style={styles.textContainer}>
            {title && (
              <AtomicText style={styles.title} numberOfLines={1}>
                {title}
              </AtomicText>
            )}
            {subtitle && (
              <AtomicText style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </AtomicText>
            )}
          </View>
        </View>
      )}

      {selected && (
        <View
          style={[
            styles.overlay,
          ]}
        >
          <View style={styles.checkCircle}>
            <AtomicIcon name="checkmark-outline" size="md" color="primary" />
          </View>
        </View>
      )}
    </CardWrapper>
  );
};
