import { useNavigation, StackActions, CommonActions } from "@react-navigation/native";
import type { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useCallback, useMemo } from "react";

/**
 * Navigation result type - clean and simple
 */
export interface AppNavigationResult {
  navigate: (screen: string, params?: Record<string, unknown>) => void;
  push: (screen: string, params?: Record<string, unknown>) => void;
  goBack: () => void;
  reset: (screen: string, params?: Record<string, unknown>) => void;
  replace: (screen: string, params?: Record<string, unknown>) => void;
  pop: (count?: number) => void;
  popToTop: () => void;
  canGoBack: () => boolean;
  getState: () => ReturnType<NavigationProp<ParamListBase>["getState"]>;
  getParent: () => NavigationProp<ParamListBase> | undefined;
  /** Whether navigation is available (inside NavigationContainer) */
  isReady: boolean;
}

/**
 * Creates a no-op navigation object for use outside NavigationContainer
 */
function createNoOpNavigation(): AppNavigationResult {
  return {
    navigate: () => {
      if (__DEV__) {
        console.warn('[useAppNavigation] Navigation not ready. Component must be inside NavigationContainer.');
      }
    },
    push: () => {
      if (__DEV__) {
        console.warn('[useAppNavigation] Navigation not ready. Component must be inside NavigationContainer.');
      }
    },
    goBack: () => {
      if (__DEV__) {
        console.warn('[useAppNavigation] Navigation not ready. Component must be inside NavigationContainer.');
      }
    },
    reset: () => {
      if (__DEV__) {
        console.warn('[useAppNavigation] Navigation not ready. Component must be inside NavigationContainer.');
      }
    },
    replace: () => {
      if (__DEV__) {
        console.warn('[useAppNavigation] Navigation not ready. Component must be inside NavigationContainer.');
      }
    },
    pop: () => {
      if (__DEV__) {
        console.warn('[useAppNavigation] Navigation not ready. Component must be inside NavigationContainer.');
      }
    },
    popToTop: () => {
      if (__DEV__) {
        console.warn('[useAppNavigation] Navigation not ready. Component must be inside NavigationContainer.');
      }
    },
    canGoBack: () => false,
    getState: () => ({ key: 'root', index: 0, routeNames: [], history: [], routes: [], type: 'nav', stale: false }),
    getParent: () => undefined,
    isReady: false,
  };
}

/**
 * useAppNavigation Hook
 *
 * Clean navigation API without complex type casting.
 * Uses navigation.navigate() directly for proper nested navigator support.
 *
 * Safe to use outside NavigationContainer - returns no-op functions.
 *
 * Use: const navigation = useAppNavigation();
 *      if (navigation.isReady) {
 *        navigation.navigate("ScreenName", { param: value });
 *      }
 */
export function useAppNavigation(): AppNavigationResult {
  try {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const navigate = useCallback(
      (screen: string, params?: Record<string, unknown>) => {
        // Dynamic navigation: use CommonActions for type-safe arbitrary screen navigation
        navigation.dispatch(
          CommonActions.navigate({
            name: screen,
            params,
          })
        );
      },
      [navigation]
    );

    const push = useCallback(
      (screen: string, params?: Record<string, unknown>) => {
        navigation.dispatch(StackActions.push(screen, params));
      },
      [navigation]
    );

    const goBack = useCallback(() => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    }, [navigation]);

    const reset = useCallback(
      (screen: string, params?: Record<string, unknown>) => {
        navigation.reset({ index: 0, routes: [{ name: screen, params }] });
      },
      [navigation]
    );

    const replace = useCallback(
      (screen: string, params?: Record<string, unknown>) => {
        navigation.dispatch(StackActions.replace(screen, params));
      },
      [navigation]
    );

    const pop = useCallback(
      (count = 1) => {
        navigation.dispatch(StackActions.pop(count));
      },
      [navigation]
    );

    const popToTop = useCallback(() => {
      navigation.dispatch(StackActions.popToTop());
    }, [navigation]);

    const canGoBack = useCallback(() => navigation.canGoBack(), [navigation]);

    const getState = useCallback(() => navigation.getState(), [navigation]);

    const getParent = useCallback(() => navigation.getParent(), [navigation]);

    return useMemo(
      () => ({
        navigate,
        push,
        goBack,
        reset,
        replace,
        pop,
        popToTop,
        canGoBack,
        getState,
        getParent,
        isReady: true,
      }),
      [navigate, push, goBack, reset, replace, pop, popToTop, canGoBack, getState, getParent]
    );
  } catch (error) {
    // Navigation not ready - return no-op navigation
    return createNoOpNavigation();
  }
}
