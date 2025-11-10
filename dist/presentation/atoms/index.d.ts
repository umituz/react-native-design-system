/**
 * Atomic Components Export Index
 *
 * Centralized export file for all atomic design components
 * Following atomic design principles with React Native implementation
 *
 * Generated for {{APP_NAME}} - {{CATEGORY}} category
 * Theme: {{THEME_NAME}}
 *
 * Usage:
 * ```typescript
 * import { AtomicButton, AtomicText, AtomicCard } from '@domains/design-system';
 *
 * // Or individual imports
 * import { AtomicButton } from '@domains/design-system';
 * ```
 */
import { AtomicButton, type AtomicButtonProps } from './AtomicButton';
import { AtomicText, type AtomicTextProps } from './AtomicText';
import { AtomicCard, type AtomicCardProps, type AtomicCardVariant, type AtomicCardPadding } from './AtomicCard';
import { AtomicInput, type AtomicInputProps, type AtomicInputVariant, type AtomicInputState, type AtomicInputSize } from './AtomicInput';
import { AtomicIcon, type AtomicIconProps, type AtomicIconSize, type AtomicIconColor } from './AtomicIcon';
import { AtomicImage, type AtomicImageProps } from './AtomicImage';
import { AtomicSwitch, type AtomicSwitchProps } from './AtomicSwitch';
import { AtomicBadge, type AtomicBadgeProps } from './AtomicBadge';
import { AtomicFormError, type AtomicFormErrorProps } from './AtomicFormError';
import { AtomicAvatar, type AtomicAvatarProps } from './AtomicAvatar';
import { AtomicChip, type AtomicChipProps } from './AtomicChip';
import { AtomicDivider, type AtomicDividerProps } from './AtomicDivider';
import { AtomicProgress, type AtomicProgressProps } from './AtomicProgress';
import { AtomicAvatarGroup, type AtomicAvatarGroupProps, type AvatarData } from './AtomicAvatarGroup';
import { AtomicFab, type AtomicFabProps, type FabSize, type FabVariant, getFabVariants } from './AtomicFab';
import { AtomicFilter, type AtomicFilterProps, type FilterOption, getFilterContainerStyle, getClearAllContainerStyle, getScrollContentContainerStyle } from './AtomicFilter';
import { AtomicTouchable, type AtomicTouchableProps, type TouchableFeedback, type FeedbackStrength, type HitSlop, TouchablePresets, getOpacityValue, normalizeHitSlop } from './AtomicTouchable';
export { AtomicButton, type AtomicButtonProps, };
export { AtomicText, type AtomicTextProps, };
export { AtomicCard, type AtomicCardProps, type AtomicCardVariant, type AtomicCardPadding, };
export { AtomicInput, type AtomicInputProps, type AtomicInputVariant, type AtomicInputState, type AtomicInputSize, };
export { AtomicIcon, type AtomicIconProps, type AtomicIconSize, type AtomicIconColor, };
export { AtomicImage, type AtomicImageProps, };
export { AtomicSwitch, type AtomicSwitchProps, };
export { AtomicBadge, type AtomicBadgeProps, };
export { AtomicFormError, type AtomicFormErrorProps, };
export { AtomicAvatar, type AtomicAvatarProps, };
export { AtomicChip, type AtomicChipProps, };
export { AtomicDivider, type AtomicDividerProps, };
export { AtomicProgress, type AtomicProgressProps, };
export { AtomicAvatarGroup, type AtomicAvatarGroupProps, type AvatarData, };
export { AtomicFab, type AtomicFabProps, type FabSize, type FabVariant, getFabVariants, };
export { AtomicFilter, type AtomicFilterProps, type FilterOption, getFilterContainerStyle, getClearAllContainerStyle, getScrollContentContainerStyle, };
export { AtomicTouchable, type AtomicTouchableProps, type TouchableFeedback, type FeedbackStrength, type HitSlop, TouchablePresets, getOpacityValue, normalizeHitSlop, };
/**
 * Convenience re-exports for common patterns
 */
export type AtomicComponentProps = AtomicButtonProps | AtomicTextProps | AtomicCardProps | AtomicInputProps | AtomicIconProps | AtomicImageProps | AtomicSwitchProps | AtomicBadgeProps | AtomicFormErrorProps | AtomicAvatarProps | AtomicChipProps | AtomicDividerProps | AtomicProgressProps | AtomicAvatarGroupProps | AtomicFabProps | AtomicFilterProps | AtomicTouchableProps;
export type AtomicVariants = {
    card: AtomicCardVariant;
    input: AtomicInputVariant;
    icon: AtomicIconSize;
};
export type AtomicColors = AtomicIconColor;
/**
 * Atomic component utilities
 */
