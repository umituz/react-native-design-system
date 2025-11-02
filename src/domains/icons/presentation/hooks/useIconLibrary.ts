/**
 * Icons Domain - useIconLibrary Hook
 *
 * React hook for accessing icon libraries (Lucide + Expo vector icons).
 * Provides search, filter, and metadata access for all available icons.
 *
 * @domain icons
 * @layer presentation
 */

import { useMemo, useState, useCallback } from 'react';
import type { IconMetadata } from '@domains/icons/domain/entities/Icon';
import { IconLibrary, IconCategory, IconUtils, ICON_CONSTANTS } from '@domains/icons/domain/entities/Icon';
import { ExpoIconRegistry } from '@domains/icons/infrastructure/registries/ExpoIconRegistry';

/**
 * Hook for icon library access and search
 *
 * @example
 * const { icons, searchIcons, filterByCategory } = useIconLibrary();
 *
 * // Search icons
 * const results = searchIcons('home');
 *
 * // Filter by category
 * const navIcons = filterByCategory(IconCategory.NAVIGATION);
 */
export const useIconLibrary = (defaultLibrary: IconLibrary = ICON_CONSTANTS.DEFAULT_LIBRARY) => {
  const [selectedLibrary, setSelectedLibrary] = useState<IconLibrary>(defaultLibrary);
  const [selectedCategory, setSelectedCategory] = useState<IconCategory>(IconCategory.ALL);

  // Initialize registry
  const registry = useMemo(() => new ExpoIconRegistry(), []);

  /**
   * Get all icons from the selected library
   */
  const icons = useMemo(() => {
    const allIcons = registry.getAllIcons();
    return selectedLibrary === IconLibrary.LUCIDE
      ? []  // Lucide icons are in design-system/AtomicIcon
      : allIcons.filter(icon => icon.library === selectedLibrary);
  }, [registry, selectedLibrary]);

  /**
   * Get icons filtered by category
   */
  const iconsByCategory = useMemo(() => {
    return IconUtils.filterByCategory(icons, selectedCategory);
  }, [icons, selectedCategory]);

  /**
   * Search icons by query
   */
  const searchIcons = useCallback(
    (query: string): IconMetadata[] => {
      if (!query.trim()) {
        return iconsByCategory;
      }

      const results = registry.searchIcons(query);
      const filteredResults = selectedLibrary === IconLibrary.LUCIDE
        ? results
        : results.filter(icon => icon.library === selectedLibrary);

      return IconUtils.filterByCategory(filteredResults, selectedCategory)
        .slice(0, ICON_CONSTANTS.MAX_SEARCH_RESULTS);
    },
    [registry, selectedLibrary, selectedCategory, iconsByCategory]
  );

  /**
   * Filter icons by category
   */
  const filterByCategory = useCallback(
    (category: IconCategory): IconMetadata[] => {
      return IconUtils.filterByCategory(icons, category);
    },
    [icons]
  );

  /**
   * Get icon metadata by name
   */
  const getIconMetadata = useCallback(
    (name: string): IconMetadata | null => {
      return registry.getIconMetadata(name);
    },
    [registry]
  );

  /**
   * Get all available categories
   */
  const availableCategories = useMemo(() => {
    return Object.values(IconCategory);
  }, []);

  /**
   * Get all available libraries
   */
  const availableLibraries = useMemo(() => {
    return Object.values(IconLibrary);
  }, []);

  /**
   * Switch library
   */
  const switchLibrary = useCallback((library: IconLibrary) => {
    setSelectedLibrary(library);
  }, []);

  /**
   * Switch category
   */
  const switchCategory = useCallback((category: IconCategory) => {
    setSelectedCategory(category);
  }, []);

  return {
    // Current state
    selectedLibrary,
    selectedCategory,
    icons: iconsByCategory,

    // Search & filter
    searchIcons,
    filterByCategory,
    getIconMetadata,

    // Library & category management
    switchLibrary,
    switchCategory,
    availableCategories,
    availableLibraries,

    // Constants
    IconLibrary,
    IconCategory,
  };
};
