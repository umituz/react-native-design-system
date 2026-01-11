import { useNavigation } from "@react-navigation/native";
import type { NavigationProp, ParamListBase } from "@react-navigation/native";
import { AppNavigation } from "../utils/AppNavigation";

/**
 * useAppNavigation Hook
 *
 * A unified wrapper that returns the unified AppNavigation object 
 * but enriched with context-specific features from React Navigation.
 * 
 * Ensures components and non-component logic use the EXACT same navigation interface.
 */
export function useAppNavigation<T extends ParamListBase>() {
  const navigation = useNavigation<NavigationProp<T>>();

  // We return a merge of the standard navigation object and our unified AppNavigation actions.
  // This ensures that even if called via a hook, actions like goBack() go through our 
  // unified implementation (including logging and safety checks).
  return {
    ...navigation,
    ...AppNavigation,
  } as NavigationProp<T> & typeof AppNavigation;
}
