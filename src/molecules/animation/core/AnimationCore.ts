/**
 * Animation Core Exports
 * 
 * Re-exports react-native-reanimated for centralized usage.
 * All packages should use this instead of importing directly.
 */

export {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    withSequence,
    withRepeat,
    runOnJS,
    cancelAnimation,
    Easing,
} from 'react-native-reanimated';

// Re-export Animated namespace
import Animated from 'react-native-reanimated';
export { Animated };

// Re-export types
export type {
    SharedValue,
    WithTimingConfig,
    WithSpringConfig,
} from 'react-native-reanimated';
