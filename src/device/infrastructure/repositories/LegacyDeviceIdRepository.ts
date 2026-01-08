import { storageRepository, unwrap } from '@umituz/react-native-storage';

const LEGACY_DEVICE_ID_KEY = '@device/persistent_id';

export class LegacyDeviceIdRepository {
  async get(): Promise<string | null> {
    try {
      const result = await storageRepository.getString(LEGACY_DEVICE_ID_KEY, '');
      return unwrap(result, '') || null;
    } catch {
      return null;
    }
  }

  async set(deviceId: string): Promise<void> {
    try {
      await storageRepository.setString(LEGACY_DEVICE_ID_KEY, deviceId);
    } catch {
      // Silent fail per CLAUDE.md rules
    }
  }

  async remove(): Promise<void> {
    try {
      await storageRepository.removeItem(LEGACY_DEVICE_ID_KEY);
    } catch {
      // Silent fail
    }
  }
}
