/**
 * Alert Toast Helper Functions
 * Style and color helpers for alert toast component
 */

import { AlertType } from '../AlertTypes';
import type { DesignTokens } from '../../../theme';
import type { StyleProp, ViewStyle } from 'react-native';

/**
 * Gets background color for alert type
 *
 * @param type - Alert type
 * @param tokens - Design tokens
 * @returns Background color string
 */
export function getAlertBackgroundColor(type: AlertType, tokens: DesignTokens): string {
  const colors = {
    [AlertType.SUCCESS]: tokens.colors.success,
    [AlertType.ERROR]: tokens.colors.error,
    [AlertType.WARNING]: tokens.colors.warning,
    [AlertType.INFO]: tokens.colors.info,
  };
  return colors[type] || tokens.colors.backgroundSecondary;
}

/**
 * Gets action button style
 *
 * @param style - Button style type
 * @param tokens - Design tokens
 * @returns Style object
 */
export function getActionButtonStyle(
  style: 'primary' | 'secondary' | 'destructive' | undefined,
  tokens: DesignTokens
): StyleProp<ViewStyle> {
  if (style === 'secondary') {
    return {
      backgroundColor: undefined,
      borderWidth: 1,
      borderColor: tokens.colors.textInverse,
    };
  }

  const colors = {
    primary: tokens.colors.backgroundPrimary,
    destructive: tokens.colors.error,
  };
  return { backgroundColor: colors[style as keyof typeof colors] || tokens.colors.backgroundSecondary };
}

/**
 * Gets action text color
 *
 * @param style - Button style type
 * @param tokens - Design tokens
 * @returns Text color string
 */
export function getActionTextColor(
  style: 'primary' | 'secondary' | 'destructive' | undefined,
  tokens: DesignTokens
): string {
  return style === 'primary' ? tokens.colors.textPrimary : tokens.colors.textInverse;
}

/**
 * Default toast duration in milliseconds
 */
export const DEFAULT_TOAST_DURATION = 3000;
