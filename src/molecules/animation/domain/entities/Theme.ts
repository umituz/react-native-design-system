/**
 * Theme System for Animation Package
 *
 * Provides theme-aware animation configurations.
 * Consumers can provide their own theme or use defaults.
 */

export interface AnimationTheme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    full: number;
  };
  opacity: {
    transparent: number;
    light: number;
    medium: number;
    heavy: number;
    opaque: number;
  };
}

export const DEFAULT_ANIMATION_THEME: AnimationTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5AC8FA',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },
  opacity: {
    transparent: 0,
    light: 0.25,
    medium: 0.5,
    heavy: 0.75,
    opaque: 1,
  },
} as const;

/**
 * Theme context for React components
 */
export interface ThemeContext {
  theme: AnimationTheme;
  setTheme: (theme: Partial<AnimationTheme>) => void;
}