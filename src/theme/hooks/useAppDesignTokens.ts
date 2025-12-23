import { useMemo } from 'react';
import { useDesignSystemTheme } from '../infrastructure/globalThemeStore';
import { createDesignTokens, type DesignTokens } from '../core/TokenFactory';

/**
 * Hook to access current design tokens (colors, spacing, typography, etc.)
 * 
 * This hook is the primary way for components to access theme tokens.
 * It automatically updates when the theme mode or custom colors change
 * in the design system global store.
 * 
 * @returns {DesignTokens} The current design tokens
 * 
 * @example
 * ```tsx
 * const tokens = useAppDesignTokens();
 * return <View style={{ backgroundColor: tokens.colors.backgroundPrimary }} />;
 * ```
 */
export const useAppDesignTokens = (): DesignTokens => {
    const { themeMode, customColors } = useDesignSystemTheme();

    return useMemo(
        () => createDesignTokens(themeMode, customColors),
        [themeMode, customColors]
    );
};
