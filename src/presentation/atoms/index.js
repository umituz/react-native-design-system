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
// STEP 1: Import all components first (required for default export)
import { AtomicButton, } from './AtomicButton';
import { AtomicText, } from './AtomicText';
import { AtomicCard, } from './AtomicCard';
import { AtomicInput, } from './AtomicInput';
import { AtomicIcon, } from './AtomicIcon';
import { AtomicImage, } from './AtomicImage';
import { AtomicSwitch, } from './AtomicSwitch';
import { AtomicBadge, } from './AtomicBadge';
import { AtomicFormError, } from './AtomicFormError';
import { AtomicAvatar, } from './AtomicAvatar';
import { AtomicChip, } from './AtomicChip';
import { AtomicDivider, } from './AtomicDivider';
import { AtomicProgress, } from './AtomicProgress';
import { AtomicAvatarGroup, } from './AtomicAvatarGroup';
import { AtomicFab, getFabVariants, } from './AtomicFab';
import { AtomicFilter, getFilterContainerStyle, getClearAllContainerStyle, getScrollContentContainerStyle, } from './AtomicFilter';
import { AtomicTouchable, TouchablePresets, getOpacityValue, normalizeHitSlop, } from './AtomicTouchable';
// STEP 2: Re-export all components (for named imports)
export { AtomicButton, };
// Helper types extracted from ButtonVariantConfig
export { AtomicText, };
export { AtomicCard, };
export { AtomicInput, };
export { AtomicIcon, };
export { AtomicImage, };
export { AtomicSwitch, };
export { AtomicBadge, };
export { AtomicFormError, };
export { AtomicAvatar, };
export { AtomicChip, };
export { AtomicDivider, };
export { AtomicProgress, };
export { AtomicAvatarGroup, };
export { AtomicFab, getFabVariants, };
export { AtomicFilter, getFilterContainerStyle, getClearAllContainerStyle, getScrollContentContainerStyle, };
export { AtomicTouchable, TouchablePresets, getOpacityValue, normalizeHitSlop, };
/**
 * Atomic component utilities
 */
export const AtomicUtils = {
    /**
     * Get recommended component combinations for common UI patterns
     */
    getRecommendedCombinations: () => ({
        // Card with header
        cardWithHeader: {
            card: { variant: 'elevated', padding: 'lg' },
            title: { variant: 'titleLarge', color: 'primary' },
            description: { variant: 'bodyMedium', color: 'secondary' },
        },
        // Form field
        formField: {
            input: { variant: 'outlined', size: 'md' },
            label: { variant: 'labelMedium', color: 'primary' },
            helper: { variant: 'bodySmall', color: 'secondary' },
        },
        // Action button
        primaryAction: {
            button: { variant: 'primary', size: 'lg' },
            text: { variant: 'labelLarge', color: 'onPrimary' },
            icon: { size: 'md', color: 'onPrimary' },
        },
        // Secondary action
        secondaryAction: {
            button: { variant: 'outline', size: 'md' },
            text: { variant: 'labelMedium', color: 'primary' },
            icon: { size: 'sm', color: 'primary' },
        },
    }),
    /**
     * Validate component prop combinations
     */
    validatePropCombination: (componentType, props) => {
        // Add validation logic here for prop combinations
        // This helps catch design system violations early
        return true;
    },
    /**
     * Get accessibility guidelines for component combinations
     */
    getAccessibilityGuidelines: () => ({
        button: {
            minimumTouchTarget: 48,
            requiresAccessibilityLabel: true,
            supportsAccessibilityHint: true,
        },
        input: {
            requiresLabel: true,
            supportsHelperText: true,
            requiresAccessibilityLabel: true,
        },
        card: {
            supportsAccessibilityRole: true,
            canBeAccessibilityContainer: true,
        },
        text: {
            supportsAccessibilityLabel: true,
            respectsSystemTextSize: true,
        },
        icon: {
            requiresAccessibilityLabel: true,
            supportsAccessibilityHint: false,
        },
    }),
};
// STEP 3: Default export (now all components are available in scope)
const defaultExport = {
    AtomicButton,
    AtomicText,
    AtomicCard,
    AtomicInput,
    AtomicIcon,
    AtomicImage,
    AtomicSwitch,
    AtomicBadge,
    AtomicFormError,
    AtomicAvatar,
    AtomicChip,
    AtomicDivider,
    AtomicProgress,
    AtomicAvatarGroup,
    AtomicFab,
    AtomicFilter,
    AtomicTouchable,
    AtomicUtils,
};
export default defaultExport;
