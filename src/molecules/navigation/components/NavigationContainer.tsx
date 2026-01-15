import { NavigationContainerRef } from "@react-navigation/native";

/**
 * NavigationContainer Component
 *
 * Wrapper around React Navigation's NavigationContainerRef
 * Provides navigation support to applications.
 */
export const NavigationContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <NavigationContainerRef>{children}</NavigationContainerRef>;
};
