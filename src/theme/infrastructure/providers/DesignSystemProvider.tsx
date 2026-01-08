import React, { useEffect, useState, ReactNode } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { SafeAreaProvider, initialWindowMetrics } from '../../../safe-area';
import { useThemeStore } from '../stores/themeStore';
import { useDesignSystemTheme } from '../globalThemeStore';
import type { CustomThemeColors } from '../../core/CustomColors';
import { SplashScreen } from '../../../molecules/splash';
import type { SplashScreenProps } from '../../../molecules/splash/types';

declare const __DEV__: boolean;

interface DesignSystemProviderProps {
  /** App content */
  children: ReactNode;
  /** Custom theme colors to override defaults */
  customColors?: CustomThemeColors;
  /** Custom fonts to load (name -> source map) */
  fonts?: Record<string, any>; 
  /** Show loading indicator while initializing (default: true) */
  showLoadingIndicator?: boolean;
  /** Splash screen configuration (used when showLoadingIndicator is true) */
  splashConfig?: Pick<SplashScreenProps, 'appName' | 'tagline' | 'icon' | 'colors'>;
  /** Custom loading component (overrides splash screen) */
  loadingComponent?: ReactNode;
  /** Callback when initialization completes */
  onInitialized?: () => void;
  /** Callback when initialization fails */
  onError?: (error: unknown) => void;
}

/**
 * DesignSystemProvider
 * Initializes theme store and applies custom colors.
 */
export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({
  children,
  customColors,
  fonts,
  showLoadingIndicator = true,
  splashConfig,
  loadingComponent,
  onInitialized,
  onError,
}: DesignSystemProviderProps) => {
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Load fonts if provided
  const [fontsLoaded, fontError] = fonts ? useFonts(fonts) : [true, null];
  
  const initialize = useThemeStore((state) => state.initialize);
  const setCustomColors = useDesignSystemTheme((state) => state.setCustomColors);

  useEffect(() => {
    // Apply custom colors if provided
    if (customColors) {
      setCustomColors(customColors);
    }

    // Initialize theme store
    initialize()
      .then(() => {
        setIsInitialized(true);
      })
      .catch((error) => {
        setIsInitialized(true); // Still render app even on error
        onError?.(error);
      });
  }, [initialize, customColors, setCustomColors, onError]);

  // Handle initialization completion when both theme and fonts are ready
  useEffect(() => {
    if (isInitialized && fontsLoaded) {
      onInitialized?.();
    }
  }, [isInitialized, fontsLoaded, onInitialized]);

  // Handle font errors
  useEffect(() => {
    if (fontError) {
      onError?.(fontError);
    }
  }, [fontError, onError]);

  // Determine if we should show loading state
  const isLoading = showLoadingIndicator && (!isInitialized || !fontsLoaded);

  if (isLoading) {
    if (loadingComponent) {
      return <>{loadingComponent}</>;
    }

    if (splashConfig) {
      return <SplashScreen {...splashConfig} visible={true} />;
    }

    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          {children}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
});
