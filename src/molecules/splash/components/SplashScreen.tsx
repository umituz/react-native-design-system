/**
 * Splash Screen Component
 * Pure prop-driven component, no context needed
 */

import React, { useEffect, useState, useCallback } from "react";
import { View, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AtomicText } from "../../../atoms";
import type { SplashScreenProps } from "../types";
import { SPLASH_CONSTANTS } from "../constants";

declare const __DEV__: boolean;

export const SplashScreen: React.FC<SplashScreenProps> = ({
  icon,
  appName,
  tagline,
  colors,
  gradientColors,
  visible = true,
  maxDuration,
  onTimeout,
  onReady,
  style,
}: SplashScreenProps) => {
  const insets = useSafeAreaInsets();
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

  if (!visible) {
    if (__DEV__) {
      console.log("[SplashScreen] Not visible, returning null");
    }
    return null;
  }

  const iconPlaceholderColor = colors.iconPlaceholder ?? `${colors.text}30`;

  const contentStyle = {
    paddingTop: insets.top + SPLASH_CONSTANTS.CONTENT_PADDING,
    paddingBottom: insets.bottom + SPLASH_CONSTANTS.CONTENT_PADDING,
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

  if (gradientColors && gradientColors.length >= 2) {
    return (
      <LinearGradient
        colors={gradientColors as [string, string, ...string[]]}
        style={[styles.container, style]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {content}
      </LinearGradient>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }, style]}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
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
  title: {
    textAlign: "center",
    fontWeight: "800",
    marginBottom: 8,
  },
  tagline: {
    textAlign: "center",
    opacity: 0.9,
  },
  timeoutText: {
    textAlign: "center",
    marginTop: 16,
  },
});
