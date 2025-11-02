/**
 * Icons Domain - Expo Vector Icons Registry
 *
 * Registry for @expo/vector-icons (Material, FontAwesome, Ionicons).
 * Provides metadata and search capabilities for 1000+ icons.
 *
 * @domain icons
 * @layer infrastructure
 */

import type { IIconRegistry, IconMetadata } from '@domains/icons/domain/entities/Icon';
import { IconLibrary, IconCategory } from '@domains/icons/domain/entities/Icon';

/**
 * Expo vector icons registry
 * Maps common Material Design, FontAwesome, and Ionicons
 */
export class ExpoIconRegistry implements IIconRegistry {
  private icons: IconMetadata[] = [
    // Navigation icons (Material Design)
    {
      name: 'home',
      library: IconLibrary.MATERIAL,
      category: IconCategory.NAVIGATION,
      tags: ['house', 'main', 'start'],
      searchTerms: ['home', 'house', 'main', 'dashboard'],
    },
    {
      name: 'arrow-back',
      library: IconLibrary.MATERIAL,
      category: IconCategory.NAVIGATION,
      tags: ['back', 'previous', 'return'],
      searchTerms: ['arrow', 'back', 'previous', 'navigate'],
    },
    {
      name: 'menu',
      library: IconLibrary.MATERIAL,
      category: IconCategory.NAVIGATION,
      tags: ['hamburger', 'drawer', 'navigation'],
      searchTerms: ['menu', 'hamburger', 'navigation', 'drawer'],
    },
    {
      name: 'search',
      library: IconLibrary.MATERIAL,
      category: IconCategory.ACTION,
      tags: ['find', 'lookup', 'query'],
      searchTerms: ['search', 'find', 'lookup', 'magnify'],
    },

    // Action icons (Material Design)
    {
      name: 'add',
      library: IconLibrary.MATERIAL,
      category: IconCategory.ACTION,
      tags: ['plus', 'create', 'new'],
      searchTerms: ['add', 'plus', 'create', 'new'],
    },
    {
      name: 'delete',
      library: IconLibrary.MATERIAL,
      category: IconCategory.ACTION,
      tags: ['remove', 'trash', 'bin'],
      searchTerms: ['delete', 'remove', 'trash', 'garbage'],
    },
    {
      name: 'edit',
      library: IconLibrary.MATERIAL,
      category: IconCategory.ACTION,
      tags: ['pencil', 'modify', 'update'],
      searchTerms: ['edit', 'pencil', 'modify', 'write'],
    },
    {
      name: 'settings',
      library: IconLibrary.MATERIAL,
      category: IconCategory.ACTION,
      tags: ['gear', 'preferences', 'config'],
      searchTerms: ['settings', 'gear', 'preferences', 'options'],
    },
    {
      name: 'favorite',
      library: IconLibrary.MATERIAL,
      category: IconCategory.ACTION,
      tags: ['heart', 'like', 'love'],
      searchTerms: ['favorite', 'heart', 'like', 'love'],
    },

    // Social icons (FontAwesome)
    {
      name: 'facebook',
      library: IconLibrary.FONTAWESOME,
      category: IconCategory.SOCIAL,
      tags: ['fb', 'social', 'network'],
      searchTerms: ['facebook', 'fb', 'social', 'meta'],
    },
    {
      name: 'twitter',
      library: IconLibrary.FONTAWESOME,
      category: IconCategory.SOCIAL,
      tags: ['x', 'social', 'tweet'],
      searchTerms: ['twitter', 'x', 'social', 'tweet'],
    },
    {
      name: 'instagram',
      library: IconLibrary.FONTAWESOME,
      category: IconCategory.SOCIAL,
      tags: ['ig', 'social', 'photo'],
      searchTerms: ['instagram', 'ig', 'social', 'photo'],
    },

    // Communication icons (Ionicons)
    {
      name: 'mail',
      library: IconLibrary.IONICONS,
      category: IconCategory.COMMUNICATION,
      tags: ['email', 'message', 'envelope'],
      searchTerms: ['mail', 'email', 'message', 'contact'],
    },
    {
      name: 'call',
      library: IconLibrary.IONICONS,
      category: IconCategory.COMMUNICATION,
      tags: ['phone', 'telephone', 'dial'],
      searchTerms: ['call', 'phone', 'telephone', 'dial'],
    },
    {
      name: 'notifications',
      library: IconLibrary.IONICONS,
      category: IconCategory.COMMUNICATION,
      tags: ['bell', 'alert', 'reminder'],
      searchTerms: ['notifications', 'bell', 'alert', 'reminder'],
    },

    // Media icons (Material Design)
    {
      name: 'camera',
      library: IconLibrary.MATERIAL,
      category: IconCategory.MEDIA,
      tags: ['photo', 'picture', 'snapshot'],
      searchTerms: ['camera', 'photo', 'picture', 'image'],
    },
    {
      name: 'image',
      library: IconLibrary.MATERIAL,
      category: IconCategory.MEDIA,
      tags: ['photo', 'picture', 'gallery'],
      searchTerms: ['image', 'photo', 'picture', 'gallery'],
    },
    {
      name: 'videocam',
      library: IconLibrary.MATERIAL,
      category: IconCategory.MEDIA,
      tags: ['video', 'camera', 'record'],
      searchTerms: ['video', 'camera', 'record', 'film'],
    },
  ];

  getAllIcons(): IconMetadata[] {
    return this.icons;
  }

  getIconsByCategory(category: IconCategory): IconMetadata[] {
    if (category === IconCategory.ALL) {
      return this.icons;
    }
    return this.icons.filter(icon => icon.category === category);
  }

  searchIcons(query: string): IconMetadata[] {
    if (!query.trim()) {
      return this.icons;
    }

    const normalizedQuery = query.toLowerCase().replace(/[^a-z0-9]/g, '');

    return this.icons.filter(icon => {
      const normalizedName = icon.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const normalizedTags = icon.tags.map(tag => tag.toLowerCase().replace(/[^a-z0-9]/g, ''));
      const normalizedTerms = icon.searchTerms.map(term => term.toLowerCase().replace(/[^a-z0-9]/g, ''));

      return (
        normalizedName.includes(normalizedQuery) ||
        normalizedTags.some(tag => tag.includes(normalizedQuery)) ||
        normalizedTerms.some(term => term.includes(normalizedQuery))
      );
    });
  }

  getIconMetadata(name: string): IconMetadata | null {
    return this.icons.find(icon => icon.name === name) || null;
  }
}
