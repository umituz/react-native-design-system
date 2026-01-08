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
      borderWidth: selected ? tokens.borders.width.medium : tokens.borders.width.thin,
      borderColor: selected ? tokens.colors.primary : tokens.colors.outline,
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
      paddingVertical: tokens.spacing.xs,
      borderRadius: tokens.borders.radius.full,
      zIndex: 10,
    },
    badgeText: {
      color: tokens.colors.onPrimary,
      fontSize: tokens.typography.labelSmall.fontSize,
      fontWeight: 'bold',
    },
    overlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: tokens.colors.surfaceVariant,
      opacity: 0.95,
      justifyContent: 'flex-end',
      paddingVertical: tokens.spacing.md,
      paddingHorizontal: tokens.spacing.sm,
    },
    textContainer: {
      width: '100%',
    },
    title: {
      fontSize: tokens.typography.bodyMedium.fontSize,
      fontWeight: 'bold',
      color: tokens.colors.textInverse,
      textAlign: 'left',
      marginBottom: tokens.spacing.xs,
    },
    subtitle: {
      fontSize: tokens.typography.bodySmall.fontSize,
      color: tokens.colors.textSecondary,
      opacity: 0.9,
      textAlign: 'left',
    },
    checkCircle: {
      position: 'absolute',
      top: tokens.spacing.sm,
      right: tokens.spacing.sm,
      backgroundColor: tokens.colors.primary,
      borderRadius: tokens.borders.radius.full,
      width: tokens.spacing.lg,
      height: tokens.spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
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
        <View style={styles.checkCircle}>
          <AtomicIcon name="checkmark-outline" size="sm" color="onPrimary" />
        </View>
      )}
    </CardWrapper>
  );
};
