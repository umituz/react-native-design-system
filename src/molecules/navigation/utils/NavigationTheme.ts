import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme, Theme } from '@react-navigation/native';

/**
 * Create a navigation theme based on design tokens and mode
 */
export const createNavigationTheme = (colors: Record<string, string>, mode: 'light' | 'dark'): Theme => {
    const baseTheme = mode === 'dark' ? NavigationDarkTheme : NavigationDefaultTheme;

    return {
        ...baseTheme,
        colors: {
            ...baseTheme.colors,
            primary: colors.primary ?? baseTheme.colors.primary,
            background: colors.backgroundPrimary ?? baseTheme.colors.background,
            card: colors.surface ?? baseTheme.colors.card,
            text: colors.textPrimary ?? baseTheme.colors.text,
            border: colors.border ?? baseTheme.colors.border,
            notification: colors.error ?? baseTheme.colors.notification,
        },
    };
};
