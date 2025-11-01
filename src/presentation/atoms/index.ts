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
import {
  AtomicButton,
  type AtomicButtonProps,
} from './AtomicButton';

import {
  AtomicText,
  type AtomicTextProps,
} from './AtomicText';

import {
  AtomicCard,
  type AtomicCardProps,
  type AtomicCardVariant,
  type AtomicCardPadding,
} from './AtomicCard';

import {
  AtomicInput,
  type AtomicInputProps,
  type AtomicInputVariant,
  type AtomicInputState,
  type AtomicInputSize,
} from './AtomicInput';

import {
  AtomicIcon,
  type AtomicIconProps,
  type AtomicIconSize,
  type AtomicIconColor,
} from './AtomicIcon';

import {
  AtomicImage,
  type AtomicImageProps,
} from './AtomicImage';

import {
  AtomicSwitch,
  type AtomicSwitchProps,
} from './AtomicSwitch';

import {
  AtomicBadge,
  type AtomicBadgeProps,
} from './AtomicBadge';

import {
  AtomicFormError,
  type AtomicFormErrorProps,
} from './AtomicFormError';

import {
  AtomicAvatar,
  type AtomicAvatarProps,
} from './AtomicAvatar';

import {
  AtomicChip,
  type AtomicChipProps,
} from './AtomicChip';

import {
  AtomicDivider,
  type AtomicDividerProps,
} from './AtomicDivider';

import {
  AtomicSkeleton,
  type AtomicSkeletonProps,
} from './AtomicSkeleton';

import {
  AtomicProgress,
  type AtomicProgressProps,
} from './AtomicProgress';

import {
  AtomicAvatarGroup,
  type AtomicAvatarGroupProps,
  type AvatarData,
} from './AtomicAvatarGroup';

import {
  AtomicFab,
  type AtomicFabProps,
  type FabSize,
  type FabVariant,
  getFabVariants,
} from './AtomicFab';

import {
  AtomicFilter,
  type AtomicFilterProps,
  type FilterOption,
  getFilterContainerStyle,
  getClearAllContainerStyle,
  getScrollContentContainerStyle,
} from './AtomicFilter';

import {
  AtomicTouchable,
  type AtomicTouchableProps,
  type TouchableFeedback,
  type FeedbackStrength,
  type HitSlop,
  TouchablePresets,
  getOpacityValue,
  normalizeHitSlop,
} from './AtomicTouchable';

// STEP 2: Re-export all components (for named imports)
export {
  AtomicButton,
  type AtomicButtonProps,
};

// Helper types extracted from ButtonVariantConfig

export {
  AtomicText,
  type AtomicTextProps,
};

export {
  AtomicCard,
  type AtomicCardProps,
  type AtomicCardVariant,
  type AtomicCardPadding,
};

export {
  AtomicInput,
  type AtomicInputProps,
  type AtomicInputVariant,
  type AtomicInputState,
  type AtomicInputSize,
};

export {
  AtomicIcon,
  type AtomicIconProps,
  type AtomicIconSize,
  type AtomicIconColor,
};

export {
  AtomicImage,
  type AtomicImageProps,
};

export {
  AtomicSwitch,
  type AtomicSwitchProps,
};

export {
  AtomicBadge,
  type AtomicBadgeProps,
};

export {
  AtomicFormError,
  type AtomicFormErrorProps,
};

export {
  AtomicAvatar,
  type AtomicAvatarProps,
};

export {
  AtomicChip,
  type AtomicChipProps,
};

export {
  AtomicDivider,
  type AtomicDividerProps,
};

export {
  AtomicSkeleton,
  type AtomicSkeletonProps,
};

export {
  AtomicProgress,
  type AtomicProgressProps,
};

export {
  AtomicAvatarGroup,
  type AtomicAvatarGroupProps,
  type AvatarData,
};

export {
  AtomicFab,
  type AtomicFabProps,
  type FabSize,
  type FabVariant,
  getFabVariants,
};

export {
  AtomicFilter,
  type AtomicFilterProps,
  type FilterOption,
  getFilterContainerStyle,
  getClearAllContainerStyle,
  getScrollContentContainerStyle,
};

export {
  AtomicTouchable,
  type AtomicTouchableProps,
  type TouchableFeedback,
  type FeedbackStrength,
  type HitSlop,
  TouchablePresets,
  getOpacityValue,
  normalizeHitSlop,
};

/**
 * Convenience re-exports for common patterns
 */

// All atomic component types
export type AtomicComponentProps =
  | AtomicButtonProps
  | AtomicTextProps
  | AtomicCardProps
  | AtomicInputProps
  | AtomicIconProps
  | AtomicImageProps
  | AtomicSwitchProps
  | AtomicBadgeProps
  | AtomicFormErrorProps
  | AtomicAvatarProps
  | AtomicChipProps
  | AtomicDividerProps
  | AtomicSkeletonProps
  | AtomicProgressProps
  | AtomicAvatarGroupProps
  | AtomicFabProps
  | AtomicFilterProps
  | AtomicTouchableProps;

// All variant types for theme consistency
export type AtomicVariants = {
  card: AtomicCardVariant;
  input: AtomicInputVariant;
  icon: AtomicIconSize;
};

// All color types for design system consistency
export type AtomicColors = AtomicIconColor;

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
      card: { variant: 'elevated' as const, padding: 'lg' as const },
      title: { variant: 'titleLarge' as const, color: 'primary' as const },
      description: { variant: 'bodyMedium' as const, color: 'secondary' as const },
    },

    // Form field
    formField: {
      input: { variant: 'outlined' as const, size: 'md' as const },
      label: { variant: 'labelMedium' as const, color: 'primary' as const },
      helper: { variant: 'bodySmall' as const, color: 'secondary' as const },
    },

    // Action button
    primaryAction: {
      button: { variant: 'primary' as const, size: 'lg' as const },
      text: { variant: 'labelLarge' as const, color: 'onPrimary' as const },
      icon: { size: 'md' as const, color: 'onPrimary' as const },
    },

    // Secondary action
    secondaryAction: {
      button: { variant: 'outline' as const, size: 'md' as const },
      text: { variant: 'labelMedium' as const, color: 'primary' as const },
      icon: { size: 'sm' as const, color: 'primary' as const },
    },
  }),

  /**
   * Validate component prop combinations
   */
  validatePropCombination: (componentType: keyof AtomicVariants, props: any): boolean => {
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
  AtomicSkeleton,
  AtomicProgress,
  AtomicAvatarGroup,
  AtomicFab,
  AtomicFilter,
  AtomicTouchable,
  AtomicUtils,
};

export default defaultExport;