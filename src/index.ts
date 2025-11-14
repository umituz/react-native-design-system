/**
 * @umituz/react-native-design-system
 * 
 * ⚠️ DEPRECATED: This package is deprecated. 
 * Please import directly from individual packages:
 * - @umituz/react-native-design-system-atoms
 * - @umituz/react-native-design-system-molecules  
 * - @umituz/react-native-design-system-organisms
 * - @umituz/react-native-design-system-theme
 * - @umituz/react-native-design-system-responsive
 * - @umituz/react-native-design-system-typography
 * 
 * This package only exports its own utilities:
 * - useCommonStyles
 * - variants utilities
 */

// =============================================================================
// COMMON STYLES - Own utility
// =============================================================================
export {
  useCommonStyles,
} from './presentation/tokens/commonStyles';

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
  combineStyles,
} from './presentation/utils/variants/helpers';

export {
  conditionalStyle,
  responsiveStyle,
  combineStyles,
} from './presentation/utils/variants/helpers';
