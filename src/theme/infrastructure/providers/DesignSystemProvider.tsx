import React, { useEffect, useState, ReactNode } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { SafeAreaProvider, initialWindowMetrics } from '../../../safe-area';
import { useThemeStore } from '../stores/themeStore';
import { useDesignSystemTheme, type ThemeMode } from '../globalThemeStore';
import type { CustomThemeColors } from '../../core/CustomColors';
import { SplashScreen } from '../../../molecules/splash';
import type { SplashScreenProps } from '../../../molecules/splash/types';
import { useIconStore, type IconRenderer, type IconNames } from '../../../atoms/icon';


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
  const [fontsLoaded, fontError] = fonts ? useFonts(fonts) : [true, null];

  const initialize = useThemeStore((state) => state.initialize);
  const setThemeMode = useThemeStore((state) => state.setThemeMode);
  const setCustomColors = useDesignSystemTheme((state) => state.setCustomColors);
  const setGlobalThemeMode = useDesignSystemTheme((state) => state.setThemeMode);
  const setIconConfig = useIconStore((state) => state.setConfig);

  useEffect(() => {
    // Set icon config (required)
    if (iconRenderer && iconNames) {
      setIconConfig(iconNames, iconRenderer);
    }

    if (customColors) {
      setCustomColors(customColors);
    }

    setGlobalThemeMode(initialThemeMode);

    initialize()
      .then(async () => {
        await setThemeMode(initialThemeMode);
        setIsInitialized(true);
      })
      .catch((error) => {
        setIsInitialized(true);
        onError?.(error);
      });
  }, [initialize, customColors, iconNames, iconRenderer, initialThemeMode, setCustomColors, setGlobalThemeMode, setThemeMode, setIconConfig, onError]);

  useEffect(() => {
    if (isInitialized && fontsLoaded) {
      onInitialized?.();
    }
  }, [isInitialized, fontsLoaded, onInitialized]);

  useEffect(() => {
    if (fontError) {
      onError?.(fontError);
    }
  }, [fontError, onError]);

  const isLoading = showLoadingIndicator && (!isInitialized || !fontsLoaded);

  let content: ReactNode;

  if (isLoading) {
    if (loadingComponent) {
      content = loadingComponent;
    } else if (splashConfig) {
      content = <SplashScreen {...splashConfig} visible={true} />;
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
    backgroundColor: '#000000',
  },
});
