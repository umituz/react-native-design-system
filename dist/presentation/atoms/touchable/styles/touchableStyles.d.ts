import { ViewStyle } from 'react-native';
import { FeedbackStrength } from '../types';
/**
 * Get opacity value based on feedback strength
 */
export declare const getOpacityValue: (strength: FeedbackStrength) => number;
/**
 * Get base touchable container style
 * Ensures minimum touch target size (iOS HIG: 48x48)
 */
export declare const getTouchableContainerStyle: () => ViewStyle;
/**
 * Get disabled touchable style
 */
export declare const getDisabledStyle: () => ViewStyle;
/**
 * Convert number to HitSlop object
 * If hitSlop is a number, apply it to all sides
 */
export declare const normalizeHitSlop: (hitSlop: number | {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
} | undefined) => {
    top: number;
    bottom: number;
    left: number;
    right: number;
} | undefined;
