/**
 * Icon Module
 *
 * Zustand-based icon system.
 * App provides iconNames and iconRenderer via DesignSystemProvider.
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
