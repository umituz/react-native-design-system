import { useRoute } from "@react-navigation/native";
import type { RouteProp, ParamListBase } from "@react-navigation/native";
import { useMemo } from "react";

/**
 * useAppRoute Hook
 *
 * Safe wrapper around React Navigation's useRoute hook.
 * Returns empty route params if called outside NavigationContainer.
 *
 * @example
 * ```typescript
 * const route = useAppRoute();
 * if (route.isReady) {
 *   const params = route.params;
 * }
 * ```
 */
export function useAppRoute(): any {
  try {
    const route = useRoute();
    return useMemo(
      () => ({
        ...route,
        isReady: true,
      }),
      [route]
    );
  } catch (error) {
    // Route not ready - return empty route
    if (__DEV__) {
      console.warn('[useAppRoute] Route not ready. Component must be inside NavigationContainer.');
    }
    return useMemo(
      () => ({
        key: '',
        name: '',
        params: undefined,
        path: undefined,
        isReady: false,
      }),
      []
    );
  }
}

export type { RouteProp };
