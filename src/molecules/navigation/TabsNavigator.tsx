import React, { useMemo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { ParamListBase } from "@react-navigation/native";
import type { TabNavigatorConfig, TabScreen } from "./types";
import { NavigationValidator } from "./utils/NavigationValidator";
import { createTabScreen } from "./utils/ScreenFactory";
import { useAppDesignTokens } from "../../theme";

// Create the navigator instance ONCE outside the component
const Tab = createBottomTabNavigator();

export interface TabsNavigatorProps<T extends ParamListBase> {
    config: TabNavigatorConfig<T>;
}

/**
 * TabsNavigator Component
 * 
 * Reusable Bottom Tab Navigator component that handles configuration and rendering.
 * Integrates with design tokens for consistent themed styling.
 */
export function TabsNavigator<T extends ParamListBase>({
    config,
}: TabsNavigatorProps<T>) {
    const tokens = useAppDesignTokens();

    // Validate configuration
    if (__DEV__) {
        try {
            NavigationValidator.validateScreens(config.screens, "tab");
            NavigationValidator.validateInitialRoute(
                config.initialRouteName,
                config.screens
            );
        } catch (error) {
            if (__DEV__)
                console.error("[TabsNavigator] Configuration validation failed:", error);
        }
    }

    // Memoize filtered screens
    const visibleScreens = useMemo(
        () => config.screens.filter((screen) => screen.visible !== false),
        [config.screens]
    );

    // Default screen options using design tokens
    const defaultScreenOptions = useMemo(
        () => ({
            tabBarActiveTintColor: tokens.colors.primary,
            tabBarInactiveTintColor: tokens.colors.onSurface,
            tabBarStyle: {
                backgroundColor: tokens.colors.surface,
                borderTopColor: tokens.colors.surfaceVariant,
                height: (tokens.spacing as any).tabBarHeight || 60,
                paddingBottom: 8,
                paddingTop: 8,
            },
            headerStyle: {
                backgroundColor: tokens.colors.surface,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 1,
                borderBottomColor: tokens.colors.surfaceVariant,
            },
            headerTitleStyle: {
                color: tokens.colors.onSurface,
                fontSize: 18,
                fontWeight: "600" as any,
            },
            headerTintColor: tokens.colors.primary,
        }),
        [tokens]
    );

    if (visibleScreens.length === 0) {
        if (__DEV__) console.warn("[TabsNavigator] No visible screens found");
        return null;
    }

    return (
        <Tab.Navigator
            initialRouteName={config.initialRouteName as string}
            screenOptions={{
                ...defaultScreenOptions,
                ...(config.screenOptions as any),
            }}
        >
            {visibleScreens.map((screen) =>
                createTabScreen(screen as TabScreen<any>, config, Tab)
            )}
        </Tab.Navigator>
    );
}
