import React, { useMemo } from "react";
import { View } from "react-native";
import type { ParamListBase } from "@react-navigation/native";
import { AtomicIcon } from "../../../atoms/AtomicIcon";
import { useAppDesignTokens } from "../../../theme";
import { useSafeAreaInsets } from "../../../safe-area";
import type { TabNavigatorConfig } from "../types";

export interface UseTabConfigProps<T extends ParamListBase> {
  config: TabNavigatorConfig<T>;
}

export const useTabConfig = <T extends ParamListBase>({
  config,
}: UseTabConfigProps<T>) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();

  const finalConfig: TabNavigatorConfig<T> = useMemo(() => {
    return {
      ...config,
      renderIcon: (
        iconName: string,
        focused: boolean,
        routeName: string,
        isFab: boolean,
      ) => {
        // If user provided a custom renderer, use it
        if (config.renderIcon) {
          return config.renderIcon(iconName, focused, routeName, isFab);
        }

        const screen = config.screens.find((s) => s.name === routeName);
        const fabConfig = config.fabConfig;

        if (isFab) {
          const size = fabConfig?.size ?? 84;
          return (
            <View
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: tokens.colors.primary,
                justifyContent: "center",
                alignItems: "center",
                marginTop: fabConfig?.offsetY ?? -32,
              }}
            >
              <AtomicIcon
                name={iconName}
                svgPath={screen?.svgPath}
                customSize={size * 0.57} // Approx 48/84 ratio
                customColor="#FFFFFF"
              />
            </View>
          );
        }

        return (
          <AtomicIcon
            name={iconName}
            customColor={
              focused ? tokens.colors.primary : tokens.colors.textSecondary
            }
            size="lg"
          />
        );
      },
      screenOptions: {
        tabBarActiveTintColor: tokens.colors.primary,
        tabBarInactiveTintColor: tokens.colors.textSecondary,
        tabBarShowLabel: false,
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarStyle: {
          backgroundColor: tokens.colors.surface,
          borderTopColor: tokens.colors.borderLight,
          borderTopWidth: 0,
          paddingBottom: insets.bottom || 0,
          height: tokens.spacing.tabBarHeight + (insets.bottom || 16),
        },
        headerStyle: {
          backgroundColor: tokens.colors.surface,
          borderBottomColor: tokens.colors.borderLight,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "600",
          color: tokens.colors.textPrimary,
        },
        headerTintColor: tokens.colors.textPrimary,
        ...(typeof config.screenOptions === "object"
          ? config.screenOptions
          : {}),
      },
    };
  }, [tokens, config, insets]);

  return finalConfig;
};
