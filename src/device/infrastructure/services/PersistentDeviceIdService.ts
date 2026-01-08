/**
 * Persistent Device ID Service
 *
 * Provides a stable device identifier that survives app reinstalls.
 * Priority: SecureStore (survives reinstall) > Native ID > Generated UUID
 *
 * @domain device
 * @layer infrastructure/services
 */

import { SecureDeviceIdRepository } from '../repositories/SecureDeviceIdRepository';
import { LegacyDeviceIdRepository } from '../repositories/LegacyDeviceIdRepository';
import { DeviceIdService } from './DeviceIdService';

let cachedDeviceId: string | null = null;
let initializationPromise: Promise<string> | null = null;

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export class PersistentDeviceIdService {
  private static secureRepo = new SecureDeviceIdRepository();
  private static legacyRepo = new LegacyDeviceIdRepository();

  static async getDeviceId(): Promise<string> {
    if (cachedDeviceId) {
      return cachedDeviceId;
    }

    if (initializationPromise) {
      return initializationPromise;
    }

    initializationPromise = this.initializeDeviceId();
    return initializationPromise;
  }

  private static async initializeDeviceId(): Promise<string> {
    try {
      const secureId = await this.secureRepo.get();

      if (secureId) {
        cachedDeviceId = secureId;
        return secureId;
      }

      const migrated = await this.migrateFromLegacy();
      if (migrated) {
        cachedDeviceId = migrated;
        return migrated;
      }

      const newId = await this.createNewDeviceId();
      await this.secureRepo.set(newId);
      await this.legacyRepo.set(newId);
      cachedDeviceId = newId;

      return newId;
    } catch {
      const fallbackId = generateUUID();
      cachedDeviceId = fallbackId;
      return fallbackId;
    }
  }

  private static async migrateFromLegacy(): Promise<string | null> {
    try {
      const hasMigrated = await this.secureRepo.hasMigrated();
      if (hasMigrated) {
        return null;
      }

      const legacyId = await this.legacyRepo.get();
      if (!legacyId) {
        await this.secureRepo.setMigrated();
        return null;
      }

      await this.secureRepo.set(legacyId);
      await this.secureRepo.setMigrated();

      return legacyId;
    } catch {
      return null;
    }
  }

  private static async createNewDeviceId(): Promise<string> {
    const nativeId = await DeviceIdService.getDeviceId();

    if (nativeId) {
      return `device_${nativeId}`;
    }

    return `generated_${generateUUID()}`;
  }

  static async hasStoredId(): Promise<boolean> {
    try {
      const secureId = await this.secureRepo.get();
      return secureId !== null;
    } catch {
      return false;
    }
  }

  static async clearStoredId(): Promise<void> {
    try {
      await this.legacyRepo.remove();
      cachedDeviceId = null;
      initializationPromise = null;
    } catch {
      // Silent fail
    }
  }

  static getCachedId(): string | null {
    return cachedDeviceId;
  }
}
