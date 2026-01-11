import { useNavigation } from "@react-navigation/native";
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
 * Use: const navigation = useAppNavigation();
 *      navigation.navigate("ScreenName", { param: value });
 */
export function useAppNavigation(): AppNavigationResult {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const navigate = useCallback(
    (screen: string, params?: Record<string, unknown>) => {
      (navigation.navigate as (name: string, params?: object) => void)(screen, params);
    },
    [navigation]
  );

  const push = useCallback(
    (screen: string, params?: Record<string, unknown>) => {
      navigation.dispatch({ type: "PUSH", payload: { name: screen, params } });
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
      navigation.dispatch({ type: "REPLACE", payload: { name: screen, params } });
    },
    [navigation]
  );

  const pop = useCallback(
    (count = 1) => {
      navigation.dispatch({ type: "POP", payload: { count } });
    },
    [navigation]
  );

  const popToTop = useCallback(() => {
    navigation.dispatch({ type: "POP_TO_TOP" });
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
