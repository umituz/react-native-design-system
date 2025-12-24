/**
 * AtomicSkeleton - Skeleton Loader Component
 *
 * Skeleton placeholder loader with shimmer animation for loading states.
 * 
 * @example
 * ```tsx
 * // List skeleton
 * <AtomicSkeleton pattern="list" count={5} />
 * 
 * // Card skeleton
 * <AtomicSkeleton pattern="card" count={3} />
 * 
 * // Custom skeleton
 * <AtomicSkeleton 
 *   pattern="custom"
 *   custom={[
 *     { width: '100%', height: 200, borderRadius: 12 },
 *     { width: '80%', height: 20, borderRadius: 4 }
 *   ]}
 * />
 * ```
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, type StyleProp, type ViewStyle } from 'react-native';
import { useAppDesignTokens } from '../../theme';
import type { SkeletonPattern, SkeletonConfig } from './AtomicSkeleton.types';
import { SKELETON_PATTERNS } from './AtomicSkeleton.types';

const SHIMMER_DURATION = 1200;

export interface AtomicSkeletonProps {
  /** Skeleton pattern preset */
  pattern?: SkeletonPattern;
  /** Custom skeleton configurations */
  custom?: SkeletonConfig[];
  /** Number of skeleton items to render */
  count?: number;
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
  /** Disable shimmer animation */
  disableAnimation?: boolean;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Skeleton loader component with shimmer animation
 * 
 * Provides visual feedback during content loading with customizable patterns
 */
export const AtomicSkeleton: React.FC<AtomicSkeletonProps> = ({
  pattern = 'list',
  custom,
  count = 1,
  style,
  disableAnimation = false,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const skeletonConfigs = pattern === 'custom' && custom
    ? custom
    : SKELETON_PATTERNS[pattern];

  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (disableAnimation) return;

    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: SHIMMER_DURATION,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    );

    shimmerAnimation.start();

    return () => {
      shimmerAnimation.stop();
    };
  }, [shimmerAnim, disableAnimation]);

  const backgroundColor = shimmerAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      tokens.colors.surfaceSecondary,
      tokens.colors.border,
      tokens.colors.surfaceSecondary,
    ],
  });

  const renderSkeletonItem = (index: number) => (
    <View key={`skeleton-group-${index}`} style={styles.skeletonGroup}>
      {skeletonConfigs.map((config, configIndex) => (
        <Animated.View
          key={`skeleton-${index}-${configIndex}`}
          style={[
            styles.skeleton,
            {
              width: config.width as number | `${number}%` | undefined,
              height: config.height,
              borderRadius: config.borderRadius,
              marginBottom: config.marginBottom,
              backgroundColor: disableAnimation
                ? tokens.colors.surfaceSecondary
                : backgroundColor,
            } as any,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={[styles.container, style]} testID={testID}>
      {Array.from({ length: count }).map((_, index) => renderSkeletonItem(index))}
    </View>
  );
};

AtomicSkeleton.displayName = 'AtomicSkeleton';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  skeletonGroup: {
    width: '100%',
  },
  skeleton: {
    overflow: 'hidden',
  },
});
