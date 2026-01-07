import { useState, useMemo } from 'react';
import type { PickerOption } from '../../picker/types';

interface UsePickerStateProps {
  value: string | string[] | null;
  multiple: boolean;
  options: PickerOption[];
  placeholder?: string;
  autoClose?: boolean;
  onChange: (value: string | string[]) => void;
}

export const usePickerState = ({
  value,
  multiple,
  options,
  placeholder,
  autoClose = true,
  onChange,
}: UsePickerStateProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Normalize value to array for consistent handling
   */
  const selectedValues = useMemo(() => {
    if (multiple) {
      return Array.isArray(value) ? value : [];
    }
    return value ? [value as string] : [];
  }, [value, multiple]);

  /**
   * Get selected option objects
   */
  const selectedOptions = useMemo(() => {
    return options.filter((opt) => selectedValues.includes(opt.value));
  }, [options, selectedValues]);

  /**
   * Filter options based on search query
   */
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;

    const query = searchQuery.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        opt.description?.toLowerCase().includes(query)
    );
  }, [options, searchQuery]);

  /**
   * Format display text for selected value(s)
   */
  const displayText = useMemo(() => {
    if (selectedOptions.length === 0) {
      return placeholder;
    }

    if (multiple) {
      return selectedOptions.length === 1
        ? selectedOptions[0]?.label || placeholder
        : `${selectedOptions.length} selected`;
    }
    return selectedOptions[0]?.label || placeholder;
  }, [selectedOptions, placeholder, multiple]);

  /**
   * Handle modal open
   */
  const openModal = () => {
    setModalVisible(true);
    setSearchQuery('');
  };

  /**
   * Handle modal close
   */
  const closeModal = () => {
    setModalVisible(false);
    setSearchQuery('');
  };

  /**
   * Handle option selection
   */
  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      onChange(newValues);
    } else {
      onChange(optionValue);
      if (autoClose) {
        closeModal();
      }
    }
  };

  /**
   * Handle clear selection
   */
  const handleClear = () => {
    onChange(multiple ? [] : '');
  };

  /**
   * Handle search query change
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  /**
   * Handle chip removal
   */
  const handleChipRemove = (value: string) => {
    handleSelect(value);
  };

  return {
    modalVisible,
    searchQuery,
    selectedValues,
    selectedOptions,
    filteredOptions,
    displayText,
    openModal,
    closeModal,
    handleSelect,
    handleClear,
    handleSearch,
    handleChipRemove,
  };
};
