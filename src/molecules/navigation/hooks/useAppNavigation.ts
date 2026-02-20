import { useNavigation, StackActions } from "@react-navigation/native";
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
}

/**
 * useAppNavigation Hook
 *
 * Clean navigation API without complex type casting.
 * Uses navigation.navigate() directly for proper nested navigator support.
 * Use: const navigation = useAppNavigation();
 *      navigation.navigate("ScreenName", { param: value });
 */
export function useAppNavigation(): AppNavigationResult {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const navigate = useCallback(
    (screen: string, params?: Record<string, unknown>) => {
      (navigation as any).navigate(screen, params);
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
    }),
    [navigate, push, goBack, reset, replace, pop, popToTop, canGoBack, getState, getParent]
  );
}
