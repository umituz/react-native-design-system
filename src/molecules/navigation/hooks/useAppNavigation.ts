import { useNavigation } from "@react-navigation/native";
import type { NavigationProp, ParamListBase } from "@react-navigation/native";
import { AppNavigation } from "../utils/AppNavigation";

/**
 * useAppNavigation Hook
 *
 * A unified wrapper around React Navigation's useNavigation hook.
 * Standardizes navigation usage across all packages and apps by 
 * providing a consistent interface that bridges static and hook-based navigation.
 */
export function useAppNavigation<T extends ParamListBase>() {
  const navigation = useNavigation<NavigationProp<T>>();

  return {
    ...navigation,
    // Standardized actions using the global AppNavigation utility for consistency
    goBack: () => AppNavigation.goBack(),
    navigate: (name: any, params?: any) => AppNavigation.navigate(name, params),
    push: (name: any, params?: any) => AppNavigation.push(name, params),
    replace: (name: any, params?: any) => AppNavigation.replace(name, params),
    reset: (name: any, params?: any) => AppNavigation.reset(name, params),
    pop: (count?: number) => AppNavigation.pop(count),
    popToTop: () => AppNavigation.popToTop(),
  } as NavigationProp<T> & {
    push: (name: string, params?: object) => void;
    replace: (name: string, params?: object) => void;
    reset: (name: string, params?: object) => void;
    pop: (count?: number) => void;
    popToTop: () => void;
  };
}
