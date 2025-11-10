/**
 * AtomicIcon - Atomic Design System Icon Component
 *
 * Wrapper for the universal Icon component from @domains/icons
 * Provides backward compatibility with AtomicIcon naming convention
 * while leveraging the full power of the icons domain architecture.
 */
import React from 'react';
import { Icon } from '@umituz/react-native-icon';
/**
 * AtomicIcon Component
 *
 * @example
 * ```tsx
 * import { AtomicIcon } from '@umituz/react-native-design-system';
 *
 * // Basic usage
 * <AtomicIcon name="Settings" size="md" color="primary" />
 *
 * // Custom size and color
 * <AtomicIcon name="Heart" customSize={32} customColor="#FF0000" />
 *
 * // With background
 * <AtomicIcon name="Info" size="lg" withBackground backgroundColor="#667eea" />
 * ```
 */
export const AtomicIcon = (props) => {
    return <Icon {...props}/>;
};
