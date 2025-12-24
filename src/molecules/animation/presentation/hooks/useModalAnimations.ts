/**
 * useOverlayAnimations Hook
 * Single Responsibility: Manage overlay and content animations
 * Generic implementation for any overlay-based UI component
 */

import { useEffect, useMemo, useRef } from "react";
import { useAnimatedStyle } from "react-native-reanimated";
import { useReanimatedReady } from "./useReanimatedReady";
import { useTimingAnimation } from "./useTimingAnimation";
import { useSpringAnimation } from "./useSpringAnimation";

export interface OverlayAnimationConfig {
  overlayFadeDuration?: number;
  contentScaleDamping?: number;
  modalScaleDamping?: number; // Alias for contentScaleDamping
  contentScaleStiffness?: number;
  contentFadeDuration?: number;
  initialScale?: number;
}

const DEFAULT_OVERLAY_ANIMATION_CONFIG: Required<OverlayAnimationConfig> = {
  overlayFadeDuration: 300,
  contentScaleDamping: 7,
  modalScaleDamping: 7,
  contentScaleStiffness: 50,
  contentFadeDuration: 300,
  initialScale: 0,
} as const;

export interface UseOverlayAnimationsReturn {
  isReady: boolean;
  overlayStyle: ReturnType<typeof useAnimatedStyle>;
  contentStyle: ReturnType<typeof useAnimatedStyle>;
  modalStyle: ReturnType<typeof useAnimatedStyle>; // Alias for contentStyle
}

/**
 * Hook for managing overlay and content animations
 * Generic implementation suitable for modals, popups, tooltips, etc.
 */
export function useOverlayAnimations(
  visible: boolean,
  config?: OverlayAnimationConfig,
): UseOverlayAnimationsReturn {
  const isReanimatedReady = useReanimatedReady();
  const overlayTiming = useTimingAnimation();
  const contentTiming = useTimingAnimation();
  const spring = useSpringAnimation();
  const previousVisibleRef = useRef<boolean>(false);

  const animationConfig = useMemo(
    () => ({
      ...DEFAULT_OVERLAY_ANIMATION_CONFIG,
      ...config,
      contentScaleDamping: config?.modalScaleDamping ?? config?.contentScaleDamping ?? DEFAULT_OVERLAY_ANIMATION_CONFIG.contentScaleDamping,
    }),
    [
      config?.overlayFadeDuration,
      config?.contentScaleDamping,
      config?.modalScaleDamping,
      config?.contentScaleStiffness,
      config?.contentFadeDuration,
      config?.initialScale,
    ],
  );

  useEffect(() => {
    if (!isReanimatedReady) {
      return;
    }

    if (visible === previousVisibleRef.current) {
      return;
    }

    previousVisibleRef.current = visible;

    if (visible) {
      overlayTiming.opacity.value = 0;
      contentTiming.opacity.value = 0;
      spring.scale.value = animationConfig.initialScale;

      overlayTiming.fadeIn({ duration: animationConfig.overlayFadeDuration });
      contentTiming.fadeIn({ duration: animationConfig.contentFadeDuration });
      spring.scaleIn({
        damping: animationConfig.contentScaleDamping,
        stiffness: animationConfig.contentScaleStiffness,
      });
    } else {
      overlayTiming.fadeOut({ duration: animationConfig.overlayFadeDuration });
      contentTiming.fadeOut({ duration: animationConfig.contentFadeDuration });
      spring.scaleOut({
        damping: animationConfig.contentScaleDamping,
        stiffness: animationConfig.contentScaleStiffness,
      });
    }
  }, [visible, isReanimatedReady, animationConfig, overlayTiming, contentTiming, spring]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayTiming.opacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentTiming.opacity.value,
    transform: [{ scale: spring.scale.value }],
  }));

  return {
    isReady: isReanimatedReady,
    overlayStyle,
    contentStyle,
    modalStyle: contentStyle, // Alias for backward compatibility
  };
}

// Legacy export for backward compatibility
export const useModalAnimations = useOverlayAnimations;
export type ModalAnimationConfig = OverlayAnimationConfig;
export type UseModalAnimationsReturn = UseOverlayAnimationsReturn & {
  modalStyle: ReturnType<typeof useAnimatedStyle>;
};


