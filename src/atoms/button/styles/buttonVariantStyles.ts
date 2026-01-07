/**
 * Button Variant Styles
 */

import type { DesignTokens } from '../../../theme';
import type { ButtonVariant, ButtonVariantStyles } from '../types';

export const getVariantStyles = (
  variant: ButtonVariant,
  tokens: DesignTokens,
): ButtonVariantStyles => {
  const baseStyle = {
    backgroundColor: tokens.colors.primary,
    borderWidth: 0,
  };

  const baseTextStyle = {
    color: tokens.colors.textInverse,
  };

  switch (variant) {
    case 'primary':
      return {
        container: {
          ...baseStyle,
          backgroundColor: tokens.colors.primary,
        },
        text: {
          ...baseTextStyle,
          color: tokens.colors.textInverse,
        },
      };

    case 'secondary':
      return {
        container: {
          ...baseStyle,
          backgroundColor: tokens.colors.surfaceSecondary,
        },
        text: {
          ...baseTextStyle,
          color: tokens.colors.textPrimary,
        },
      };

    case 'outline':
      return {
        container: {
          backgroundColor: undefined,
          borderWidth: 1,
          borderColor: tokens.colors.border,
        },
        text: {
          ...baseTextStyle,
          color: tokens.colors.textPrimary,
        },
      };

    case 'text':
      return {
        container: {
          backgroundColor: undefined,
        },
        text: {
          ...baseTextStyle,
          color: tokens.colors.primary,
        },
      };

    case 'danger':
      return {
        container: {
          ...baseStyle,
          backgroundColor: tokens.colors.error,
        },
        text: {
          ...baseTextStyle,
          color: tokens.colors.textInverse,
        },
      };

    default:
      return {
        container: baseStyle,
        text: baseTextStyle,
      };
  }
};
