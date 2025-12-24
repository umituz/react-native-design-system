import { Platform } from 'react-native';
import { useMemo } from 'react';
import { useAppDesignTokens } from '../../../atoms';

export interface TabBarConfig {
    backgroundColor?: string;
    borderTopColor?: string;
    borderTopWidth?: number;
    paddingTop?: number;
    paddingBottom?: number;
    minHeight?: number;
    activeTintColor?: string;
    inactiveTintColor?: string;
    labelFontSize?: number;
    labelFontWeight?: string;
    labelMarginTop?: number;
    labelMarginBottom?: number;
}

export function useTabBarStyles(config: TabBarConfig = {}) {
    const tokens = useAppDesignTokens();

    const tabBarStyle = useMemo(() => ({
        backgroundColor: config.backgroundColor || tokens.colors.surface,
        borderTopColor: config.borderTopColor || tokens.colors.borderLight,
        borderTopWidth: config.borderTopWidth ?? 1,
        paddingTop: config.paddingTop ?? 12,
        paddingBottom: config.paddingBottom ?? (Platform.OS === 'ios' ? 24 : 12),
        minHeight: config.minHeight ?? (Platform.OS === 'ios' ? 80 : 70),
    }), [config.backgroundColor, config.borderTopColor, config.borderTopWidth,
    config.paddingTop, config.paddingBottom, config.minHeight, tokens.colors.surface,
    tokens.colors.borderLight]);

    const screenOptions = useMemo(() => ({
        headerShown: false,
        tabBarLabelStyle: {
            fontSize: config.labelFontSize ?? 12,
            fontWeight: (config.labelFontWeight ?? '600') as '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'normal' | 'bold',
            marginTop: config.labelMarginTop ?? 12,
            marginBottom: config.labelMarginBottom ?? 4,
        },
        tabBarActiveTintColor: config.activeTintColor || tokens.colors.primary,
        tabBarInactiveTintColor: config.inactiveTintColor || tokens.colors.textSecondary,
        tabBarStyle,
    }), [config.labelFontSize, config.labelFontWeight, config.labelMarginTop,
    config.labelMarginBottom, config.activeTintColor, config.inactiveTintColor,
        tabBarStyle, tokens.colors.primary, tokens.colors.textSecondary]);

    return useMemo(() => ({
        tokens,
        screenOptions,
        tabBarStyle,
    }), [tokens, screenOptions, tabBarStyle]);
}
