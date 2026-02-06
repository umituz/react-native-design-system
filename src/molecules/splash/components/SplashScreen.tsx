
import React, { useEffect, useState, useCallback } from "react";
import { View, Image, StyleSheet } from "react-native";
import { initialWindowMetrics } from "../../../safe-area";
import { AtomicText, AtomicSpinner } from "../../../atoms";
import { useAppDesignTokens } from "../../../theme";
import type { SplashScreenProps, SplashColors } from "../types";
import { SPLASH_CONSTANTS } from "../constants";


/**
 * Get safe area insets from initial window metrics
 * Used before SafeAreaProvider initializes
 */
const getInitialSafeAreaInsets = () => {
  if (initialWindowMetrics?.insets) {
    return initialWindowMetrics.insets;
  }

  // Fallback to zero insets if no metrics available
  return { top: 0, bottom: 0, left: 0, right: 0 };
};

export const SplashScreen: React.FC<SplashScreenProps> = ({
  icon,
  appName,
  tagline,
  colors: customColors,
  visible = true,
  maxDuration,
  onTimeout,
  onReady,
  style,
}: SplashScreenProps) => {
  const tokens = useAppDesignTokens();
  const initialInsets = getInitialSafeAreaInsets();
  const [timedOut, setTimedOut] = useState(false);

  const handleTimeout = useCallback(() => {
    if (__DEV__) {
      console.log(`[SplashScreen] Timeout reached: ${maxDuration}ms`);
    }
    setTimedOut(true);
    onTimeout?.();
  }, [maxDuration, onTimeout]);

  useEffect(() => {
    if (__DEV__) {
      console.log("[SplashScreen] Mounted", { appName, visible });
    }
    onReady?.();
  }, [appName, visible, onReady]);

  useEffect(() => {
    if (!maxDuration || !visible) return;

    const timer = setTimeout(handleTimeout, maxDuration);
    return () => clearTimeout(timer);
  }, [maxDuration, visible, handleTimeout]);

  // Derive colors from tokens if not provided (theme-aware defaults)
  const colors: SplashColors = customColors ?? {
    background: tokens.colors.backgroundPrimary,
    text: tokens.colors.textPrimary,
    iconPlaceholder: `${tokens.colors.textPrimary}30`, // 30% opacity
  };



  if (!visible) {
    if (__DEV__) {
      console.log("[SplashScreen] Not visible (visible=false), returning null");
    }
    return null;
  }

  if (__DEV__) {
    console.log("[SplashScreen] Rendering splash screen UI");
  }

  const iconPlaceholderColor = colors.iconPlaceholder ?? `${colors.text}30`;

  const contentStyle = {
    paddingTop: initialInsets.top + SPLASH_CONSTANTS.CONTENT_PADDING,
    paddingBottom: initialInsets.bottom + SPLASH_CONSTANTS.CONTENT_PADDING,
  };

  const content = (
    <View style={[styles.content, contentStyle]}>
      <View style={styles.center}>
        {icon ? (
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        ) : (
          <View
            style={[
              styles.iconPlaceholder,
              { backgroundColor: iconPlaceholderColor },
            ]}
          />
        )}

        {appName ? (
          <AtomicText
            type="displaySmall"
            style={[styles.title, { color: colors.text }]}
          >
            {appName}
          </AtomicText>
        ) : null}

        {tagline ? (
          <AtomicText
            type="bodyLarge"
            style={[styles.tagline, { color: colors.text }]}
          >
            {tagline}
          </AtomicText>
        ) : null}

        {/* Always show loading indicator during initialization */}
        <View style={styles.loadingContainer}>
          <AtomicSpinner
            size="lg"
            color={colors.text}
            style={styles.loadingIndicator}
          />
        </View>

        {timedOut && __DEV__ ? (
          <AtomicText
            type="labelSmall"
            style={[styles.timeoutText, { color: colors.text }]}
          >
            Initialization timeout
          </AtomicText>
        ) : null}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }, style]}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: "space-between" },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPLASH_CONSTANTS.CONTENT_PADDING,
  },
  icon: {
    width: SPLASH_CONSTANTS.ICON_SIZE,
    height: SPLASH_CONSTANTS.ICON_SIZE,
    marginBottom: SPLASH_CONSTANTS.CONTENT_PADDING,
  },
  iconPlaceholder: {
    width: SPLASH_CONSTANTS.ICON_PLACEHOLDER_SIZE,
    height: SPLASH_CONSTANTS.ICON_PLACEHOLDER_SIZE,
    borderRadius: SPLASH_CONSTANTS.ICON_PLACEHOLDER_SIZE / 2,
    marginBottom: SPLASH_CONSTANTS.CONTENT_PADDING,
  },
  title: { textAlign: "center", fontWeight: "800", marginBottom: 8 },
  tagline: { textAlign: "center", opacity: 0.9 },
  loadingContainer: {
    marginTop: SPLASH_CONSTANTS.CONTENT_PADDING,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
  },
  loadingIndicator: { opacity: 0.8 },
  timeoutText: { textAlign: "center", marginTop: 16 },
});
