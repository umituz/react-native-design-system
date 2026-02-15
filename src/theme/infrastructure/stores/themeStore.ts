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
  defaultColors?: CustomThemeColors;
  defaultThemeMode: ThemeMode;
  isDark: boolean;
  isInitialized: boolean;
  _updateInProgress: boolean;
  _initInProgress: boolean;
}

interface ThemeActions {
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  setCustomColors: (colors?: CustomThemeColors) => Promise<void>;
  setDefaultColors: (colors: CustomThemeColors) => void;
  setDefaultThemeMode: (mode: ThemeMode) => void;
  resetToDefaults: () => Promise<void>;
  toggleTheme: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useTheme = createStore<ThemeState, ThemeActions>({
  name: 'theme-store',
  initialState: {
    theme: darkTheme,
    themeMode: 'dark',
    customColors: undefined,
    defaultColors: undefined,
    defaultThemeMode: 'dark',
    isDark: true,
    isInitialized: false,
    _updateInProgress: false,
    _initInProgress: false,
  },
  persist: false,
  actions: (set, get) => ({
    initialize: async () => {
      const { isInitialized, _initInProgress, customColors: currentColors, defaultThemeMode } = get();
      if (isInitialized || _initInProgress) return;

      set({ _initInProgress: true });

      try {
        const [savedMode, savedColors] = await Promise.all([
          ThemeStorage.getThemeMode(),
          ThemeStorage.getCustomColors(),
        ]);

        const mode = savedMode || defaultThemeMode;
        const theme = mode === 'light' ? lightTheme : darkTheme;
        // Only use savedColors if they exist, otherwise keep current (prop-based) colors
        const colors = savedColors !== undefined ? savedColors : currentColors;

        set({
          themeMode: mode,
          theme,
          customColors: colors,
          isDark: mode === 'dark',
          isInitialized: true,
        });

        const dsTheme = useDesignSystemTheme.getState();
        dsTheme.setThemeMode(mode);
        dsTheme.setCustomColors(colors);
      } catch {
        set({ isInitialized: true, _initInProgress: false });
        useDesignSystemTheme.getState().setThemeMode(defaultThemeMode);
      } finally {
        set({ _initInProgress: false });
      }
    },

    setThemeMode: async (mode: ThemeMode) => {
      const { _updateInProgress } = get();
      if (_updateInProgress) return;
      set({ _updateInProgress: true });

      try {
        const theme = mode === 'light' ? lightTheme : darkTheme;
        set({ themeMode: mode, theme, isDark: mode === 'dark' });
        await ThemeStorage.setThemeMode(mode);
        useDesignSystemTheme.getState().setThemeMode(mode);
      } catch {
        // Silent failure
      } finally {
        set({ _updateInProgress: false });
      }
    },

    setCustomColors: async (colors?: CustomThemeColors) => {
      set({ customColors: colors });
      await ThemeStorage.setCustomColors(colors);
      useDesignSystemTheme.getState().setCustomColors(colors);
    },

    setDefaultColors: (colors: CustomThemeColors) => {
      set({ defaultColors: colors });
    },

    setDefaultThemeMode: (mode: ThemeMode) => {
      set({ defaultThemeMode: mode });
    },

    resetToDefaults: async () => {
      const { defaultColors, defaultThemeMode } = get();
      const theme = defaultThemeMode === 'light' ? lightTheme : darkTheme;
      set({ themeMode: defaultThemeMode, theme, isDark: defaultThemeMode === 'dark', customColors: defaultColors });
      await ThemeStorage.clearThemeMode();
      await ThemeStorage.clearCustomColors();
      const dsTheme = useDesignSystemTheme.getState();
      dsTheme.setThemeMode(defaultThemeMode);
      dsTheme.setCustomColors(defaultColors);
    },

    toggleTheme: async () => {
      const { themeMode, setThemeMode } = get();
      await setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    },
  }),
});



