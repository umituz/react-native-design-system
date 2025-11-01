/**
 * AtomicIcon - Design System Icon Component
 *
 * Simple wrapper around Icon domain for backward compatibility.
 * All icon functionality is provided by @domains/icons.
 *
 * @deprecated Use Icon from @domains/icons directly in new code
 */

import React from 'react';
import { Icon, type IconProps } from '@domains/icons';

/**
 * AtomicIcon Component (Wrapper)
 *
 * This is a simple wrapper around Icon from @domains/icons.
 * It exists for backward compatibility with existing code.
 *
 * For new code, import Icon directly from @domains/icons
 */
export const AtomicIcon: React.FC<IconProps> = (props) => {
  return <Icon {...props} />;
};

// Re-export types for backward compatibility
export type { IconProps as AtomicIconProps } from '@domains/icons';
export type { IconSize as AtomicIconSize } from '@domains/icons';
export type { IconColor as AtomicIconColor } from '@domains/icons';
export type { IconName as AtomicIconName } from '@domains/icons';