export declare const AtomicUtils: {
    /**
     * Get recommended component combinations for common UI patterns
     */
    getRecommendedCombinations: () => {
        cardWithHeader: {
            card: {
                variant: "elevated";
                padding: "lg";
            };
            title: {
                variant: "titleLarge";
                color: "primary";
            };
            description: {
                variant: "bodyMedium";
                color: "secondary";
            };
        };
        formField: {
            input: {
                variant: "outlined";
                size: "md";
            };
            label: {
                variant: "labelMedium";
                color: "primary";
            };
            helper: {
                variant: "bodySmall";
                color: "secondary";
            };
        };
        primaryAction: {
            button: {
                variant: "primary";
                size: "lg";
            };
            text: {
                variant: "labelLarge";
                color: "onPrimary";
            };
            icon: {
                size: "md";
                color: "onPrimary";
            };
        };
        secondaryAction: {
            button: {
                variant: "outline";
                size: "md";
            };
            text: {
                variant: "labelMedium";
                color: "primary";
            };
            icon: {
                size: "sm";
                color: "primary";
            };
        };
    };
    /**
     * Validate component prop combinations
     */
    validatePropCombination: (componentType: keyof AtomicVariants, props: any) => boolean;
    /**
     * Get accessibility guidelines for component combinations
     */
    getAccessibilityGuidelines: () => {
        button: {
            minimumTouchTarget: number;
            requiresAccessibilityLabel: boolean;
            supportsAccessibilityHint: boolean;
        };
        input: {
            requiresLabel: boolean;
            supportsHelperText: boolean;
            requiresAccessibilityLabel: boolean;
        };
        card: {
            supportsAccessibilityRole: boolean;
            canBeAccessibilityContainer: boolean;
        };
        text: {
            supportsAccessibilityLabel: boolean;
            respectsSystemTextSize: boolean;
        };
        icon: {
            requiresAccessibilityLabel: boolean;
            supportsAccessibilityHint: boolean;
        };
    };
};
declare const defaultExport: {
    AtomicButton: React.FC<AtomicButtonProps>;
    AtomicText: React.FC<AtomicTextProps>;
    AtomicCard: React.FC<AtomicCardProps>;
    AtomicInput: React.FC<AtomicInputProps>;
    AtomicIcon: React.FC<import("@umituz/react-native-icon").IconProps>;
    AtomicImage: React.FC<AtomicImageProps>;
    AtomicSwitch: React.FC<AtomicSwitchProps>;
    AtomicBadge: React.FC<AtomicBadgeProps>;
    AtomicFormError: React.FC<AtomicFormErrorProps>;
    AtomicAvatar: React.FC<AtomicAvatarProps>;
    AtomicChip: React.FC<AtomicChipProps>;
    AtomicDivider: React.FC<AtomicDividerProps>;
    AtomicProgress: React.FC<AtomicProgressProps>;
    AtomicAvatarGroup: React.FC<AtomicAvatarGroupProps>;
    AtomicFab: React.FC<AtomicFabProps>;
    AtomicFilter: React.FC<AtomicFilterProps>;
    AtomicTouchable: React.FC<AtomicTouchableProps>;
    AtomicUtils: {
        /**
         * Get recommended component combinations for common UI patterns
         */
        getRecommendedCombinations: () => {
            cardWithHeader: {
                card: {
                    variant: "elevated";
                    padding: "lg";
                };
                title: {
                    variant: "titleLarge";
                    color: "primary";
                };
                description: {
                    variant: "bodyMedium";
                    color: "secondary";
                };
            };
            formField: {
                input: {
                    variant: "outlined";
                    size: "md";
                };
                label: {
                    variant: "labelMedium";
                    color: "primary";
                };
                helper: {
                    variant: "bodySmall";
                    color: "secondary";
                };
            };
            primaryAction: {
                button: {
                    variant: "primary";
                    size: "lg";
                };
                text: {
                    variant: "labelLarge";
                    color: "onPrimary";
                };
                icon: {
                    size: "md";
                    color: "onPrimary";
                };
            };
            secondaryAction: {
                button: {
                    variant: "outline";
                    size: "md";
                };
                text: {
                    variant: "labelMedium";
                    color: "primary";
                };
                icon: {
                    size: "sm";
                    color: "primary";
                };
            };
        };
        /**
         * Validate component prop combinations
         */
        validatePropCombination: (componentType: keyof AtomicVariants, props: any) => boolean;
        /**
         * Get accessibility guidelines for component combinations
         */
        getAccessibilityGuidelines: () => {
            button: {
                minimumTouchTarget: number;
                requiresAccessibilityLabel: boolean;
                supportsAccessibilityHint: boolean;
            };
            input: {
                requiresLabel: boolean;
                supportsHelperText: boolean;
                requiresAccessibilityLabel: boolean;
            };
            card: {
                supportsAccessibilityRole: boolean;
                canBeAccessibilityContainer: boolean;
            };
            text: {
                supportsAccessibilityLabel: boolean;
                respectsSystemTextSize: boolean;
            };
            icon: {
                requiresAccessibilityLabel: boolean;
                supportsAccessibilityHint: boolean;
            };
        };
    };
};
export default defaultExport;
