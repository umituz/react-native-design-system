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

import React, { useEffect } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
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
const SkeletonItem: React.FC<{
  config: SkeletonConfig;
  baseColor: string;
  highlightColor: string;
  disableAnimation: boolean;
}> = ({ config, baseColor, highlightColor, disableAnimation }) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (disableAnimation) return;

    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: SHIMMER_DURATION / 2, easing: Easing.ease }),
        withTiming(0, { duration: SHIMMER_DURATION / 2, easing: Easing.ease })
      ),
      -1,
      false
    );
  }, [opacity, disableAnimation]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: disableAnimation
      ? baseColor
      : opacity.value === 0
        ? baseColor
        : highlightColor,
    opacity: disableAnimation ? 1 : 0.5 + opacity.value * 0.5,
  }));

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width: config.width as number | `${number}%` | undefined,
          height: config.height,
          borderRadius: config.borderRadius,
          marginBottom: config.marginBottom,
          backgroundColor: baseColor,
        },
        animatedStyle,
      ]}
    />
  );
};

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

  const renderSkeletonItem = (index: number) => (
    <View key={`skeleton-group-${index}`} style={styles.skeletonGroup}>
      {skeletonConfigs.map((config, configIndex) => (
        <SkeletonItem
          key={`skeleton-${index}-${configIndex}`}
          config={config}
          baseColor={tokens.colors.surfaceSecondary}
          highlightColor={tokens.colors.border}
          disableAnimation={disableAnimation}
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
