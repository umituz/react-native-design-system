/**
 * Theme Provider for Animation Package
 *
 * React context provider for theme management.
 * Allows consumers to customize animation appearance.
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { AnimationTheme, ThemeContext } from '../../domain/entities/Theme';
import { DEFAULT_ANIMATION_THEME } from '../../domain/entities/Theme';

const ThemeContext = createContext<ThemeContext | undefined>(undefined);

export interface AnimationThemeProviderProps {
  children: ReactNode;
  theme?: Partial<AnimationTheme>;
}

/**
 * Theme provider component
 */
export const AnimationThemeProvider: React.FC<AnimationThemeProviderProps> = ({
  children,
  theme: initialTheme,
}) => {
  const [theme, setTheme] = useState<AnimationTheme>(() => ({
    ...DEFAULT_ANIMATION_THEME,
    ...initialTheme,
  }));

  const updateTheme = (newTheme: Partial<AnimationTheme>) => {
    setTheme(prev => ({ ...prev, ...newTheme }));
  };

  const contextValue: ThemeContext = {
    theme,
    setTheme: updateTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to use theme
 */
export const useAnimationTheme = (): ThemeContext => {
  const context = useContext(ThemeContext);
  if (!context) {
    if (__DEV__) {
      console.warn('useAnimationTheme must be used within AnimationThemeProvider');
    }
    return {
      theme: DEFAULT_ANIMATION_THEME,
      setTheme: () => {},
    };
  }
  return context;
};