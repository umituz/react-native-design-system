import { useFocusEffect } from "@react-navigation/native";

/**
 * useAppFocusEffect Hook
 *
 * Wrapper around React Navigation's useFocusEffect.
 * Pass a useCallback-wrapped effect to avoid re-running on every render.
 *
 * Usage:
 *   useAppFocusEffect(
 *     useCallback(() => {
 *       doSomething();
 *       return () => cleanup();
 *     }, [deps])
 *   );
 */
export function useAppFocusEffect(effect: () => void | (() => void)): void {
  useFocusEffect(effect);
}
