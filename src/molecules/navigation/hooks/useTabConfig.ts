import React, { useMemo } from "react";
import { View } from "react-native";
import type { ParamListBase } from "@react-navigation/native";
import { AtomicIcon } from "../../../atoms/AtomicIcon";
import { useAppDesignTokens } from "../../../theme";
import { useSafeAreaInsets } from "../../../safe-area";
import type { TabNavigatorConfig, TabScreen } from "../types";

export interface UseTabConfigProps<T extends ParamListBase> {
  config: TabNavigatorConfig<T>;
}

export function useTabConfig<T extends ParamListBase>(props: UseTabConfigProps<T>): TabNavigatorConfig<T> {
  const { config } = props;
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();

  const finalConfig: TabNavigatorConfig<T> = useMemo(() => {
    const screens = config.screens as TabScreen<T>[];
    
    return {
      ...config,
      renderIcon: (
        iconName: string,
        focused: boolean,
        routeName: string,
        isFab: boolean,
      ) => {
        if (config.renderIcon) {
          return config.renderIcon(iconName, focused, routeName, isFab);
        }

        const screen = screens.find((s) => s.name === routeName);
        const fab = config.fabConfig;

        if (isFab) {
          const fabSize = fab?.size ?? 84;
          return React.createElement(View, {
            style: {
              width: fabSize,
              height: fabSize,
              borderRadius: fabSize / 2,
              backgroundColor: tokens.colors.primary,
              justifyContent: "center",
              alignItems: "center",
              marginTop: fab?.offsetY ?? -32,
            }
          }, React.createElement(AtomicIcon, {
            name: iconName,
            svgPath: screen?.svgPath,
            customSize: fabSize * 0.57,
            customColor: "#FFFFFF"
          }));
        }

        return React.createElement(AtomicIcon, {
          name: iconName,
          customColor: focused ? tokens.colors.primary : tokens.colors.textSecondary,
          size: "lg"
        });
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
}
