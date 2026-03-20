import { useFocusEffect as useRNFocusEffect } from "@react-navigation/native";
import { useEffect } from "react";

/**
 * useAppFocusEffect Hook
 *
 * Safe wrapper around React Navigation's useFocusEffect.
 * Only runs the effect if navigation is ready.
 *
 * @param effect - Callback to run when screen is focused
 *
 * @example
 * ```typescript
 * useAppFocusEffect(
 *   useCallback(() => {
 *     // Runs when screen is focused
 *     return () => {
 *       // Cleanup when screen is unfocused
 *     };
 *   }, [dependency])
 * );
 * ```
 */
export function useAppFocusEffect(effect: () => void | (() => void)): void {
  try {
    // Try to use React Navigation's useFocusEffect
    useRNFocusEffect(effect);
  } catch (error) {
    // Navigation not ready - run effect once and cleanup
    if (__DEV__) {
      console.warn('[useAppFocusEffect] Navigation not ready. Running effect once instead.');
    }
    useEffect(() => {
      const cleanup = effect();
      return () => {
        if (typeof cleanup === 'function') {
          cleanup();
        }
      };
    }, [effect]);
  }
}
