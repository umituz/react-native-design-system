/**
 * @umituz/react-native-design-system
 * 
 * Design System Aggregator Package
 * 
 * This package aggregates exports from individual design system packages:
 * - @umituz/react-native-design-system-atoms
 * - @umituz/react-native-design-system-molecules  
 * - @umituz/react-native-design-system-organisms
 * - @umituz/react-native-design-system-theme
 * - @umituz/react-native-design-system-responsive
 * - @umituz/react-native-design-system-typography
 * 
 * This package also exports its own utilities:
 * - variants utilities
 */

// =============================================================================
// ATOMS - Re-export from atoms package
// =============================================================================
export * from '@umituz/react-native-design-system-atoms';

// =============================================================================
// MOLECULES - Re-export from molecules package
// =============================================================================
export * from '@umituz/react-native-design-system-molecules';

// =============================================================================
// ORGANISMS - Re-export from organisms package
// =============================================================================
export * from '@umituz/react-native-design-system-organisms';

// =============================================================================
// THEME - Re-export from theme package
// =============================================================================
export * from '@umituz/react-native-design-system-theme';

// =============================================================================
// RESPONSIVE - Re-export from responsive package
// =============================================================================
export * from '@umituz/react-native-design-system-responsive';

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
