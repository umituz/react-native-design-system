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
  splashConfig?: Pick<SplashScreenProps, 'appName' | 'tagline' | 'icon' | 'colors' | 'gradientColors'>;
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
  // ALL HOOKS MUST BE AT THE TOP (Rules of Hooks)
  const [isInitialized, setIsInitialized] = useState(false);
  const [minDisplayTimeMet, setMinDisplayTimeMet] = useState(false);
  
  // Load fonts if provided
  const [fontsLoaded, fontError] = fonts ? useFonts(fonts) : [true, null];
  
  const initialize = useThemeStore((state) => state.initialize);
  const setCustomColors = useDesignSystemTheme((state) => state.setCustomColors);

  useEffect(() => {
    if (__DEV__) console.log('[DesignSystemProvider] Initializing...');

    // Apply custom colors if provided
    if (customColors) {
      if (__DEV__) console.log('[DesignSystemProvider] Applying custom colors');
      setCustomColors(customColors);
    }

    // Start minimum display timer (1.5 seconds)
    const MIN_SPLASH_DISPLAY_TIME = 1500;
    const displayTimer = setTimeout(() => {
      if (__DEV__) console.log('[DesignSystemProvider] Minimum display time met (1.5s)');
      setMinDisplayTimeMet(true);
    }, MIN_SPLASH_DISPLAY_TIME);

    // Initialize theme store
    initialize()
      .then(() => {
        if (__DEV__) console.log('[DesignSystemProvider] Theme initialized successfully');
        setIsInitialized(true);
      })
      .catch((error) => {
        if (__DEV__) console.error('[DesignSystemProvider] Initialization failed:', error);
        setIsInitialized(true); // Still render app even on error
        onError?.(error);
      });

    return () => clearTimeout(displayTimer);
  }, [initialize, customColors, setCustomColors, onError]);

  // Handle initialization completion when both theme and fonts are ready
  useEffect(() => {
    if (isInitialized && fontsLoaded && minDisplayTimeMet) {
      if (__DEV__) console.log('[DesignSystemProvider] All systems ready - calling onInitialized');
      onInitialized?.();
    }
  }, [isInitialized, fontsLoaded, minDisplayTimeMet, onInitialized]);

  // Handle font errors
  useEffect(() => {
    if (fontError) {
      if (__DEV__) console.error('[DesignSystemProvider] Font loading failed:', fontError);
      onError?.(fontError);
    }
  }, [fontError, onError]);

  // ALL HOOKS ABOVE - NOW SAFE TO USE OTHER LOGIC

  if (__DEV__) {
    console.log('[DesignSystemProvider] Component render:', {
      isInitialized,
      fontsLoaded,
      minDisplayTimeMet,
      showLoadingIndicator,
      hasSplashConfig: !!splashConfig,
    });
  }

  const renderContent = () => {
    // Show splash if:
    // 1. Loading indicator is enabled AND
    // 2. Either theme not init OR fonts not loaded OR min time not met
    const shouldShowSplash = showLoadingIndicator && (!isInitialized || !fontsLoaded || !minDisplayTimeMet);

    if (__DEV__) {
      console.log('[DesignSystemProvider] renderContent:', {
        shouldShowSplash,
        isInitialized,
        fontsLoaded,
        minDisplayTimeMet
      });
    }

    // Show loading indicator if requested and not yet ready (both conditions must be met)
    if (shouldShowSplash) {
      if (__DEV__) console.log('[DesignSystemProvider] Showing loading state');

      if (loadingComponent) {
        if (__DEV__) console.log('[DesignSystemProvider] Rendering custom loading component');
        return <>{loadingComponent}</>;
      }

      // Use SplashScreen if config provided, otherwise fallback to ActivityIndicator
      if (splashConfig) {
        if (__DEV__) console.log('[DesignSystemProvider] Rendering SplashScreen with config:', splashConfig);
        return <SplashScreen {...splashConfig} visible={shouldShowSplash} />;
      }

      if (__DEV__) console.log('[DesignSystemProvider] Rendering fallback ActivityIndicator');
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (__DEV__) console.log('[DesignSystemProvider] Rendering children (app initialized)');
    return <>{children}</>;
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          {renderContent()}
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
