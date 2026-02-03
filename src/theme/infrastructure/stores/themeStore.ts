/**
 * Theme Store - Zustand State Management
 *
 * Single source of truth for theme mode AND custom colors.
 * Uses AsyncStorage for persistence via ThemeStorage.
 */

import { createStore } from '../../../storage';
import { lightTheme, darkTheme, type Theme } from '../../core/themes';
import { ThemeStorage } from '../storage/ThemeStorage';
import { useDesignSystemTheme } from '../globalThemeStore';
import type { ThemeMode } from '../../core/ColorPalette';
import type { CustomThemeColors } from '../../core/CustomColors';

interface ThemeState {
  theme: Theme;
  themeMode: ThemeMode;
  customColors?: CustomThemeColors;
  isDark: boolean;
  isInitialized: boolean;
}

interface ThemeActions {
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  setCustomColors: (colors?: CustomThemeColors) => Promise<void>;
  toggleTheme: () => Promise<void>;
  initialize: () => Promise<void>;
}

let themeUpdateInProgress = false;
let themeInitInProgress = false;

export const useTheme = createStore<ThemeState, ThemeActions>({
  name: 'theme-store',
  initialState: {
    theme: lightTheme,
    themeMode: 'light',
    customColors: undefined,
    isDark: false,
    isInitialized: false,
  },
  persist: false,
  actions: (set, get) => ({
    initialize: async () => {
      const { isInitialized } = get();
      if (isInitialized || themeInitInProgress) return;

      themeInitInProgress = true;

      try {
        const [savedMode, savedColors] = await Promise.all([
          ThemeStorage.getThemeMode(),
          ThemeStorage.getCustomColors(),
        ]);

        const mode = savedMode || 'light';
        const theme = mode === 'light' ? lightTheme : darkTheme;

        set({
          themeMode: mode,
          theme,
          customColors: savedColors,
          isDark: mode === 'dark',
          isInitialized: true,
        });

        // Sync with design system global theme
        const dsTheme = useDesignSystemTheme.getState();
        dsTheme.setThemeMode(mode);
        dsTheme.setCustomColors(savedColors);
      } catch {
        set({ isInitialized: true });
        useDesignSystemTheme.getState().setThemeMode('light');
      } finally {
        themeInitInProgress = false;
      }
    },

    setThemeMode: async (mode: ThemeMode) => {
      if (themeUpdateInProgress) return;
      themeUpdateInProgress = true;

      try {
        const theme = mode === 'light' ? lightTheme : darkTheme;
        set({ themeMode: mode, theme, isDark: mode === 'dark' });
        await ThemeStorage.setThemeMode(mode);
        useDesignSystemTheme.getState().setThemeMode(mode);
      } catch {
        // Silent failure
      } finally {
        themeUpdateInProgress = false;
      }
    },

    setCustomColors: async (colors?: CustomThemeColors) => {
      set({ customColors: colors });
      await ThemeStorage.setCustomColors(colors);
      useDesignSystemTheme.getState().setCustomColors(colors);
    },

    toggleTheme: async () => {
      const { themeMode, setThemeMode } = get();
      await setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    },
  }),
});

export const useThemeStore = useTheme;



