/**
 * Device Info Computation
 */

import { isSmallPhone, isTablet, isLandscape, getDeviceType, getSpacingMultiplier } from '../../device/detection';
import type { DeviceType } from '../../device/detection';

export interface ComputedDeviceInfo {
  readonly isSmallDevice: boolean;
  readonly isTabletDevice: boolean;
  readonly isLandscapeDevice: boolean;
  readonly deviceType: DeviceType;
  readonly spacingMultiplier: number;
}

export const computeDeviceInfo = (): ComputedDeviceInfo => ({
  isSmallDevice: isSmallPhone(),
  isTabletDevice: isTablet(),
  isLandscapeDevice: isLandscape(),
  deviceType: getDeviceType(),
  spacingMultiplier: getSpacingMultiplier(),
});
