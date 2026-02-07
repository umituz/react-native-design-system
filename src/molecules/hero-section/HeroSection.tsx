
import React, { useMemo } from 'react';
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

  const themedStyles = useMemo(
    () => ({
      container: {
        width: '100%' as const,
        height: height || 400,
        position: 'relative' as const,
        backgroundColor: tokens.colors.surface,
        justifyContent: 'flex-start' as const,
        alignItems: 'flex-start' as const,
        overflow: 'hidden' as const,
      },
      background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: tokens.colors.surfaceVariant,
      },
      iconWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: tokens.colors.surfaceVariant,
        justifyContent: 'flex-start' as const,
        alignItems: 'flex-start' as const,
        borderWidth: 2,
        borderColor: tokens.colors.outlineVariant,
        zIndex: 10,
      },
    }),
    [tokens, height],
  );

  const source = imageUrl ? { uri: imageUrl } : imageSource;

  return (
    <View style={[themedStyles.container, style]}>
      {source ? (
        <Image
          source={source}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={themedStyles.background} />
      )}

      {/* Show icon only if no image */}
      {!source && icon && (
        <View style={themedStyles.iconWrapper}>
          <Text style={styles.emoji}>{icon}</Text>
        </View>
      )}

      <View style={styles.fadeOverlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
