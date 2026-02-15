/**
 * AtomicTouchable - Touchable Component
 *
 * Atomic Design Level: ATOM
 * Purpose: Touchable wrapper across all apps
 */

import React from 'react';
import { TouchableOpacity, ViewStyle, StyleProp } from 'react-native';

export interface AtomicTouchableProps {
  children: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  // Accessibility props
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: 'button' | 'link' | 'none' | 'text' | 'search' | 'image' | 'adjustable' | 'imagebutton' | 'header' | 'summary' | 'alert' | 'checkbox' | 'combobox' | 'menu' | 'menubar' | 'menuitem' | 'progressbar' | 'radio' | 'radiogroup' | 'scrollbar' | 'spinbutton' | 'switch' | 'tab' | 'tablist' | 'timer' | 'toolbar';
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean | 'mixed';
    busy?: boolean;
    expanded?: boolean;
  };
  accessible?: boolean;
}

export const AtomicTouchable: React.FC<AtomicTouchableProps> = ({
  children,
  onPress,
  onLongPress,
  disabled = false,
  activeOpacity = 0.7,
  style,
  testID,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  accessibilityState,
  accessible = true,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={style}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ ...accessibilityState, disabled }}
      accessible={accessible}
    >
      {children}
    </TouchableOpacity>
  );
};
