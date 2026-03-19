
import React, { useMemo, useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { AtomicChip } from '../../atoms/chip/AtomicChip';
import { useAppDesignTokens } from '../../theme';
import type { FilterGroupProps } from './types';

export const FilterGroup = React.memo(function FilterGroup<T = string>({
  items,
  selectedValue,
  onSelect,
  multiSelect = false,
  style,
  contentContainerStyle,
  itemStyle,
}: FilterGroupProps<T>) {
  const tokens = useAppDesignTokens();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flexGrow: 0,
    },
    content: {
      paddingHorizontal: tokens.spacing.md,
      gap: tokens.spacing.md,
      alignItems: 'center',
    },
    item: {
    },
  }), [tokens.spacing.md]);

  // Memoize selected items to prevent unnecessary re-renders
  const selectedSet = useMemo(() => {
    if (multiSelect && Array.isArray(selectedValue)) {
      return new Set(selectedValue);
    }
    return new Set(selectedValue !== undefined ? [selectedValue] : []);
  }, [selectedValue, multiSelect]);

  // Memoize isSelected calculation for each item
  const isSelected = useCallback((value: any) => selectedSet.has(value), [selectedSet]);

  // Memoized chip renderer
  const renderChip = useCallback((item: any) => (
    <AtomicChip
      key={String(item.value)}
      variant={isSelected(item.value) ? 'filled' : 'outlined'}
      color={isSelected(item.value) ? 'primary' : 'secondary'}
      selected={isSelected(item.value)}
      onPress={() => onSelect(item.value)}
      clickable
      style={[styles.item, itemStyle]}
      testID={item.testID}
    >
      {item.label}
    </AtomicChip>
  ), [isSelected, onSelect, styles.item, itemStyle]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      style={[styles.container, style]}
      contentContainerStyle={[styles.content, contentContainerStyle]}
    >
      {items.map(renderChip)}
    </ScrollView>
  );
});
