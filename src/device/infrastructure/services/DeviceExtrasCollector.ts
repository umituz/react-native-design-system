/**
 * Device Extras Collector
 *
 * Collects device and application information for user documents.
 * Used with @umituz/react-native-auth's UserDocumentService.
 *
 * @domain device
 * @layer infrastructure/services
 */

import * as Localization from 'expo-localization';
import { DeviceInfoService } from './DeviceInfoService';
import { ApplicationInfoService } from './ApplicationInfoService';
import { PersistentDeviceIdService } from './PersistentDeviceIdService';

/**
 * Device extras for user documents
 * Compatible with UserDocumentExtras from @umituz/react-native-auth
 */
export interface DeviceExtras {
  deviceId?: string;
  platform?: string;
  deviceModel?: string;
  deviceBrand?: string;
  osVersion?: string;
  appVersion?: string;
  buildNumber?: string;
  locale?: string;
  timezone?: string;
}

/**
 * Get device locale code
 */
function getDeviceLocale(): string | undefined {
  try {
    const locales = Localization.getLocales();
    if (locales && locales.length > 0) {
      const locale = locales[0];
      return locale.languageTag || undefined;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

/**
 * Collect device extras for user documents
 *
 * @example
 * ```typescript
 * import { collectDeviceExtras } from '@umituz/react-native-design-system';
 * import { initializeAuth } from '@umituz/react-native-auth';
 *
 * await initializeAuth({
 *   userCollection: 'users',
 *   collectExtras: collectDeviceExtras,
 * });
 * ```
 */
export async function collectDeviceExtras(): Promise<DeviceExtras> {
  try {
    const [deviceInfo, appInfo, deviceId] = await Promise.all([
      DeviceInfoService.getDeviceInfo(),
      ApplicationInfoService.getApplicationInfo(),
      PersistentDeviceIdService.getDeviceId(),
    ]);

    const locale = getDeviceLocale();

    return {
      deviceId,
      platform: deviceInfo.platform,
      deviceModel: deviceInfo.modelName || undefined,
      deviceBrand: deviceInfo.brand || undefined,
      osVersion: deviceInfo.osVersion || undefined,
      appVersion: appInfo.nativeApplicationVersion || undefined,
      buildNumber: appInfo.nativeBuildVersion || undefined,
      locale,
      timezone: deviceInfo.timezone || undefined,
    };
  } catch {
    return {};
  }
}
