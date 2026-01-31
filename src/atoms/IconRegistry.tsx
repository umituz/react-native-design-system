/**
 * IconRegistry - Customizable Icon Rendering
 *
 * Allows apps to inject their own icon renderer instead of using
 * the default Ionicons. This enables design system adoption without
 * forcing a specific icon library.
 *
 * @example
 * // App provides custom renderer
 * import { MaterialIcons } from '@expo/vector-icons';
 *
 * const myRenderer = ({ name, size, color }) => (
 *   <MaterialIcons name={name} size={size} color={color} />
 * );
 *
 * <DesignSystemProvider iconRenderer={myRenderer}>
 *   <App />
 * </DesignSystemProvider>
 */

import React, { createContext, useContext, ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

/**
 * Props passed to the icon renderer function
 * These are generic and not tied to any specific icon library
 */
export interface IconRenderProps {
  /** Icon name - app interprets this based on their icon library */
  name: string;
  /** Size in pixels */
  size: number;
  /** Color (hex, rgba, named color, etc.) */
  color: string;
  /** Optional style */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
}

/**
 * Icon renderer function type
 * Apps provide this function to render icons with their preferred library
 */
export type IconRenderer = (props: IconRenderProps) => ReactNode;

/**
 * Internal registry store
 */
interface IconRegistryValue {
  renderIcon: IconRenderer;
}

const IconRegistryStore = createContext<IconRegistryValue | null>(null);

/**
 * Icon provider props
 */
interface IconProviderProps {
  /** Icon renderer function */
  renderIcon: IconRenderer;
  /** Children */
  children: ReactNode;
}

/**
 * IconProvider - Provides custom icon renderer to the component tree
 *
 * @example
 * <IconProvider renderIcon={myCustomRenderer}>
 *   <App />
 * </IconProvider>
 */
export const IconProvider: React.FC<IconProviderProps> = ({
  renderIcon,
  children,
}) => {
  return (
    <IconRegistryStore.Provider value={{ renderIcon }}>
      {children}
    </IconRegistryStore.Provider>
  );
};

/**
 * Hook to access the icon renderer
 * Returns null if no custom renderer is provided (fallback to Ionicons)
 */
export const useIconRenderer = (): IconRenderer | null => {
  const registry = useContext(IconRegistryStore);
  return registry?.renderIcon ?? null;
};

/**
 * Hook to check if a custom icon renderer is available
 */
export const useHasCustomIconRenderer = (): boolean => {
  const registry = useContext(IconRegistryStore);
  return registry !== null;
};
