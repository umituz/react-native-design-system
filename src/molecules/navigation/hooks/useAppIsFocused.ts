import { useIsFocused as useRNIsFocused } from "@react-navigation/native";
import { useMemo } from "react";

/**
 * useAppIsFocused Hook
 *
 * Safe wrapper around React Navigation's useIsFocused.
 * Returns false if called outside NavigationContainer.
 *
 * @example
 * ```typescript
 * const isFocused = useAppIsFocused();
 * if (isFocused) {
 *   // Screen is currently focused
 * }
 * ```
 */
export function useAppIsFocused(): boolean {
  try {
    return useRNIsFocused();
  } catch (error) {
    // Navigation not ready - return false
    if (__DEV__) {
      console.warn('[useAppIsFocused] Navigation not ready. Returning false.');
    }
    return false;
  }
}
