/**
 * Haptics Domain - Haptic Service
 *
 * Service for haptic feedback using expo-haptics.
 * Provides abstraction layer for vibration and feedback.
 *
 * @domain haptics
 * @layer infrastructure/services
 */

import * as Haptics from 'expo-haptics';
import type { ImpactStyle, NotificationType, HapticPattern } from '../../domain/entities/Haptic';

/**
 * Log error in development mode only
 */
function logError(method: string, error: unknown): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[HapticService.${method}]`, error);
  }
}


/**
 * Haptic feedback service
 */
export class HapticService {
  /**
   * Trigger impact feedback (Light, Medium, Heavy)
   */
  static async impact(style: ImpactStyle = 'Light'): Promise<void> {
    try {
      await Haptics.impactAsync(
        style === 'Light' ? Haptics.ImpactFeedbackStyle.Light :
        style === 'Medium' ? Haptics.ImpactFeedbackStyle.Medium :
        Haptics.ImpactFeedbackStyle.Heavy
      );
    } catch (error) {
      logError('impact', error);
    }
  }

  /**
   * Trigger notification feedback (Success, Warning, Error)
   */
  static async notification(type: NotificationType): Promise<void> {
    try {
      await Haptics.notificationAsync(
        type === 'Success' ? Haptics.NotificationFeedbackType.Success :
        type === 'Warning' ? Haptics.NotificationFeedbackType.Warning :
        Haptics.NotificationFeedbackType.Error
      );
    } catch (error) {
      logError('notification', error);
    }
  }

  /**
   * Trigger selection feedback (for pickers, sliders)
   */
  static async selection(): Promise<void> {
    try {
      await Haptics.selectionAsync();
    } catch (error) {
      logError('selection', error);
    }
  }

  /**
   * Trigger haptic pattern
   */
  static async pattern(pattern: HapticPattern): Promise<void> {
    try {
      switch (pattern) {
        case 'selection':
          await HapticService.selection();
          break;
        case 'success':
          await HapticService.notification('Success');
          break;
        case 'warning':
          await HapticService.notification('Warning');
          break;
        case 'error':
          await HapticService.notification('Error');
          break;
        default:
          await HapticService.impact('Light');
      }
    } catch (error) {
      logError('pattern', error);
    }
  }

  /**
   * Common haptic patterns (convenience methods)
   */
  static async buttonPress(): Promise<void> {
    await HapticService.impact('Light');
  }

  static async success(): Promise<void> {
    await HapticService.pattern('success');
  }

  static async error(): Promise<void> {
    await HapticService.pattern('error');
  }

  static async warning(): Promise<void> {
    await HapticService.pattern('warning');
  }

  static async delete(): Promise<void> {
    await HapticService.impact('Medium');
  }

  static async refresh(): Promise<void> {
    await HapticService.impact('Light');
  }

  static async selectionChange(): Promise<void> {
    await HapticService.pattern('selection');
  }

  static async longPress(): Promise<void> {
    await HapticService.impact('Medium');
  }
}
