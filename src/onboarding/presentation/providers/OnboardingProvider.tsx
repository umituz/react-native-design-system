/**
 * Onboarding Provider
 * 
 * Central manager for onboarding theme and configuration.
 * All values are passed from the main application.
 */

import React, { createContext, useContext, useMemo } from "react";
import type { OnboardingTheme, OnboardingColors } from "../types/OnboardingTheme";

interface OnboardingProviderValue {
  theme: OnboardingTheme;
}

const OnboardingScope = createContext<OnboardingProviderValue | undefined>(undefined);

export interface OnboardingProviderProps {
  children: React.ReactNode;
  useCustomBackground: boolean;
  colors: OnboardingColors;
}

export const OnboardingProvider = ({
  children,
  useCustomBackground,
  colors,
}: OnboardingProviderProps) => {
  const value = useMemo(
    () => ({
      theme: {
        colors,
        useCustomBackground,
      },
    }),
    [colors, useCustomBackground]
  );

  return (
    <OnboardingScope.Provider value={value}>
      {children}
    </OnboardingScope.Provider>
  );
};

export const useOnboardingProvider = (): OnboardingProviderValue => {
  const scope = useContext(OnboardingScope);
  if (!scope) {
    throw new Error("useOnboardingProvider must be used within OnboardingProvider");
  }
  return scope;
};
