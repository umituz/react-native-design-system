/**
 * useCelebrationModalAnimation Hook
 * Single Responsibility: Compose all celebration modal animations
 * Uses ../../../animation directly
 */

import {
  useModalAnimations,
  useIconAnimations,
  type ModalAnimationConfig,
  type IconAnimationConfig,
} from "../../../animation";

export interface UseCelebrationModalAnimationReturn {
  isReady: boolean;
  overlayStyle: ReturnType<typeof useModalAnimations>["overlayStyle"];
  modalStyle: ReturnType<typeof useModalAnimations>["modalStyle"];
  iconStyle: ReturnType<typeof useIconAnimations>["iconStyle"];
}

/**
 * Hook for managing all celebration modal animations
 */
export function useCelebrationModalAnimation(
  visible: boolean,
  animationConfig?: {
    modal?: ModalAnimationConfig;
    icon?: IconAnimationConfig;
  },
): UseCelebrationModalAnimationReturn {
  const { isReady, overlayStyle, modalStyle } = useModalAnimations(
    visible,
    animationConfig?.modal,
  );

  const { iconStyle } = useIconAnimations(
    visible,
    isReady,
    animationConfig?.icon,
  );

  return {
    isReady,
    overlayStyle,
    modalStyle,
    iconStyle,
  };
}

