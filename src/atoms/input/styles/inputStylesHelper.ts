/**
 * Input Styles Helper
 *
 * Helper functions for AtomicInput component styling.
 * Extracted from AtomicInput for better separation of concerns.
 */

import { ViewStyle } from 'react-native';
import { useAppDesignTokens } from '../../../theme';
import type { AtomicInputVariant, AtomicInputSize } from '../../AtomicInput';

interface GetVariantStyleParams {
  variant: AtomicInputVariant;
  isFocused: boolean;
  hasError: boolean;
  hasSuccess: boolean;
  isDisabled: boolean;
  tokens: ReturnType<typeof useAppDesignTokens>;
}

interface GetSizeConfigParams {
  size: AtomicInputSize;
  tokens: ReturnType<typeof useAppDesignTokens>;
}

export const getSizeConfig = ({ size, tokens }: GetSizeConfigParams) => {
  const sizeConfig = {
    sm: {
      paddingVertical: tokens.spacing.xs,
      paddingHorizontal: tokens.spacing.sm,
      fontSize: tokens.typography.bodySmall.fontSize,
      iconSize: 16,
      minHeight: 40,
    },
    md: {
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      fontSize: tokens.typography.bodyMedium.fontSize,
      iconSize: 20,
      minHeight: 48,
    },
    lg: {
      paddingVertical: tokens.spacing.md,
      paddingHorizontal: tokens.spacing.lg,
      fontSize: tokens.typography.bodyLarge.fontSize,
      iconSize: 24,
      minHeight: 56,
    },
  };

  return sizeConfig[size] ?? sizeConfig.md;
};

export const getVariantStyle = ({
  variant,
  isFocused,
  hasError,
  hasSuccess,
  isDisabled,
  tokens,
}: GetVariantStyleParams): ViewStyle => {
  const baseStyle: ViewStyle = {
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.borders.radius.md,
  };

  let borderColor = tokens.colors.border;
  if (isFocused) borderColor = tokens.colors.primary;
  if (hasError) borderColor = tokens.colors.error;
  if (hasSuccess) borderColor = tokens.colors.success;
  if (isDisabled) borderColor = tokens.colors.borderDisabled;

  switch (variant) {
    case 'outlined':
      return {
        ...baseStyle,
        borderWidth: isFocused ? 2 : 1,
        borderColor,
      };

    case 'filled':
      return {
        ...baseStyle,
        backgroundColor: tokens.colors.surfaceVariant,
        borderWidth: 0,
        borderBottomWidth: isFocused ? 2 : 1,
        borderBottomColor: borderColor,
      };

    case 'flat':
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: borderColor,
        borderRadius: 0,
      };

    default:
      return baseStyle;
  }
};

export const getTextColor = ({
  isDisabled,
  hasError,
  hasSuccess,
  tokens,
}: {
  isDisabled: boolean;
  hasError: boolean;
  hasSuccess: boolean;
  tokens: ReturnType<typeof useAppDesignTokens>;
}): string => {
  if (isDisabled) return tokens.colors.textDisabled;
  if (hasError) return tokens.colors.error;
  if (hasSuccess) return tokens.colors.success;
  return tokens.colors.onSurface;
};