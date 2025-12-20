/**
 * Theme Storage
 * Persists theme preference using AsyncStorage
 *
 * CRITICAL: This is a standalone storage utility for theme package.
 * Apps should use this for theme persistence.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ThemeMode } from '../../core/ColorPalette';
import { DESIGN_CONSTANTS } from '../../core/constants/DesignConstants';

const STORAGE_KEY = `${DESIGN_CONSTANTS.STORAGE_NAMESPACE}/mode`;

export class ThemeStorage {
  /**
   * Get stored theme mode
   */
  static async getThemeMode(): Promise<ThemeMode | null> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (!value) {
        return null;
      }

      // Validate theme mode value
      if (value === 'light' || value === 'dark') {
        return value as ThemeMode;
      }

      if (__DEV__) {
        console.warn('[ThemeStorage] Invalid theme mode value stored:', value);
      }
      return null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (__DEV__) {
        console.error('[ThemeStorage] Error getting theme mode:', errorMessage);
      }
      // Return null instead of throwing to prevent app crashes
      return null;
    }
  }

  /**
   * Save theme mode
   */
  static async setThemeMode(mode: ThemeMode): Promise<void> {
    try {
      // Validate input
      if (!mode || (mode !== 'light' && mode !== 'dark')) {
        throw new Error(`Invalid theme mode: ${mode}`);
      }

      await AsyncStorage.setItem(STORAGE_KEY, mode);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (__DEV__) {
        console.error('[ThemeStorage] Error saving theme mode:', errorMessage);
      }
      // Re-throw validation errors but swallow storage errors to prevent app crashes
      if (errorMessage.includes('Invalid theme mode')) {
        throw error;
      }
    }
  }

  /**
   * Clear stored theme mode
   */
  static async clearThemeMode(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (__DEV__) {
        console.error('[ThemeStorage] Error clearing theme mode:', errorMessage);
      }
      // Don't throw - clearing storage is not critical
    }
  }
}











