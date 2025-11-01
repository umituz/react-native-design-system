/**
 * useAppDesignTokens Hook - Dynamic Theme-Aware Design Tokens
 *
 * ✅ ZERO DUPLICATION - Uses TokenFactory (Single Source of Truth)
 * ✅ DYNAMIC theme switching (light/dark)
 * ✅ Type-safe design tokens
 * ✅ Automatic re-render on theme change
 * ✅ Graceful fallback to light theme
 * ✅ NO CIRCULAR DEPENDENCY - Relative imports break barrel export cycle
 *
 * CRITICAL: Uses RELATIVE imports to break circular dependency!
 * - Relative import for useTheme (not barrel '@domains/theme')
 * - Relative import for TokenFactory (not barrel through AppDesignTokens)
 * - NOT exported from AppDesignTokens.ts (only from design-system/index.ts)
 *
 * This architecture prevents cycle:
 * - useAppDesignTokens → useTheme (relative, not through barrel)
 * - theme → design-system (through barrel, but useAppDesignTokens not in token barrel)
 * - No cycle detected!
 *
 * @module useAppDesignTokens
 */

import { useMemo } from 'react';
import { useTheme } from '../../../theme/infrastructure/stores/themeStore';
import { createDesignTokens, STATIC_DESIGN_TOKENS, type ThemeMode } from '../tokens/core/TokenFactory';

/**
 * 🎯 DYNAMIC DESIGN TOKENS HOOK
 *
 * USE THIS HOOK in all components for theme-aware design tokens!
 *
 * ✅ Colors are DYNAMIC (update when theme changes)
 * ✅ Typography, spacing, etc. are STATIC (performance optimization)
 * ✅ Automatic re-render on theme change
 * ✅ Zero duplication (uses TokenFactory)
 *
 * @example
 * ```typescript
 * import { useAppDesignTokens } from '@domains/design-system';
 *
 * const MyComponent = () => {
 *   const tokens = useAppDesignTokens();
 *   return (
 *     <View style={{
 *       backgroundColor: tokens.colors.primary,
 *       padding: tokens.spacing.md,
 *       borderRadius: tokens.borders.radius.md
 *     }}>
 *       <Text style={tokens.typography.bodyLarge}>Hello!</Text>
 *     </View>
 *   );
 * };
 * ```
 */
export const useAppDesignTokens = () => {
  // ✅ Hooks must be called unconditionally at the top level
  const { theme, themeMode: mode } = useTheme();

  return useMemo(() => {
    try {
      // Validate theme mode
      const themeMode: ThemeMode = mode === 'dark' ? 'dark' : 'light';

      // Validate theme colors exist
      if (!theme?.colors || typeof theme.colors !== 'object' || !theme.colors.primary) {
        console.warn('useAppDesignTokens: Invalid theme, using light theme fallback');
        return STATIC_DESIGN_TOKENS; // Fallback to light theme
      }

      // ✅ Create tokens using TokenFactory (ZERO duplication!)
      return createDesignTokens(themeMode);
    } catch (error) {
      console.warn('useAppDesignTokens: Error accessing theme, using fallback:', error);
      return STATIC_DESIGN_TOKENS; // Fallback to light theme
    }
  }, [theme?.colors, mode]); // Re-compute when colors or mode changes
};
