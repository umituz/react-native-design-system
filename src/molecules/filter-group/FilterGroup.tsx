
import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { AtomicChip } from '../../atoms/chip';
import { useAppDesignTokens } from '../../theme';
import type { FilterGroupProps } from './types';

export function FilterGroup<T = string>({
  items,
  selectedValue,
  onSelect,
  style,
  contentContainerStyle,
  itemStyle,
}: FilterGroupProps<T>) {
  const tokens = useAppDesignTokens();

  const styles = StyleSheet.create({
    container: {
      flexGrow: 0,
    },
    content: {
      paddingHorizontal: tokens.spacing.md,
      gap: tokens.spacing.sm,
      alignItems: 'center',
    },
    item: {
      // Default styles if needed, though AtomicChip handles most
    },
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.container, style]}
      contentContainerStyle={[styles.content, contentContainerStyle]}
    >
      {items.map((item) => {
        const isSelected = item.value === selectedValue;
        return (
          <AtomicChip
            key={`${item.value}`}
            variant={isSelected ? 'filled' : 'outlined'}
            color={isSelected ? 'primary' : 'surface'}
            selected={isSelected}
            onPress={() => onSelect(item.value)}
            clickable
            style={[styles.item, itemStyle]}
            testID={item.testID}
          >
            {item.label}
          </AtomicChip>
        );
      })}
    </ScrollView>
  );
}
