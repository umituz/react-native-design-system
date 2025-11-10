import React from 'react';
import { AtomicTouchableProps, TouchableFeedback, FeedbackStrength } from './touchable/types';
export type { AtomicTouchableProps, TouchableFeedback, FeedbackStrength, HitSlop, } from './touchable/types';
export { getOpacityValue, getTouchableContainerStyle, getDisabledStyle, normalizeHitSlop, } from './touchable/styles/touchableStyles';
/**
 * AtomicTouchable - Unified Touchable Component
 *
 * A modern, accessible touchable wrapper using React Native's Pressable API.
 * Provides consistent behavior across iOS, Android, and Web.
 *
 * Features:
 * - Multiple feedback variants (opacity, highlight, ripple, none)
 * - Configurable feedback strength (subtle, normal, strong)
 * - Disabled state with visual feedback
 * - Hit slop customization for small touch targets
 * - Minimum 48x48 touch target (iOS HIG compliance)
 * - Full accessibility support
 * - Theme-aware ripple colors
 *
 * @example
 * ```tsx
 * // Basic usage with opacity feedback
 * <AtomicTouchable onPress={handlePress}>
 *   <AtomicText>Press Me</AtomicText>
 * </AtomicTouchable>
 *
 * // With custom hit slop (extends touch area)
 * <AtomicTouchable
 *   onPress={handlePress}
 *   hitSlop={8}
 *   feedback="ripple"
 * >
 *   <AtomicIcon name="X" size="sm" />
 * </AtomicTouchable>
 * ```
 */
export declare const AtomicTouchable: React.FC<AtomicTouchableProps>;
/**
 * Preset touchable configurations for common use cases
 */
export declare const TouchablePresets: {
    /**
     * iOS-style opacity feedback (default)
     */
    ios: {
        feedback: TouchableFeedback;
        strength: FeedbackStrength;
    };
    /**
     * Android-style ripple feedback
     */
    android: {
        feedback: TouchableFeedback;
        strength: FeedbackStrength;
    };
    /**
     * Subtle feedback for secondary actions
     */
    subtle: {
        feedback: TouchableFeedback;
        strength: FeedbackStrength;
    };
    /**
     * Strong feedback for primary actions
     */
    strong: {
        feedback: TouchableFeedback;
        strength: FeedbackStrength;
    };
    /**
     * No visual feedback (use sparingly)
     */
    none: {
        feedback: TouchableFeedback;
    };
};
