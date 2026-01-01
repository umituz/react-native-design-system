import React, { useEffect, useState, ReactNode } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
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
  showLoadingIndicator = true,
  splashConfig,
  loadingComponent,
  onInitialized,
  onError,
}: DesignSystemProviderProps) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const initialize = useThemeStore((state) => state.initialize);
  const setCustomColors = useDesignSystemTheme((state) => state.setCustomColors);

  if (__DEV__) {
    console.log('[DesignSystemProvider] Component render:', {
      isInitialized,
      showLoadingIndicator,
      hasSplashConfig: !!splashConfig,
      splashConfigKeys: splashConfig ? Object.keys(splashConfig) : [],
    });
  }

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
        if (__DEV__) console.log('[DesignSystemProvider] Initialized successfully - setting isInitialized to true');
        setIsInitialized(true);
        if (__DEV__) console.log('[DesignSystemProvider] State updated - calling onInitialized callback');
        onInitialized?.();
      })
      .catch((error) => {
        if (__DEV__) console.error('[DesignSystemProvider] Initialization failed:', error);
        if (__DEV__) console.log('[DesignSystemProvider] Error occurred - setting isInitialized to true anyway');
        setIsInitialized(true); // Still render app even on error
        onError?.(error);
      });
  }, [initialize, customColors, setCustomColors, onInitialized, onError]);

  const renderContent = () => {
    if (__DEV__) {
      console.log('[DesignSystemProvider] renderContent:', {
        showLoadingIndicator,
        isInitialized,
        hasSplashConfig: !!splashConfig,
        hasLoadingComponent: !!loadingComponent,
      });
    }

    // Show loading indicator if requested and not yet initialized
    if (showLoadingIndicator && !isInitialized) {
      if (__DEV__) console.log('[DesignSystemProvider] Showing loading state');

      if (loadingComponent) {
        if (__DEV__) console.log('[DesignSystemProvider] Rendering custom loading component');
        return <>{loadingComponent}</>;
      }

      // Use SplashScreen if config provided, otherwise fallback to ActivityIndicator
      if (splashConfig) {
        if (__DEV__) console.log('[DesignSystemProvider] Rendering SplashScreen with config:', splashConfig);
        return <SplashScreen {...splashConfig} />;
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
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      {renderContent()}
    </SafeAreaProvider>
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
