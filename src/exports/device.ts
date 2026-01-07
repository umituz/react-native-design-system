/**
 * Device Exports
 * Device detection and capabilities
 */

export {
  // Device detection
  DeviceType,
  getScreenDimensions,
  isPhone,
  isSmallPhone,
  isLargePhone,
  isTablet,
  isLandscape,
  getDeviceType,
  getSpacingMultiplier,
  // iPad detection
  isIPad,
  isIPadMini,
  isIPadPro,
  isIPadLandscape,
  IPAD_BREAKPOINTS,
  TOUCH_TARGETS,
  CONTENT_WIDTH_CONSTRAINTS,
  IPAD_LAYOUT_CONFIG,
  // iPad utilities
  getContentMaxWidth,
  getIPadGridColumns,
  getTouchTargetSize,
  getIPadScreenPadding,
  getIPadFontScale,
  getIPadLayoutInfo,
  getIPadModalDimensions,
  getPaywallDimensions,
  type IPadLayoutInfo,
  type ModalDimensions,
  type PaywallDimensions,
  // Device info
  DEVICE_CONSTANTS,
  DeviceUtils,
  DeviceTypeUtils,
  DeviceMemoryUtils,
  DeviceService,
  UserFriendlyIdService,
  PersistentDeviceIdService,
  useDeviceInfo,
  useDeviceCapabilities,
  useDeviceId,
  useAnonymousUser,
  getAnonymousUserId,
  collectDeviceExtras,
  type DeviceInfo,
  type ApplicationInfo,
  type SystemInfo,
  type AnonymousUser,
  type UseAnonymousUserOptions,
  type DeviceExtras,
} from '../device';
