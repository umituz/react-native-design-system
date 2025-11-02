/**
 * Icons Domain - Entities
 *
 * Core icon types and interfaces for the App Factory.
 * Provides unified access to Lucide icons (design-system) + Expo vector icons.
 *
 * @domain icons
 * @layer domain
 */

/**
 * Icon library types
 * - lucide: Lucide React Native icons (already in design-system/AtomicIcon)
 * - material: Material Design icons (@expo/vector-icons)
 * - fontawesome: FontAwesome icons (@expo/vector-icons)
 * - ionicons: Ionicons (@expo/vector-icons)
 */
export enum IconLibrary {
  LUCIDE = 'lucide',
  MATERIAL = 'material',
  FONTAWESOME = 'fontawesome',
  IONICONS = 'ionicons',
}

/**
 * Icon category for organization
 */
export enum IconCategory {
  ALL = 'all',
  NAVIGATION = 'navigation',
  ACTION = 'action',
  SOCIAL = 'social',
  COMMUNICATION = 'communication',
  MEDIA = 'media',
  BUSINESS = 'business',
  WEATHER = 'weather',
  SYMBOLS = 'symbols',
  EMOJI = 'emoji',
}

/**
 * Icon metadata for registry
 */
export interface IconMetadata {
  name: string;
  library: IconLibrary;
  category: IconCategory;
  tags: string[];
  searchTerms: string[];
}

/**
 * Icon registry interface
 */
export interface IIconRegistry {
  /**
   * Get all icons in the library
   */
  getAllIcons(): IconMetadata[];

  /**
   * Get icons by category
   */
  getIconsByCategory(category: IconCategory): IconMetadata[];

  /**
   * Search icons by query
   */
  searchIcons(query: string): IconMetadata[];

  /**
   * Get icon metadata by name
   */
  getIconMetadata(name: string): IconMetadata | null;
}

/**
 * Icon picker configuration
 */
export interface IconPickerConfig {
  libraries: IconLibrary[];
  categories: IconCategory[];
  showSearch: boolean;
  multiSelect: boolean;
  maxSelections?: number;
  onSelect: (icons: IconMetadata[]) => void;
  onCancel?: () => void;
}

/**
 * Icon constants
 */
export const ICON_CONSTANTS = {
  DEFAULT_SIZE: 24,
  DEFAULT_COLOR: 'onSurface',
  DEFAULT_LIBRARY: IconLibrary.LUCIDE,
  MAX_SEARCH_RESULTS: 50,
} as const;

/**
 * Icon utility functions
 */
export const IconUtils = {
  /**
   * Normalize icon name for search
   */
  normalizeIconName: (name: string): string => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '');
  },

  /**
   * Match search query against icon metadata
   */
  matchesSearch: (icon: IconMetadata, query: string): boolean => {
    const normalizedQuery = IconUtils.normalizeIconName(query);
    const normalizedName = IconUtils.normalizeIconName(icon.name);
    const normalizedTags = icon.tags.map(tag => IconUtils.normalizeIconName(tag));
    const normalizedTerms = icon.searchTerms.map(term => IconUtils.normalizeIconName(term));

    return (
      normalizedName.includes(normalizedQuery) ||
      normalizedTags.some(tag => tag.includes(normalizedQuery)) ||
      normalizedTerms.some(term => term.includes(normalizedQuery))
    );
  },

  /**
   * Filter icons by category
   */
  filterByCategory: (icons: IconMetadata[], category: IconCategory): IconMetadata[] => {
    if (category === IconCategory.ALL) {
      return icons;
    }
    return icons.filter(icon => icon.category === category);
  },

  /**
   * Sort icons alphabetically
   */
  sortByName: (icons: IconMetadata[]): IconMetadata[] => {
    return [...icons].sort((a, b) => a.name.localeCompare(b.name));
  },
};
