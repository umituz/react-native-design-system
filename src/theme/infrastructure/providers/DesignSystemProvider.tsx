import React, { useEffect, useState, ReactNode, lazy, Suspense } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { SafeAreaProvider, initialWindowMetrics } from '../../../safe-area';
import { useTheme } from '../stores/themeStore';
import { useDesignSystemTheme, type ThemeMode } from '../globalThemeStore';
import type { CustomThemeColors } from '../../core/CustomColors';
import type { SplashScreenProps } from '../../../molecules/splash/types';
import { useIconStore } from '../../../atoms/icon/iconStore';
import type { IconRenderer, IconNames } from '../../../atoms/icon/iconStore';

// Lazy load SplashScreen to avoid circular dependency
const SplashScreen = lazy(() => import('../../../molecules/splash').then(m => ({ default: m.SplashScreen })));


const EMPTY_FONTS: Record<string, any> = {};

interface DesignSystemProviderProps {
  children: ReactNode;
  customColors?: CustomThemeColors;
  initialThemeMode?: ThemeMode;
  fonts?: Record<string, any>;
  showLoadingIndicator?: boolean;
  splashConfig?: Pick<SplashScreenProps, 'appName' | 'tagline' | 'icon' | 'colors'>;
  loadingComponent?: ReactNode;
  onInitialized?: () => void;
  onError?: (error: unknown) => void;
  /** Icon renderer - REQUIRED */
  iconRenderer: IconRenderer;
  /** Icon names mapping - REQUIRED */
  iconNames: IconNames;
}

export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({
  children,
  customColors,
  initialThemeMode = 'light',
  fonts,
  showLoadingIndicator = true,
  splashConfig,
  loadingComponent,
  onInitialized,
  onError,
  iconRenderer,
  iconNames,
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const hasCustomFonts = fonts != null && Object.keys(fonts).length > 0;
  const [fontsLoaded, fontError] = useFonts(hasCustomFonts ? fonts : EMPTY_FONTS);

  const initialize = useTheme((state) => state.initialize);
  const setCustomColors = useTheme((state) => state.setCustomColors);
  const setDefaultColors = useTheme((state) => state.setDefaultColors);
  const setDefaultThemeMode = useTheme((state) => state.setDefaultThemeMode);
  const setGlobalCustomColors = useDesignSystemTheme((state) => state.setCustomColors);
  const setGlobalThemeMode = useDesignSystemTheme((state) => state.setThemeMode);

  // Set icon config SYNCHRONOUSLY before first render
  if (iconRenderer && iconNames) {
    const store = useIconStore.getState();
    if (!store.isConfigured) {
      useIconStore.getState().setConfig(iconNames, iconRenderer);
    }
  }

  useEffect(() => {
    // Register app's default colors for reset feature
    if (customColors) {
      setDefaultColors(customColors);
      setCustomColors(customColors);
      setGlobalCustomColors(customColors);
    }

    // Set default theme mode BEFORE initialize
    setDefaultThemeMode(initialThemeMode);
    setGlobalThemeMode(initialThemeMode);

    // Safety timeout: if initialization takes too long, proceed anyway
    const safetyTimer = setTimeout(() => {
      setIsInitialized((prev) => {
        if (!prev) onError?.(new Error('DesignSystemProvider initialization timed out'));
        return true;
      });
    }, 5000);

    initialize()
      .then(() => {
        clearTimeout(safetyTimer);
        setIsInitialized(true);
      })
      .catch((error) => {
        clearTimeout(safetyTimer);
        setIsInitialized(true);
        onError?.(error);
      });

    return () => clearTimeout(safetyTimer);
  }, [
    customColors,
    initialThemeMode,
    initialize,
    onError,
    setCustomColors,
    setDefaultColors,
    setDefaultThemeMode,
    setGlobalCustomColors,
    setGlobalThemeMode,
  ]);

  // Skip font loading gate when no custom fonts are provided
  const effectiveFontsLoaded = hasCustomFonts ? fontsLoaded : true;

  useEffect(() => {
    if (isInitialized && effectiveFontsLoaded) {
      onInitialized?.();
    }
  }, [isInitialized, effectiveFontsLoaded, onInitialized]);

  useEffect(() => {
    if (fontError) {
      onError?.(fontError);
    }
  }, [fontError, onError]);

  const isLoading = showLoadingIndicator && (!isInitialized || !effectiveFontsLoaded);

  let content: ReactNode;

  if (isLoading) {
    if (loadingComponent) {
      content = loadingComponent;
    } else if (splashConfig) {
      content = (
        <Suspense fallback={
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        }>
          <SplashScreen {...splashConfig} visible={true} />
        </Suspense>
      );
    } else {
      content = (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  } else {
    content = children;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        {content}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
