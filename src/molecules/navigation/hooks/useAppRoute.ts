import { useRoute } from "@react-navigation/native";
import type { RouteProp, ParamListBase } from "@react-navigation/native";

/**
 * useAppRoute Hook
 *
 * A wrapper around React Navigation's useRoute hook.
 * Standardizes route usage across all packages and apps.
 */
export function useAppRoute<T extends ParamListBase, RouteName extends keyof T = string>(): RouteProp<T, RouteName> {
  return useRoute<RouteProp<T, RouteName>>();
}

export type { RouteProp };
