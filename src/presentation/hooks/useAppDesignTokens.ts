/**
 * useAppDesignTokens Hook - Theme-Aware Design Tokens
 *
 * ✅ Accepts optional themeMode parameter
 * ✅ Returns tokens for specified theme (light/dark)
 * ✅ Apps control theme, package provides tokens
 * ✅ Single source of truth
 *
 * @param themeMode - Optional theme mode ('light' | 'dark'), defaults to 'light'
 *
 * @example Basic usage (light theme)
 * ```typescript
 * import { useAppDesignTokens } from '@umituz/react-native-design-system';
 *
 * const MyComponent = () => {
 *   const tokens = useAppDesignTokens(); // Uses light theme by default
 *   return (
 *     <View style={{
 *       backgroundColor: tokens.colors.primary,
 *       padding: tokens.spacing.md
 *     }}>
 *       <Text style={tokens.typography.bodyLarge}>Hello!</Text>
 *     </View>
 *   );
 * };
 * ```
 *
 * @example Theme-aware usage
 * ```typescript
 * import { useAppDesignTokens } from '@umituz/react-native-design-system';
 * import { useTheme } from '@domains/theme';
 *
 * const MyComponent = () => {
 *   const { themeMode } = useTheme(); // Get theme from app's theme system
 *   const tokens = useAppDesignTokens(themeMode); // Pass theme to hook
 *
 *   return (
 *     <View style={{ backgroundColor: tokens.colors.background }}>
 *       <Text style={{ color: tokens.colors.textPrimary }}>
 *         This text color changes with theme!
 *       </Text>
 *     </View>
 *   );
 * };
 * ```
 */

import { useMemo } from 'react';
import { createDesignTokens, type DesignTokens, type ThemeMode } from '../tokens/core/TokenFactory';

export const useAppDesignTokens = (themeMode: ThemeMode = 'light'): DesignTokens => {
  return useMemo(() => createDesignTokens(themeMode), [themeMode]);
};
