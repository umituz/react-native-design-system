import { useMemo } from 'react';
import { useTheme } from '../infrastructure/stores/themeStore';
import { createDesignTokens } from '../core/TokenFactory';
import { useResponsive } from '../../responsive/useResponsive';
import { type DesignTokens } from '../types/ThemeTypes';

/**
 * Hook to access current design tokens (colors, spacing, typography, etc.)
 *
 * Uses useTheme directly - single source of truth for theme state.
 */
export const useAppDesignTokens = (): DesignTokens => {
    const { themeMode, customColors } = useTheme();
    const { spacingMultiplier, getFontSize } = useResponsive();

    return useMemo(
        () => createDesignTokens(themeMode, customColors, spacingMultiplier, getFontSize),
        [themeMode, customColors, spacingMultiplier, getFontSize]
    );
};
