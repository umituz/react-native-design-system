/**
 * useResponsiveDesignTokens Hook
 *
 * ✅ Combines theme system + responsive utilities
 * ✅ Returns device-aware design tokens
 * ✅ Auto-updates on theme changes, orientation changes, screen resize
 * ✅ Drop-in replacement for useAppDesignTokens with responsive capabilities
 *
 * @module useResponsiveDesignTokens
 */

import { useMemo } from 'react';
import { useDesignSystemTheme } from '../infrastructure/globalThemeStore';
import { createResponsiveDesignTokens, type ResponsiveDesignTokens } from '../core/ResponsiveTokenFactory';
import { useResponsive } from '../../responsive/useResponsive';

/**
 * Hook for responsive design tokens
 *
 * Returns complete design tokens with automatic responsive scaling based on device type.
 * All spacing, typography, and border radius values automatically scale for tablets and large phones.
 *
 * @returns ResponsiveDesignTokens - Complete tokens with responsive spacing, typography, borders
 *
 * @example
 * ```typescript
 * import { useResponsiveDesignTokens } from '@umituz/react-native-design-system';
 *
 * const MyComponent = () => {
 *   const tokens = useResponsiveDesignTokens();
 *
 *   return (
 *     <View style={{
 *       padding: tokens.spacing.md,  // Auto-scales: 16px on phone, 19.2px on tablet
 *       borderRadius: tokens.borderRadius.lg,  // Auto-scales based on device
 *     }}>
 *       <Text style={{
 *         fontSize: tokens.typography.bodyLarge.responsiveFontSize,  // Responsive font
 *         color: tokens.colors.textPrimary,  // Theme-aware color
 *       }}>
 *         Hello World!
 *       </Text>
 *     </View>
 *   );
 * };
 * ```
 *
 * @example Using backward-compatible base tokens
 * ```typescript
 * const tokens = useResponsiveDesignTokens();
 *
 * // Use responsive tokens (recommended)
 * const padding = tokens.spacing.md;  // 16px * spacingMultiplier
 *
 * // Use original base tokens (backward compatibility)
 * const basePadding = tokens.baseSpacing.md;  // Always 16px
 * ```
 *
 * @example Manual responsive calculation
 * ```typescript
 * const tokens = useResponsiveDesignTokens();
 *
 * // Custom responsive value
 * const customPadding = 20 * tokens.spacingMultiplier;  // 20px * 1.2 = 24px on tablet
 * ```
 */
export const useResponsiveDesignTokens = (): ResponsiveDesignTokens => {
  // Get current theme mode and custom colors from theme store
  const { themeMode, customColors } = useDesignSystemTheme();

  // Get responsive utilities
  const { spacingMultiplier, getFontSize } = useResponsive();

  // Create and memoize responsive tokens
  // Recalculates when: theme changes, screen size changes, orientation changes
  const responsiveTokens = useMemo(
    () => createResponsiveDesignTokens(themeMode, spacingMultiplier, getFontSize, customColors),
    [themeMode, spacingMultiplier, getFontSize, customColors]
  );

  return responsiveTokens;
};
