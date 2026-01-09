import { useNavigation } from "@react-navigation/native";
import type { NavigationProp, ParamListBase } from "@react-navigation/native";

/**
 * useAppNavigation Hook
 *
 * A wrapper around React Navigation's useNavigation hook.
 * Standardizes navigation usage across all packages and apps.
 */
export function useAppNavigation<T extends ParamListBase>(): NavigationProp<T> {
  return useNavigation<NavigationProp<T>>();
}
