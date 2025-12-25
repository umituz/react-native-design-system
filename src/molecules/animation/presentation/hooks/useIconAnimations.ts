/**
 * useElementAnimations Hook
 * Single Responsibility: Manage element scale and rotate animations
 * Generic implementation for any UI element (icons, buttons, etc.)
 */

import { useEffect, useMemo } from "react";
import { useAnimatedStyle, withTiming, withSequence, Easing } from "react-native-reanimated";
import { useTransformAnimation } from "./useTransformAnimation";

export interface ElementAnimationConfig {
  scaleMax?: number;
  scaleBounceMax?: number; // Alias for scaleMax
  scaleMin?: number;
  rotateDegrees?: number;
  delay?: number;
  scaleDuration?: number;
  rotateDuration?: number;
  resetOnHide?: boolean;
}

const DEFAULT_ELEMENT_ANIMATION_CONFIG: Required<ElementAnimationConfig> = {
  scaleMax: 1.2,
  scaleBounceMax: 1.2,
  scaleMin: 1,
  rotateDegrees: 360,
  delay: 200,
  scaleDuration: 300,
  rotateDuration: 500,
  resetOnHide: true,
} as const;

export interface UseElementAnimationsReturn {
  elementStyle: ReturnType<typeof useAnimatedStyle>;
  iconStyle: ReturnType<typeof useAnimatedStyle>; // Alias for elementStyle
}

/**
 * Hook for managing element animations
 * Generic implementation suitable for icons, buttons, badges, etc.
 */
export function useElementAnimations(
  visible: boolean,
  isReanimatedReady: boolean,
  config?: ElementAnimationConfig,
): UseElementAnimationsReturn {
  const transform = useTransformAnimation();

  const animationConfig = useMemo(
    () => ({
      ...DEFAULT_ELEMENT_ANIMATION_CONFIG,
      ...config,
      scaleMax: config?.scaleBounceMax ?? config?.scaleMax ?? DEFAULT_ELEMENT_ANIMATION_CONFIG.scaleMax,
    }),
    [
      config?.scaleMax,
      config?.scaleBounceMax,
      config?.scaleMin,
      config?.rotateDegrees,
      config?.delay,
      config?.scaleDuration,
      config?.rotateDuration,
      config?.resetOnHide,
    ],
  );

  useEffect(() => {
    if (visible && isReanimatedReady) {
      const timeoutId = setTimeout(() => {
        transform.scale.value = withSequence(
          withTiming(animationConfig.scaleMax, {
            duration: animationConfig.scaleDuration,
            easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          }),
          withTiming(animationConfig.scaleMin, {
            duration: animationConfig.scaleDuration,
            easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          }),
        );

        transform.rotate.value = withSequence(
          withTiming(animationConfig.rotateDegrees, {
            duration: animationConfig.rotateDuration,
            easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          }),
          withTiming(0, { duration: 0 }),
        );
      }, animationConfig.delay);

      return () => {
        clearTimeout(timeoutId);
      };
    } else if (!visible && isReanimatedReady && animationConfig.resetOnHide) {
      transform.scale.value = 1;
      transform.rotate.value = 0;
    }
    return undefined;
  }, [visible, isReanimatedReady, animationConfig, transform]);

  const elementStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: transform.scale.value },
      { rotate: `${transform.rotate.value}deg` },
    ] as any,
  }));

  return {
    elementStyle,
    iconStyle: elementStyle, // Alias for backward compatibility
  };
}

// Legacy exports for backward compatibility
export const useIconAnimations = useElementAnimations;
export type IconAnimationConfig = ElementAnimationConfig;
export type UseIconAnimationsReturn = UseElementAnimationsReturn & {
  iconStyle: ReturnType<typeof useAnimatedStyle>;
};


