/**
 * Storage Service
 *
 * Zustand persist middleware compatible StateStorage implementation.
 * Uses AsyncStorage under the hood for React Native persistence.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { devWarn } from '../../domain/utils/devUtils';
import type { StateStorage } from '../../domain/types/Store';

/**
 * Storage service for Zustand persist middleware
 * Direct AsyncStorage implementation with proper error handling
 */
export const storageService: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(name);
    } catch (error) {
      const errorMessage = `StorageService: Failed to get item "${name}"`;
      devWarn(errorMessage, error);
      // Also log in production for debugging
      if (!__DEV__) {
      }
      return null;
    }
  },

  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      const errorMessage = `StorageService: Failed to set item "${name}"`;
      devWarn(errorMessage, error);
      // Also log in production for debugging
      if (!__DEV__) {
      }
    }
  },

  removeItem: async (name: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (error) {
      const errorMessage = `StorageService: Failed to remove item "${name}"`;
      devWarn(errorMessage, error);
      // Also log in production for debugging
      if (!__DEV__) {
      }
    }
  },
};
