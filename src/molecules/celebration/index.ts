/**
 * @umituz/react-native-celebration - Public API
 *
 * Celebration animations and effects for React Native applications.
 * Built on top of ../../../animation for consistent animations.
 *
 * Features:
 * - Celebration modals with fireworks
 * - Configurable animations
 * - Theme integration
 * - State management
 *
 * Usage:
 * ```typescript
 * import { useCelebrationState, CelebrationModal, Animated } from '@umituz/react-native-celebration';
 *
 * const MyCelebration = () => {
 *   const { visible, show, hide, config } = useCelebrationState();
 *
 *   return (
 *     <CelebrationModal
 *       visible={visible}
 *       config={config!}
 *       onClose={hide}
 *       themeColors={{ primary: '#007AFF', success: '#34C759' }}
 *     />
 *   );
 * };
 * ```
 */



// =============================================================================
// DOMAIN LAYER - Entities
// =============================================================================

export type {
  CelebrationConfig,
  CelebrationAction,
} from "./domain/entities/CelebrationConfig";

export type {
  ThemeColors,
  CelebrationFireworksConfig,
} from "./domain/entities/FireworksConfig";

export {
  DEFAULT_FIREWORKS_COLORS,
  DEFAULT_FIREWORKS_CONFIG,
} from "./domain/entities/FireworksConfig";

// =============================================================================
// INFRASTRUCTURE LAYER - Services
// =============================================================================

export { FireworksConfigService } from "./infrastructure/services/FireworksConfigService";



// =============================================================================
// PRESENTATION LAYER - Hooks
// =============================================================================

export { useCelebrationState } from "./presentation/hooks/useCelebrationState";
export type { UseCelebrationStateReturn } from "./presentation/hooks/useCelebrationState";

export { useCelebrationModalAnimation } from "./presentation/hooks/useCelebrationModalAnimation";
export type { UseCelebrationModalAnimationReturn } from "./presentation/hooks/useCelebrationModalAnimation";



// =============================================================================
// PRESENTATION LAYER - Components
// =============================================================================

export { CelebrationModal } from "./presentation/components/CelebrationModal";
export type { CelebrationModalProps } from "./presentation/components/CelebrationModal";

export { CelebrationModalContent } from "./presentation/components/CelebrationModalContent";
export type { CelebrationModalContentProps } from "./presentation/components/CelebrationModalContent";

export { CelebrationFireworksOverlay } from "./presentation/components/CelebrationFireworksOverlay";
export type { CelebrationFireworksOverlayProps } from "./presentation/components/CelebrationFireworksOverlay";

// =============================================================================
// PRESENTATION LAYER - Styles
// =============================================================================

export { createCelebrationModalStyles } from "./presentation/styles/CelebrationModalStyles";



