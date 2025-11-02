/**
 * Icon Library Configuration
 *
 * 🔧 SINGLE SOURCE OF TRUTH FOR ICON LIBRARY SELECTION
 *
 * To change icon library:
 * 1. Update package.json with new library
 * 2. Change CURRENT_LIBRARY below
 * 3. Create adapter if needed (infrastructure/adapters/)
 * 4. Done! All apps automatically use new library
 *
 * @example
 * // Switch to Material Icons:
 * export const CURRENT_LIBRARY: IconLibraryType = 'material';
 */

export type IconLibraryType = 'lucide' | 'material' | 'fontawesome' | 'ionicons';

/**
 * 🔧 CHANGE THIS TO SWITCH ICON LIBRARY
 */
export const CURRENT_LIBRARY: IconLibraryType = 'lucide';

/**
 * Icon Library Configuration
 */
export const ICON_LIBRARY_CONFIG = {
  /**
   * Current icon library in use
   */
  library: CURRENT_LIBRARY,

  /**
   * Default icon size (in pixels)
   */
  defaultSize: 24,

  /**
   * Default stroke width for outline icons
   */
  defaultStrokeWidth: 2,

  /**
   * Library metadata
   */
  libraries: {
    lucide: {
      name: 'Lucide',
      package: 'lucide-react-native',
      version: '^0.468.0',
      iconCount: 1639,
      type: 'outline',
      adapter: 'LucideAdapter',
    },
    material: {
      name: 'Material Icons',
      package: '@expo/vector-icons',
      version: '^14.0.0',
      iconCount: 2000,
      type: 'filled',
      adapter: 'MaterialAdapter',
    },
    fontawesome: {
      name: 'Font Awesome',
      package: '@expo/vector-icons',
      version: '^14.0.0',
      iconCount: 1500,
      type: 'solid',
      adapter: 'FontAwesomeAdapter',
    },
    ionicons: {
      name: 'Ionicons',
      package: '@expo/vector-icons',
      version: '^14.0.0',
      iconCount: 1300,
      type: 'outline',
      adapter: 'IoniconsAdapter',
    },
  },
} as const;

/**
 * Get current library metadata
 */
export const getCurrentLibrary = () => {
  return ICON_LIBRARY_CONFIG.libraries[CURRENT_LIBRARY];
};

/**
 * Type-safe library check
 * Factory uses Lucide icons only
 */
export const isLucideLibrary = () => true;
