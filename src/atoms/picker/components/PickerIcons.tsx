/**
 * Picker Icons Component
 * Renders clear button and dropdown icon for AtomicPicker
 */

import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useAppDesignTokens } from '../../../theme';
import { AtomicIcon, useIconName } from '../../icon';


interface PickerIconsProps {
  clearable: boolean;
  disabled: boolean;
  modalVisible: boolean;
  selectedOptionsCount: number;
  onClear: () => void;
  clearAccessibilityLabel?: string;
  testID?: string;
}

export const PickerIcons: React.FC<PickerIconsProps> = ({
  clearable,
  disabled,
  modalVisible,
  selectedOptionsCount,
  onClear,
  clearAccessibilityLabel,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const closeIcon = useIconName('close');
  const chevronUpIcon = useIconName('chevronUp');
  const chevronDownIcon = useIconName('chevronDown');

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
      {/* Clear Button */}
      {clearable && selectedOptionsCount > 0 && !disabled && (
        <TouchableOpacity
          onPress={onClear}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel={clearAccessibilityLabel}
          testID={`${testID}-clear`}
        >
          <AtomicIcon name={closeIcon} size="sm" color="secondary" />
        </TouchableOpacity>
      )}

      {/* Dropdown Icon */}
      <AtomicIcon
        name={modalVisible ? chevronUpIcon : chevronDownIcon}
        size="sm"
        color={disabled ? 'surfaceVariant' : 'secondary'}
      />
    </View>
  );
};
