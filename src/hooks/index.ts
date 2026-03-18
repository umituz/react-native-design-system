/**
 * @umituz/react-native-design-system/hooks - Centralized Hooks Export
 *
 * Re-exports all commonly used hooks from the design system
 *
 * Usage:
 *   import {
 *     useAppDesignTokens,
 *     useTheme,
 *     useInfiniteScroll,
 *     useOffline,
 *     useResponsive,
 *     useSafeArea
 *   } from '@umituz/react-native-design-system/hooks';
 */

// =============================================================================
// THEME HOOKS
// =============================================================================

export {
  useAppDesignTokens,
  useDesignSystemTheme,
  useTheme,
  useThemedStyles,
  useThemedStyleSheet,
  useCommonStyles,
} from '../theme/hooks/useAppDesignTokens';

export { useTheme as useThemeStore } from '../theme/infrastructure/stores/themeStore';

// =============================================================================
// RESPONSIVE HOOKS
// =============================================================================

export {
  useResponsive,
  useBreakpoint,
  useOrientation,
  type Breakpoint,
} from '../responsive';

// =============================================================================
// SAFE AREA HOOKS
// =============================================================================

export {
  useSafeArea,
  useSafeAreaInsets,
} from '../safe-area';

// =============================================================================
// INFINITE SCROLL HOOKS
// =============================================================================

export {
  useInfiniteScroll,
  type UseInfiniteScrollOptions,
  type UseInfiniteScrollResult,
} from '../infinite-scroll';

// =============================================================================
// OFFLINE HOOKS
// =============================================================================

export {
  useOffline,
  type NetworkStatus,
} from '../offline';

// =============================================================================
// DEVICE HOOKS
// =============================================================================

export {
  useDeviceContext,
  useDeviceInfo,
  type DeviceInfo,
} from '../device';

// =============================================================================
// STORAGE HOOKS
// =============================================================================

export {
  useStorage,
  useAsyncStorage,
  useSecureStorage,
} from '../storage';

// =============================================================================
// MEDIA HOOKS
// =============================================================================

export {
  useImagePicker,
  useImageLibrary,
  useCamera,
  type ImagePickerResult,
} from '../media';

// =============================================================================
// TIMEZONE HOOKS
// =============================================================================

export {
  useTimezone,
  useLocalTime,
  type TimezoneInfo,
} from '../timezone';

// =============================================================================
// HAPTICS HOOKS
// =============================================================================

export {
  useHaptics,
  useImpact,
  useNotification,
  useSelection,
} from '../haptics';

// =============================================================================
// LOADING HOOKS
// =============================================================================

export {
  useLoading,
  useLoadingState,
} from '../loading';
