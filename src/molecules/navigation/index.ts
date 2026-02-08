export { TabsNavigator, type TabsNavigatorProps } from "./TabsNavigator";
export { StackNavigator, type StackNavigatorProps } from "./StackNavigator";
export { FabButton, type FabButtonProps } from "./components/FabButton";
export { NavigationContainer } from "./components/NavigationContainer";

export type {
  TabScreen,
  TabNavigatorConfig,
  StackScreen,
  StackNavigatorConfig,
  BaseScreen,
  BaseNavigatorConfig,
  IconRendererProps,
  LabelProcessorProps,
  FabConfig,
} from "./types";

export type {
  StackScreenProps,
  StackNavigationOptions,
} from "@react-navigation/stack";

export type {
  BottomTabScreenProps,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";

export { DEFAULT_FAB_CONFIG } from "./types";

export { NavigationCleanupManager } from "./utils/NavigationCleanup";
export type { NavigationCleanup } from "./utils/NavigationCleanup";

// Navigation Utilities
export { AppNavigation } from "./utils/AppNavigation";
export { TabLabel, type TabLabelProps } from "./components/TabLabel";
export * from "./components/NavigationHeader";
export { useTabBarStyles, type TabBarConfig } from "./hooks/useTabBarStyles";
export { useTabConfig, type UseTabConfigProps } from "./hooks/useTabConfig";
export { useAppNavigation } from "./hooks/useAppNavigation";
export { useAppRoute, type RouteProp } from "./hooks/useAppRoute";
export { useAppFocusEffect } from "./hooks/useAppFocusEffect";
export { useAppIsFocused } from "./hooks/useAppIsFocused";

// Screen Options
export { createScreenOptions } from "./utils/createScreenOptions";
export type { ScreenOptionsParams } from "./utils/createScreenOptions";
