/**
 * React Native Animation - Barrel Export
 *
 * Universal animation system for React Native with react-native-reanimated.
 * Provides declarative animations, gesture handling, and preset configurations.
 *
 * Features:
 * - Declarative animations (fade, slide, scale, bounce, shake)
 * - Spring physics animations
 * - Gesture handling (tap, pan, pinch, long press)
 * - Preset animation configs
 * - TypeScript type safety
 *
 * Usage:
 *
 * Animation Example:
 * ```typescript
 * import { useAnimation, Animated } from '@umituz/react-native-animation';
 *
 * const MyComponent = () => {
 *   const { fadeIn, animatedStyle } = useAnimation();
 *
 *   useEffect(() => {
 *     fadeIn();
 *   }, []);
 *
 *   return <Animated.View style={animatedStyle}>...</Animated.View>;
 * };
 * ```
 *
 * Gesture Example:
 * ```typescript
 * import { useGesture, Animated } from '@umituz/react-native-animation';
 *
 * const MyComponent = () => {
 *   const { createPanGesture, animatedStyle, GestureDetector } = useGesture();
 *
 *   const panGesture = createPanGesture({
 *     onEnd: (x, y) => console.log('Dragged to:', x, y),
 *   });
 *
 *   return (
 *     <GestureDetector gesture={panGesture}>
 *       <Animated.View style={animatedStyle}>...</Animated.View>
 *     </GestureDetector>
 *   );
 * };
 * ```
 *
 * Technical:
 * - Uses react-native-reanimated v3 for animations
 * - Uses react-native-gesture-handler for gestures
 * - Zero backend dependencies
 */

// =============================================================================
// CORE LAYER - Animation Primitives
// =============================================================================

export {
  Animated,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withRepeat,
  runOnJS,
  cancelAnimation,
  Easing,
} from './core/AnimationCore';

export type {
  SharedValue,
  WithTimingConfig,
  WithSpringConfig,
} from './core/AnimationCore';

// =============================================================================
// DOMAIN LAYER - Entities
// =============================================================================

export {
  AnimationPreset,
  GestureType,
  AnimationEasing,
  ANIMATION_CONSTANTS,
} from './domain/entities/Animation';
export type {
  AnimationTimingConfig,
  AnimationSpringConfig,
} from './domain/entities/Animation';

// Infrastructure Layer - Services
export { AnimationConfigService } from './infrastructure/services/AnimationConfigService';
export { TimingAnimationConfigService } from './infrastructure/services/TimingAnimationConfigService';
export { SpringAnimationConfigService } from './infrastructure/services/SpringAnimationConfigService';

// Presentation Layer - Hooks
export { useAnimation } from './presentation/hooks/useAnimation';
export {
  useGesture,
  type TapGestureOptions,
  type PanGestureOptions,
  type PinchGestureOptions,
} from './presentation/hooks/useGesture';
export { useReanimatedReady } from './presentation/hooks/useReanimatedReady';
export { useFireworks } from './presentation/hooks/useFireworks';
export {
  useOverlayAnimations,
  useModalAnimations, // Legacy
  type OverlayAnimationConfig,
  type UseOverlayAnimationsReturn,
  type ModalAnimationConfig, // Legacy
  type UseModalAnimationsReturn, // Legacy
} from './presentation/hooks/useModalAnimations';
export {
  useElementAnimations,
  useIconAnimations, // Legacy
  type ElementAnimationConfig,
  type UseElementAnimationsReturn,
  type IconAnimationConfig, // Legacy
  type UseIconAnimationsReturn, // Legacy
} from './presentation/hooks/useIconAnimations';

// Presentation Layer - Components
export { Fireworks } from './presentation/components/Fireworks';
export type { FireworksProps } from './presentation/components/Fireworks';

// Domain Layer - Fireworks
export type {
  ParticleConfig,
  FireworksConfig,
} from './domain/entities/Fireworks';
export { FIREWORKS_CONSTANTS } from './domain/entities/Fireworks';

// Domain Layer - Theme
export type {
  AnimationTheme,
  ThemeContext,
} from './domain/entities/Theme';
export { DEFAULT_ANIMATION_THEME } from './domain/entities/Theme';

// Presentation Layer - Providers
export { AnimationThemeProvider, useAnimationTheme } from './presentation/providers/AnimationThemeProvider';

