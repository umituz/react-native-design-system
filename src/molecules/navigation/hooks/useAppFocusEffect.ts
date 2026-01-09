import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

/**
 * useAppFocusEffect Hook
 *
 * A wrapper around React Navigation's useFocusEffect hook.
 * Standardizes focus effect usage across all packages and apps.
 */
export function useAppFocusEffect(effect: () => void | (() => void)) {
  useFocusEffect(effect);
}

export { useCallback };
