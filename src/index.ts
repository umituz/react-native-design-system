/**
 * @umituz/react-native-design-system
 * 
 * Universal design system for React Native apps
 * Re-exports from individual packages for convenience
 */

// =============================================================================
// COMMON STYLES - Re-export from @umituz/react-native-design-system-theme
// =============================================================================
export {
  useCommonStyles,
} from '@umituz/react-native-design-system-theme';

// =============================================================================
// VARIANTS UTILITIES - Own utilities
// =============================================================================
export {
  createVariants,
  type VariantConfig,
  type VariantProps,
} from './presentation/utils/variants/core';

export {
  createAdvancedVariants,
  type AdvancedVariantConfig,
  type CompoundVariant,
} from './presentation/utils/variants/compound';

export {
  conditionalStyle,
  responsiveStyle,
  combineStyles,
} from './presentation/utils/variants/helpers';

// =============================================================================
// ATOMS - Re-export from @umituz/react-native-design-system-atoms
// =============================================================================
export {
  AtomicText,
  AtomicIcon,
  AtomicButton,
  AtomicInput,
  type IconName,
} from '@umituz/react-native-design-system-atoms';

// Alias for backward compatibility
export { AtomicIcon as Icon } from '@umituz/react-native-design-system-atoms';

// =============================================================================
// ORGANISMS - Re-export from @umituz/react-native-design-system-organisms
// =============================================================================
export {
  ScreenLayout,
} from '@umituz/react-native-design-system-organisms';

// =============================================================================
// THEME - Re-export from @umituz/react-native-design-system-theme
// =============================================================================
export {
  useAppDesignTokens,
  STATIC_TOKENS,
  type DesignTokens,
} from '@umituz/react-native-design-system-theme';
