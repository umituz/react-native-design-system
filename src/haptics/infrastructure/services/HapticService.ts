/**
 * Haptics Domain - Haptic Service
 *
 * Service for haptic feedback using expo-haptics (optional peer dep).
 * Falls back to noop when expo-haptics is not installed.
 */

import type { ImpactStyle, NotificationType, HapticPattern } from '../../domain/entities/Haptic';

// Lazy-load expo-haptics to avoid crash when native module is not available
let _hapticsModule: typeof import('expo-haptics') | null = null;

const getHapticsModule = (): typeof import('expo-haptics') | null => {
  if (_hapticsModule !== null) return _hapticsModule;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    _hapticsModule = require('expo-haptics') as typeof import('expo-haptics');
    return _hapticsModule;
  } catch {
    return null;
  }
};

function logError(method: string, error: unknown): void {
  if (__DEV__) {
    console.error(`[DesignSystem] HapticService.${method} error:`, error);
  }
}

export class HapticService {
  static async impact(style: ImpactStyle = 'Light'): Promise<void> {
    const Haptics = getHapticsModule();
    if (!Haptics) return;
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

  static async notification(type: NotificationType): Promise<void> {
    const Haptics = getHapticsModule();
    if (!Haptics) return;
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

  static async selection(): Promise<void> {
    const Haptics = getHapticsModule();
    if (!Haptics) return;
    try {
      await Haptics.selectionAsync();
    } catch (error) {
      logError('selection', error);
    }
  }

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

  static async buttonPress(): Promise<void> { await HapticService.impact('Light'); }
  static async success(): Promise<void> { await HapticService.pattern('success'); }
  static async error(): Promise<void> { await HapticService.pattern('error'); }
  static async warning(): Promise<void> { await HapticService.pattern('warning'); }
  static async delete(): Promise<void> { await HapticService.impact('Medium'); }
  static async refresh(): Promise<void> { await HapticService.impact('Light'); }
  static async selectionChange(): Promise<void> { await HapticService.pattern('selection'); }
  static async longPress(): Promise<void> { await HapticService.impact('Medium'); }
}
