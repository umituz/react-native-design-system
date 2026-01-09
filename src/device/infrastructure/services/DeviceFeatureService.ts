/**
 * Device Feature Service
 *
 * Generic service for tracking device-based feature usage.
 * Apps configure feature limits via props, service tracks usage.
 *
 * @domain device
 * @layer infrastructure/services
 */

import { storageRepository, unwrap } from '@umituz/react-native-storage';
import type {
  DeviceFeatureConfig,
  DeviceFeatureUsage,
  DeviceFeatureAccess,
  ResetPeriod,
} from '../../domain/entities/DeviceFeatureConfig';
import { PersistentDeviceIdService } from './PersistentDeviceIdService';

export class DeviceFeatureService {
  private static config: DeviceFeatureConfig = { features: {} };

  static setConfig(config: DeviceFeatureConfig): void {
    this.config = config;
  }

  static async checkFeatureAccess(
    featureName: string
  ): Promise<DeviceFeatureAccess> {
    const deviceId = await PersistentDeviceIdService.getDeviceId();
    const featureConfig = this.config.features[featureName];

    if (!featureConfig) {
      return {
        isAllowed: true,
        remainingUses: -1,
        usageCount: 0,
        resetAt: null,
        maxUses: -1,
      };
    }

    const usage = await this.getFeatureUsage(deviceId, featureName);
    const shouldReset = this.shouldResetUsage(usage, featureConfig.resetPeriod);

    if (shouldReset) {
      await this.resetFeatureUsage(deviceId, featureName);
      return {
        isAllowed: true,
        remainingUses: featureConfig.maxUses - 1,
        usageCount: 0,
        resetAt: this.calculateNextReset(featureConfig.resetPeriod),
        maxUses: featureConfig.maxUses,
      };
    }

    const isAllowed = usage.usageCount < featureConfig.maxUses;
    const remainingUses = Math.max(
      0,
      featureConfig.maxUses - usage.usageCount
    );

    return {
      isAllowed,
      remainingUses,
      usageCount: usage.usageCount,
      resetAt: this.calculateNextReset(featureConfig.resetPeriod),
      maxUses: featureConfig.maxUses,
    };
  }

  static async incrementFeatureUsage(featureName: string): Promise<void> {
    const deviceId = await PersistentDeviceIdService.getDeviceId();
    const usage = await this.getFeatureUsage(deviceId, featureName);

    const updatedUsage: DeviceFeatureUsage = {
      ...usage,
      usageCount: usage.usageCount + 1,
    };

    await this.setFeatureUsage(deviceId, featureName, updatedUsage);
  }

  private static async getFeatureUsage(
    deviceId: string,
    featureName: string
  ): Promise<DeviceFeatureUsage> {
    const key = this.getStorageKey(deviceId, featureName);
    const now = Date.now();
    const defaultUsage: DeviceFeatureUsage = {
      usageCount: 0,
      lastResetAt: now,
      firstUsedAt: now,
    };

    try {
      const result = await storageRepository.getItem<DeviceFeatureUsage>(
        key,
        defaultUsage
      );
      return unwrap(result, defaultUsage);
    } catch {
      return defaultUsage;
    }
  }

  private static async setFeatureUsage(
    deviceId: string,
    featureName: string,
    usage: DeviceFeatureUsage
  ): Promise<void> {
    const key = this.getStorageKey(deviceId, featureName);
    try {
      await storageRepository.setItem(key, usage);
    } catch {
      // Silent fail
    }
  }

  private static async resetFeatureUsage(
    deviceId: string,
    featureName: string
  ): Promise<void> {
    const now = Date.now();
    const usage = await this.getFeatureUsage(deviceId, featureName);

    const resetUsage: DeviceFeatureUsage = {
      ...usage,
      usageCount: 0,
      lastResetAt: now,
    };

    await this.setFeatureUsage(deviceId, featureName, resetUsage);
  }

  private static shouldResetUsage(
    usage: DeviceFeatureUsage,
    resetPeriod: ResetPeriod
  ): boolean {
    if (resetPeriod === 'never') {
      return false;
    }

    const now = Date.now();
    const timeSinceReset = now - usage.lastResetAt;
    const periods: Record<ResetPeriod, number> = {
      daily: 24 * 60 * 60 * 1000,
      weekly: 7 * 24 * 60 * 60 * 1000,
      monthly: 30 * 24 * 60 * 60 * 1000,
      never: Infinity,
    };

    return timeSinceReset >= periods[resetPeriod];
  }

  private static calculateNextReset(resetPeriod: ResetPeriod): number | null {
    if (resetPeriod === 'never') {
      return null;
    }

    const now = Date.now();
    const periods: Record<ResetPeriod, number> = {
      daily: 24 * 60 * 60 * 1000,
      weekly: 7 * 24 * 60 * 60 * 1000,
      monthly: 30 * 24 * 60 * 60 * 1000,
      never: 0,
    };

    return now + periods[resetPeriod];
  }

  private static getStorageKey(deviceId: string, featureName: string): string {
    return `@device/feature/${deviceId}/${featureName}`;
  }
}
