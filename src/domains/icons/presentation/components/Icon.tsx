/**
 * Universal Icon Component
 *
 * 🎯 SINGLE ICON COMPONENT FOR ALL APPS
 *
 * Automatically uses the icon library configured in IconLibraryConfig.
 * Change library = change config, no code changes needed!
 *
 * @example
 * ```tsx
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
 * 🔧 To change icon library:
 * 1. Update CURRENT_LIBRARY in domain/config/IconLibraryConfig.ts
 * 2. Done! All apps use new library automatically
 */

import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useAppDesignTokens } from '../../../../presentation/hooks/useAppDesignTokens';
import { CURRENT_LIBRARY } from '../../domain/config/IconLibraryConfig';
import { LucideAdapter } from '../../infrastructure/adapters/LucideAdapter';
import type { IconProps } from '../../domain/interfaces/IIconAdapter';

/**
 * Get adapter based on current library configuration
 */
const getAdapter = () => {
  switch (CURRENT_LIBRARY) {
    case 'lucide':
      return LucideAdapter;
    // Future: Add more adapters here
    // case 'material':
    //   return MaterialAdapter;
    // case 'fontawesome':
    //   return FontAwesomeAdapter;
    default:
      return LucideAdapter;
  }
};

/**
 * Universal Icon Component
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  customSize,
  color = 'onSurface',
  customColor,
  strokeWidth,
  withBackground = false,
  backgroundColor,
  accessibilityLabel,
  testID,
  style,
}) => {
  const tokens = useAppDesignTokens();
  const adapter = getAdapter();

  // Get icon component from adapter
  const IconComponent = adapter.getIconComponent(name);

  if (!IconComponent) {
    return null;
  }

  // Calculate icon size
  const iconSize = adapter.getIconSize(size, customSize);

  // Get icon color from theme
  const iconColor = adapter.getIconColor(color, tokens, customColor);

  // Get stroke width (for outline icons)
  const iconStrokeWidth = strokeWidth || adapter.getStrokeWidth?.() || 2;

  // Container size (slightly larger than icon)
  const containerSize = iconSize + 8;

  const containerStyles: StyleProp<ViewStyle> = [
    withBackground && {
      width: containerSize,
      height: containerSize,
      borderRadius: containerSize / 2,
      backgroundColor: backgroundColor || tokens.colors.surfaceVariant,
      justifyContent: 'center',
      alignItems: 'center',
    },
    style,
  ];

  const IconElement = (
    <IconComponent
      size={iconSize}
      color={iconColor}
      strokeWidth={iconStrokeWidth}
      accessibilityLabel={accessibilityLabel || `${name} icon`}
      testID={testID}
    />
  );

  if (withBackground) {
    return (
      <View style={containerStyles} testID={`${testID}-container`}>
        {IconElement}
      </View>
    );
  }

  return IconElement;
};

/**
 * Export icon types for convenience
 */
export type { IconProps } from '../../domain/interfaces/IIconAdapter';
export { type IconSize, type IconColor } from '../../domain/interfaces/IIconAdapter';

/**
 * Export current library's icon names for TypeScript autocomplete
 */
export type { LucideIconName as IconName } from '../../infrastructure/adapters/LucideAdapter';
