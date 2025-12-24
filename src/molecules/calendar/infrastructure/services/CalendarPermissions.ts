/**
 * Calendar Permissions Service
 *
 * Handles calendar permission requests and status checks.
 *
 * SOLID: Single Responsibility - Only permission operations
 * DRY: Centralized permission logic
 * KISS: Simple permission interface
 */

import * as Calendar from 'expo-calendar';
import { Platform } from 'react-native';
import type { CalendarPermissionResult } from '../../domain/entities/CalendarEvent.entity';

export class CalendarPermissions {
  /**
   * Request calendar permissions
   *
   * @returns Promise with permission result
   */
  static async requestPermissions(): Promise<CalendarPermissionResult> {
    try {
      if (Platform.OS === 'web') {
        return {
          granted: false,
          canAskAgain: false,
          status: 'denied'
        };
      }

      const { status, canAskAgain } = await Calendar.requestCalendarPermissionsAsync();

      return {
        granted: status === 'granted',
        canAskAgain,
        status
      };
    } catch {
      return {
        granted: false,
        canAskAgain: false,
        status: 'error'
      };
    }
  }

  /**
   * Check if calendar permissions are granted
   *
   * @returns Promise with permission status
   */
  static async hasPermissions(): Promise<boolean> {
    try {
      if (Platform.OS === 'web') {
        return false;
      }

      const { status } = await Calendar.getCalendarPermissionsAsync();
      return status === 'granted';
    } catch {
      return false;
    }
  }

  /**
   * Get current permission status
   *
   * @returns Promise with current status
   */
  static async getPermissionStatus(): Promise<CalendarPermissionResult['status']> {
    try {
      if (Platform.OS === 'web') {
        return 'denied';
      }

      const { status } = await Calendar.getCalendarPermissionsAsync();
      return status;
    } catch {
      return 'error';
    }
  }
}










