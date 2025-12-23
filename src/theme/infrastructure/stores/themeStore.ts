/**
 * Theme Store - Zustand State Management
 *
 * CRITICAL: NO Context Provider pattern - uses Zustand for global state
 *
 * Architecture:
 * - Zustand for state management (NOT Context API)
 * - AsyncStorage for persistence via ThemeStorage
 * - Automatic initialization on app launch
 * - Syncs with design system global theme store
 */

import { create } from 'zustand';
import { lightTheme, darkTheme, type Theme } from '../../core/themes';
import { ThemeStorage } from '../storage/ThemeStorage';
import { useDesignSystemTheme } from '../globalThemeStore';
import type { ThemeMode } from '../../core/ColorPalette';

interface ThemeState {
  theme: Theme;
  themeMode: ThemeMode;
  isDark: boolean;
  isInitialized: boolean;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
  initialize: () => Promise<void>;
}

/**
 * Theme Store - Global state management for theme
 *
 * Usage:
 * ```typescript
 * import { useTheme } from '@umituz/react-native-design-system-theme';
 *
 * const MyComponent = () => {
 *   const { theme, themeMode, setThemeMode, toggleTheme } = useTheme();
 *   // ...
 * };
 * ```
 */
export const useTheme = create<ThemeState>()((set: any, get: any) => ({
  theme: darkTheme,
  themeMode: 'dark',
  isDark: true,
  isInitialized: false,

  initialize: async () => {
    try {
      const savedMode = await ThemeStorage.getThemeMode();
      if (savedMode) {
        const theme = savedMode === 'light' ? lightTheme : darkTheme;
        set({
          themeMode: savedMode,
          theme,
          isDark: savedMode === 'dark',
          isInitialized: true,
        });

        // Sync with design system global theme
        useDesignSystemTheme.getState().setThemeMode(savedMode);
      } else {
        // No saved mode - use default 'dark' and sync to design system store
        set({ isInitialized: true });
        // Ensure design system store is synced even if no saved mode exists
        useDesignSystemTheme.getState().setThemeMode('dark');
      }
    } catch (error) {
      if (__DEV__) console.error('[ThemeStore] Initialization error:', error);
      // Silent failure - still mark as initialized to prevent blocking
      set({ isInitialized: true });
      // Ensure design system store is synced even on error
      useDesignSystemTheme.getState().setThemeMode('dark');
    }
  },

  setThemeMode: async (mode: ThemeMode) => {
    try {
      const theme = mode === 'light' ? lightTheme : darkTheme;

      set({
        themeMode: mode,
        theme,
        isDark: mode === 'dark',
      });

      await ThemeStorage.setThemeMode(mode);

      // Sync with design system global theme
      useDesignSystemTheme.getState().setThemeMode(mode);
    } catch (error) {
      if (__DEV__) console.error('[ThemeStore] Error setting theme mode:', error);
    }
  },

  toggleTheme: async () => {
    const { themeMode, setThemeMode } = get();
    const newMode: ThemeMode = themeMode === 'light' ? 'dark' : 'light';
    await setThemeMode(newMode);
  },
}));






