/**
 * @deprecated This icon system is deprecated. Use @umituz/react-native-icons instead.
 *
 * **Migration Guide:**
 * ```tsx
 * // Old way (deprecated)
 * import { AtomicIcon } from '@umituz/react-native-design-system/atoms';
 * <AtomicIcon name="User" size={24} color="text" />
 *
 * // New way (recommended)
 * import { Icon } from '@umituz/react-native-icons';
 * <Icon name="User" size={24} color="text" />
 * ```
 *
 * **Benefits of @umituz/react-native-icons:**
 * - ✅ Package-agnostic (works with Lucide, Expo, or custom providers)
 * - ✅ Lazy loading (only configured provider is loaded)
 * - ✅ Automatic name normalization (kebab ↔ PascalCase ↔ camelCase)
 * - ✅ Better performance with caching
 * - ✅ Zero configuration needed in DesignSystemProvider
 *
 * This module is kept for backward compatibility only and will be removed in a future version.
 */

// Main Component
export {
  AtomicIcon,
  type AtomicIconProps,
  type IconSize,
  type IconName,
  type IconColor,
} from './AtomicIcon';

// Icon Store
export {
  useIconStore,
  useIconRenderer,
  useIconName,
  useHasIconConfig,
  type IconNames,
  type IconRenderer,
  type IconRenderProps,
  REQUIRED_ICON_KEYS,
} from './iconStore';

// Type utilities
export {
  type IconSizePreset,
  ICON_SIZES,
  getIconSize,
  isIconSizePreset,
} from './AtomicIcon.types';
