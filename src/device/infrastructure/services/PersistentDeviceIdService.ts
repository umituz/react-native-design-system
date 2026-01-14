import { generateUUID } from '../../../uuid';
import { SecureDeviceIdRepository } from '../repositories/SecureDeviceIdRepository';
import { LegacyDeviceIdRepository } from '../repositories/LegacyDeviceIdRepository';
import { DeviceIdService } from './DeviceIdService';

let cachedDeviceId: string | null = null;
let initializationPromise: Promise<string> | null = null;

/**
 * Persistent Device ID Service
 *
 * Provides a stable device identifier that survives app reinstalls.
 * Priority: SecureStore (true keychain persistence) > Migration > Native ID > Generated UUID
 *
 * @domain device
 * @layer infrastructure/services
 */
export class PersistentDeviceIdService {
  private static secureRepo = new SecureDeviceIdRepository();
  private static legacyRepo = new LegacyDeviceIdRepository();

  /**
   * Get device ID with caching and concurrent request handling
   */
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

  /**
   * Logic to establish a persistent ID
   */
  private static async initializeDeviceId(): Promise<string> {
    try {
      // 1. Try secure repository (Keychain)
      const secureId = await this.secureRepo.get();

      if (secureId) {
        if (__DEV__) {
          console.log('[PersistentDeviceIdService] Found secure device ID:', secureId);
        }
        cachedDeviceId = secureId;
        return secureId;
      }

      // 2. Try migration from legacy storage
      const migrated = await this.migrateFromLegacy();
      if (migrated) {
        if (__DEV__) {
          console.log('[PersistentDeviceIdService] Migrated ID from legacy storage:', migrated);
        }
        cachedDeviceId = migrated;
        return migrated;
      }

      // 3. Create brand new ID
      const newId = await this.createNewDeviceId();
      
      // Save to both for safety during transition
      await Promise.all([
        this.secureRepo.set(newId),
        this.legacyRepo.set(newId),
      ]);

      if (__DEV__) {
        console.log('[PersistentDeviceIdService] Created new persistent ID:', newId);
      }

      cachedDeviceId = newId;
      return newId;
    } catch (error) {
      if (__DEV__) {
        console.error('[PersistentDeviceIdService] Initialization failed, using fallback:', error);
      }
      const fallbackId = `fallback_${generateUUID()}`;
      cachedDeviceId = fallbackId;
      return fallbackId;
    }
  }

  /**
   * Handles migration while ensuring it only happens once
   */
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

      // Upgrade legacy to secure storage
      await this.secureRepo.set(legacyId);
      await this.secureRepo.setMigrated();

      return legacyId;
    } catch {
      return null;
    }
  }

  /**
   * Generates a new ID based on platform info if possible
   */
  private static async createNewDeviceId(): Promise<string> {
    const nativeId = await DeviceIdService.getDeviceId();

    if (nativeId) {
      return `device_${nativeId}`;
    }

    return `gen_${generateUUID()}`;
  }

  /**
   * Check if an ID exists without initializing
   */
  static async hasStoredId(): Promise<boolean> {
    try {
      const secureId = await this.secureRepo.get();
      return secureId !== null;
    } catch {
      return false;
    }
  }

  /**
   * Fully clear all stored identifiers
   */
  static async clearStoredId(): Promise<void> {
    try {
      await Promise.all([
        this.secureRepo.remove(),
        this.legacyRepo.remove(),
      ]);
      cachedDeviceId = null;
      initializationPromise = null;
      if (__DEV__) {
        console.log('[PersistentDeviceIdService] All device identifiers cleared');
      }
    } catch {
      // Silent fail
    }
  }

  /**
   * Get current cached ID synchronously
   */
  static getCachedId(): string | null {
    return cachedDeviceId;
  }
}
