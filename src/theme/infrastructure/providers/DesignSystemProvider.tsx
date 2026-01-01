import React, { useEffect, useState, ReactNode } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useThemeStore } from '../stores/themeStore';
import { useDesignSystemTheme } from '../globalThemeStore';
import type { CustomThemeColors } from '../../core/CustomColors';

declare const __DEV__: boolean;

interface DesignSystemProviderProps {
  /** App content */
  children: ReactNode;
  /** Custom theme colors to override defaults */
  customColors?: CustomThemeColors;
  /** Show loading indicator while initializing (default: false) */
  showLoadingIndicator?: boolean;
  /** Custom loading component */
  loadingComponent?: ReactNode;
  /** Callback when initialization completes */
  onInitialized?: () => void;
  /** Callback when initialization fails */
  onError?: (error: unknown) => void;
}

/**
 * DesignSystemProvider
 * 
 * Initializes theme store and applies custom colors.
 * Wrap your app with this provider to enable design system features.
 * 
 * Features:
 * - Auto-initializes theme from storage
 * - Supports custom color overrides
 * - Optional loading state
 * - Error handling
 * 
 * Usage:
 * ```tsx
 * import { DesignSystemProvider } from '@umituz/react-native-design-system';
 * 
 * export default function App() {
 *   return (
 *     <DesignSystemProvider
 *       customColors={{ primary: '#FF6B6B' }}
 *       showLoadingIndicator
 *     >
 *       <YourApp />
 *     </DesignSystemProvider>
 *   );
 * }
 * ```
 */
export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({
  children,
  customColors,
  showLoadingIndicator = false,
  loadingComponent,
  onInitialized,
  onError,
}: DesignSystemProviderProps) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const initialize = useThemeStore((state) => state.initialize);
  const setCustomColors = useDesignSystemTheme((state) => state.setCustomColors);

  useEffect(() => {
    if (__DEV__) console.log('[DesignSystemProvider] Initializing...');
    
    // Apply custom colors if provided
    if (customColors) {
      if (__DEV__) console.log('[DesignSystemProvider] Applying custom colors');
      setCustomColors(customColors);
    }

    // Initialize theme store
    initialize()
      .then(() => {
        if (__DEV__) console.log('[DesignSystemProvider] Initialized successfully');
        setIsInitialized(true);
        onInitialized?.();
      })
      .catch((error) => {
        if (__DEV__) console.error('[DesignSystemProvider] Initialization failed:', error);
        setIsInitialized(true); // Still render app even on error
        onError?.(error);
      });
  }, [initialize, customColors, setCustomColors, onInitialized, onError]);

  // Show loading indicator if requested and not yet initialized
  if (showLoadingIndicator && !isInitialized) {
    if (loadingComponent) {
      return <>{loadingComponent}</>;
    }
    
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
});
