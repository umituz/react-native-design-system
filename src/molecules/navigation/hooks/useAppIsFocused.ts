import { useIsFocused } from "@react-navigation/native";

/**
 * useAppIsFocused Hook
 *
 * A wrapper around React Navigation's useIsFocused hook.
 * Standardizes API usage across all packages and apps.
 */
export function useAppIsFocused(): boolean {
  return useIsFocused();
}
