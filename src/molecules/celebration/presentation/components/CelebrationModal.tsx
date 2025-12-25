/**
 * Celebration Modal Component
 * Displays celebration modal with animations using BaseModal
 */

import React from "react";
import { Animated } from "../../../animation";
import { BaseModal } from "../../../BaseModal";
import { useCelebrationModalAnimation } from "../hooks/useCelebrationModalAnimation";
import { FireworksConfigService } from "../../infrastructure/services/FireworksConfigService";
import { CelebrationModalContent } from "./CelebrationModalContent";
import { CelebrationFireworksOverlay } from "./CelebrationFireworksOverlay";
import type { CelebrationConfig } from "../../domain/entities/CelebrationConfig";
import type { ThemeColors } from "../../domain/entities/FireworksConfig";
import type {
  ModalAnimationConfig,
  IconAnimationConfig,
} from "../../../animation";

export interface CelebrationModalProps {
  visible: boolean;
  config: CelebrationConfig;
  onClose: () => void;
  themeColors?: ThemeColors;
  fireworksConfig?: Partial<import("../../../animation").FireworksConfig>;
  animationConfig?: {
    modal?: ModalAnimationConfig;
    icon?: IconAnimationConfig;
  };
  renderContent?: (props: {
    config: CelebrationConfig;
    onClose: () => void;
    iconStyle: ReturnType<typeof useCelebrationModalAnimation>["iconStyle"];
    modalStyle: ReturnType<typeof useCelebrationModalAnimation>["modalStyle"];
  }) => React.ReactNode;
}

// Access View through Animated namespace with type assertion for reanimated v3 compatibility
const AnimatedView = (Animated as unknown as { View: React.ComponentType<{ style?: unknown; children?: React.ReactNode }> }).View;

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  visible,
  config,
  onClose,
  themeColors,
  fireworksConfig,
  animationConfig,
  renderContent,
}) => {
  const { isReady, iconStyle, modalStyle } =
    useCelebrationModalAnimation(visible, animationConfig);

  const fireworks = FireworksConfigService.build(themeColors, fireworksConfig);

  return (
    <>
      <CelebrationFireworksOverlay visible={visible} config={fireworks} />

      <BaseModal
        visible={visible && isReady}
        onClose={onClose}
        dismissOnBackdrop={true}
        testID="celebration-modal"
      >
        <AnimatedView style={modalStyle}>
          {renderContent ? (
            renderContent({ config, onClose, iconStyle, modalStyle })
          ) : themeColors ? (
            <CelebrationModalContent
              config={config}
              onClose={onClose}
              themeColors={themeColors}
              iconStyle={iconStyle}
              modalStyle={modalStyle}
            />
          ) : null}
        </AnimatedView>
      </BaseModal>
    </>
  );
};
