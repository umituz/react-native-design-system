import * as SecureStore from 'expo-secure-store';

const DEVICE_ID_KEY = '@device/persistent_id';
const MIGRATION_FLAG_KEY = '@device/migration_completed';

export class SecureDeviceIdRepository {
  async get(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(DEVICE_ID_KEY);
    } catch {
      return null;
    }
  }

  async set(deviceId: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(DEVICE_ID_KEY, deviceId);
    } catch {
      // Silent fail per CLAUDE.md rules
    }
  }

  async hasMigrated(): Promise<boolean> {
    try {
      const flag = await SecureStore.getItemAsync(MIGRATION_FLAG_KEY);
      return flag === 'true';
    } catch {
      return false;
    }
  }

  async setMigrated(): Promise<void> {
    try {
      await SecureStore.setItemAsync(MIGRATION_FLAG_KEY, 'true');
    } catch {
      // Silent fail
    }
  }
}
