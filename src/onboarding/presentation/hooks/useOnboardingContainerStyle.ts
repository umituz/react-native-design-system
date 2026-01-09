/**
 * useOnboardingContainerStyle Hook
 * Single Responsibility: Manage container styling for onboarding screen
 */

import { useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDesignTokens } from "@umituz/react-native-design-system";

export interface UseOnboardingContainerStyleProps {
  useCustomBackground: boolean;
}

export interface UseOnboardingContainerStyleReturn {
  containerStyle: any;
}

export function useOnboardingContainerStyle({
  useCustomBackground,
}: UseOnboardingContainerStyleProps): UseOnboardingContainerStyleReturn {
  const insets = useSafeAreaInsets();
  const tokens = useAppDesignTokens();

  const containerStyle = useMemo(
    () => [
      {
        paddingTop: insets.top,
        backgroundColor: useCustomBackground ? "transparent" : tokens.colors.backgroundPrimary,
      },
    ],
    [insets.top, useCustomBackground, tokens.colors.backgroundPrimary],
  );

  return {
    containerStyle,
  };
}