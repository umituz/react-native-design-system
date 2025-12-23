/**
 * Device Module - Public API
 *
 * Device and application information utilities.
 * Provides device detection, capabilities, and system info.
 */

// Domain entities
export type {
    DeviceInfo,
    ApplicationInfo,
    SystemInfo,
    DeviceType,
} from './domain/entities/Device';

export {
    DEVICE_CONSTANTS,
    DeviceUtils,
} from './domain/entities/Device';

export { DeviceTypeUtils } from './domain/entities/DeviceTypeUtils';
export { DeviceMemoryUtils } from './domain/entities/DeviceMemoryUtils';

// Infrastructure services
export { DeviceService } from './infrastructure/services/DeviceService';
export { UserFriendlyIdService } from './infrastructure/services/UserFriendlyIdService';
import { PersistentDeviceIdService } from './infrastructure/services/PersistentDeviceIdService';
export { PersistentDeviceIdService };

// Presentation hooks
export {
    useDeviceInfo,
    useDeviceCapabilities,
    useDeviceId,
} from './presentation/hooks/useDeviceInfo';

export {
    useAnonymousUser,
} from './presentation/hooks/useAnonymousUser';

export type {
    AnonymousUser,
    UseAnonymousUserOptions,
} from './presentation/hooks/useAnonymousUser';

/**
 * Get anonymous user ID for services
 */
export async function getAnonymousUserId(): Promise<string> {
    return PersistentDeviceIdService.getDeviceId();
}
