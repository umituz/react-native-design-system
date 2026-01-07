/**
 * AtomicPicker Component
 *
 * A reusable option picker/dropdown component for selecting from a list of options.
 *
 * Features:
 * - Single and multi-select support
 * - Modal display mode (full-screen on mobile)
 * - Optional search/filter capability
 * - Error and disabled states
 * - Theme-aware styling
 * - Icons for options
 * - Clearable selection
 * - react-hook-form integration ready
 *
 * Architecture:
 * - Follows AtomicButton pattern with separated types and styles
 * - Uses helper functions from picker/styles/pickerStyles.ts
 * - Types defined in picker/types/index.ts
 * - Zero inline StyleSheet.create()
 *
 * Usage:
 * ```tsx
 * const [partyType, setPartyType] = useState('birthday');
 *
 * <AtomicPicker
 *   value={partyType}
 *   onChange={setPartyType}
 *   options={[
 *     { label: 'Birthday Party', value: 'birthday', icon: 'cake' },
 *     { label: 'Wedding', value: 'wedding', icon: 'heart' },
 *     { label: 'Corporate Event', value: 'corporate', icon: 'briefcase' },
 *   ]}
 *   label="Party Type"
 *   placeholder="Select party type"
 *   searchable
 * />
 * ```
 *
 * @module AtomicPicker
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useAppDesignTokens } from '../theme';
import { AtomicPickerProps } from './picker/types';

import { AtomicText } from './AtomicText';
import { PickerModal } from './picker/components/PickerModal';
import { PickerChips } from './picker/components/PickerChips';
import { PickerIcons } from './picker/components/PickerIcons';
import {
  getPickerContainerStyles,
  getPickerLabelStyles,
  getPickerPlaceholderStyles,
  getPickerValueStyles,
  getPickerErrorStyles,
} from './picker/styles/pickerStyles';
import { usePickerState } from './picker/hooks/usePickerState';

export type { AtomicPickerProps, PickerOption, PickerSize } from './picker/types';

/**
 * AtomicPicker - Universal option picker component
 *
 * Displays a button that opens a modal for selection.
 * Supports single/multi-select, search, and custom rendering.
 */
export const AtomicPicker: React.FC<AtomicPickerProps> = ({
  value,
  onChange,
  options,
  label,
  placeholder,
  error,
  disabled = false,
  multiple = false,
  searchable = false,
  clearable = false,
  autoClose = true,
  size = 'md',
  modalTitle,
  emptyMessage,
  searchPlaceholder,
  clearAccessibilityLabel,
  closeAccessibilityLabel,
  style,
  labelStyle,
  testID,
}) => {
  const tokens = useAppDesignTokens();

  const pickerState = usePickerState({
    value,
    multiple,
    options,
    placeholder,
    autoClose,
    onChange,
  });

  // Get style helpers with design tokens
  const containerStyles = getPickerContainerStyles(tokens);
  const labelStyles = getPickerLabelStyles(tokens);
  const placeholderStyles = getPickerPlaceholderStyles(tokens);
  const valueStyles = getPickerValueStyles(tokens);
  const errorStyles = getPickerErrorStyles(tokens);

  const pickerContainerStyle = StyleSheet.flatten([
    containerStyles.base,
    containerStyles.size[size],
    error ? containerStyles.state.error : undefined,
    disabled ? containerStyles.state.disabled : undefined,
    style,
  ]);

  const pickerLabelStyle = StyleSheet.flatten([
    labelStyles.base,
    labelStyles.size[size],
    labelStyle,
  ]);

  const pickerValueStyle = StyleSheet.flatten([
    pickerState.selectedOptions.length > 0 ? valueStyles.base : placeholderStyles.base,
    pickerState.selectedOptions.length > 0
      ? valueStyles.size[size]
      : placeholderStyles.size[size],
  ]);

  const handleOpenModal = () => {
    if (disabled) return;
    pickerState.openModal();
  };

  return (
    <View>
      {/* Label */}
      {label && <AtomicText style={pickerLabelStyle}>{label}</AtomicText>}

      {/* Picker Button */}
      <TouchableOpacity
        onPress={handleOpenModal}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label || placeholder}
        accessibilityState={{ disabled }}
        testID={testID}
        style={pickerContainerStyle}
      >
        {/* Display Text */}
        <AtomicText style={pickerValueStyle} numberOfLines={1}>
          {pickerState.displayText}
        </AtomicText>

        {/* Icons */}
        <PickerIcons
          clearable={clearable}
          disabled={disabled}
          modalVisible={pickerState.modalVisible}
          selectedOptionsCount={pickerState.selectedOptions.length}
          onClear={pickerState.handleClear}
          clearAccessibilityLabel={clearAccessibilityLabel}
          testID={testID}
        />
      </TouchableOpacity>

      {/* Selected Chips (Multi-select) */}
      <PickerChips
        selectedOptions={pickerState.selectedOptions}
        onRemoveChip={pickerState.handleChipRemove}
        testID={testID}
      />

      {/* Error Message */}
      {error && <AtomicText style={errorStyles}>{error}</AtomicText>}

      {/* Selection Modal */}
      <PickerModal
        visible={pickerState.modalVisible}
        onClose={pickerState.closeModal}
        options={options}
        selectedValues={pickerState.selectedValues}
        onSelect={pickerState.handleSelect}
        title={modalTitle || label}
        searchable={searchable}
        searchQuery={pickerState.searchQuery}
        onSearchChange={pickerState.handleSearch}
        filteredOptions={pickerState.filteredOptions}
        multiple={multiple}
        emptyMessage={emptyMessage}
        searchPlaceholder={searchPlaceholder}
        closeAccessibilityLabel={closeAccessibilityLabel}
        testID={testID}
      />
    </View>
  );
};
