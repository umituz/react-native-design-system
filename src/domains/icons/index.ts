/**
 * Icons Domain - Centralized Icon System
 *
 * 🎯 SINGLE SOURCE OF TRUTH FOR ALL ICONS
 *
 * Universal icon library system with easy library switching.
 * Change icon library = change one config file!
 *
 * @domain icons
 * @enabled true (All apps)
 *
 * ARCHITECTURE:
 * ```
 * domains/icons/
 * ├── domain/
 * │   ├── config/
 * │   │   └── IconLibraryConfig.ts    🔧 Change library here!
 * │   └── interfaces/
 * │       └── IIconAdapter.ts         Interface for adapters
 * ├── infrastructure/
 * │   └── adapters/
 * │       ├── LucideAdapter.ts        Current: Lucide (1,639 icons)
 * │       ├── MaterialAdapter.ts      Future: Material Icons
 * │       └── FontAwesomeAdapter.ts   Future: Font Awesome
 * └── presentation/
 *     └── components/
 *         └── Icon.tsx                Universal Icon component
 * ```
 *
 * USAGE:
 * ```typescript
 * import { Icon } from '@domains/icons';
 *
 * // Basic usage
 * <Icon name="Settings" size="md" color="primary" />
 *
 * // Custom size and color
 * <Icon name="Heart" customSize={32} customColor="#FF0000" />
 *
 * // With background
 * <Icon name="Info" size="lg" withBackground backgroundColor="#667eea" />
 * ```
 *
 * 🔧 TO CHANGE ICON LIBRARY:
 *
 * Step 1: Update package.json
 * ```json
 * {
 *   "dependencies": {
 *     "new-icon-library": "^1.0.0"
 *   }
 * }
 * ```
 *
 * Step 2: Change CURRENT_LIBRARY in domain/config/IconLibraryConfig.ts
 * ```typescript
 * export const CURRENT_LIBRARY: IconLibraryType = 'material'; // Changed!
 * ```
 *
 * Step 3: Create adapter (if needed)
 * ```typescript
 * // infrastructure/adapters/MaterialAdapter.ts
 * export const MaterialAdapter: IIconAdapter = {
 *   getIconComponent: (name) => MaterialIcons[name],
 *   // ... implement interface
 * };
 * ```
 *
 * Step 4: Done! All apps use new library automatically ✅
 *
 * CURRENT LIBRARY: Lucide (1,639 icons)
 * @see https://lucide.dev/icons/
 *
 * DEPENDENCIES:
 * - lucide-react-native: ^0.468.0 (Current library)
 */

// ============================================================================
// PRESENTATION LAYER - Universal Icon Component
// ============================================================================

export { Icon } from './presentation/components/Icon';
export type {
  IconProps,
  IconSize,
  IconColor,
  IconName,
} from './presentation/components/Icon';

// ============================================================================
// DOMAIN LAYER - Configuration & Interfaces
// ============================================================================

export {
  CURRENT_LIBRARY,
  ICON_LIBRARY_CONFIG,
  getCurrentLibrary,
  isLucideLibrary,
} from './domain/config/IconLibraryConfig';
export type { IconLibraryType } from './domain/config/IconLibraryConfig';

export type { IIconAdapter } from './domain/interfaces/IIconAdapter';

// ============================================================================
// INFRASTRUCTURE LAYER - Adapters
// ============================================================================

export { LucideAdapter } from './infrastructure/adapters/LucideAdapter';
export type { LucideIconName } from './infrastructure/adapters/LucideAdapter';
