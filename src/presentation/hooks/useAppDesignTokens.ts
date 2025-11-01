/**
 * useAppDesignTokens Hook - Design Tokens Access
 *
 * ✅ NPM PACKAGE VERSION - Standalone, no theme dependencies
 * ✅ Returns static light theme tokens
 * ✅ Type-safe design tokens
 * ✅ Zero external dependencies
 *
 * NOTE: This is the npm package version which returns light theme only.
 * For dynamic theme switching, apps should use @domains/theme ThemeProvider.
 *
 * @example
 * ```typescript
 * import { useAppDesignTokens } from '@umituz/react-native-design-system';
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

import { STATIC_DESIGN_TOKENS } from '../tokens/core/TokenFactory';

export const useAppDesignTokens = () => {
  // NPM package version: Always return light theme
  // Apps using factory generator will override this with theme-aware version
  return STATIC_DESIGN_TOKENS;
};
