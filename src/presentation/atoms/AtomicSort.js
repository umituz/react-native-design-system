import React from 'react';
import { ScrollView, View } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-theme';
import { AtomicChip } from './AtomicChip';
/**
 * AtomicSort - Horizontal Sort Chip Component
 *
 * A Material Design 3 compliant sort component using chip selection.
 * Supports single selection with ascending/descending direction toggle.
 *
 * @example
 * ```tsx
 * const [sortBy, setSortBy] = useState<string | null>('name');
 * const [sortDir, setSortDir] = useState<SortDirection>('asc');
 *
 * <AtomicSort
 *   options={[
 *     { id: 'name', label: 'Name', icon: 'sort-alpha' },
 *     { id: 'date', label: 'Date', icon: 'schedule' },
 *     { id: 'priority', label: 'Priority', icon: 'flag' },
 *   ]}
 *   selectedId={sortBy}
 *   sortDirection={sortDir}
 *   onSortChange={(id, dir) => {
 *     setSortBy(id);
 *     setSortDir(dir);
 *   }}
 *   showDirectionToggle={true}
 * />
 * ```
 *
 * Features:
 * - Horizontal scrollable sort chips
 * - Single selection (one active sort at a time)
 * - Direction toggle (click active chip to switch asc/desc)
 * - Visual arrow indicators (↑ asc, ↓ desc)
 * - Theme-aware colors from design tokens
 * - Icon support per sort option
 * - Fully controlled component
 *
 * Behavior:
 * - Click inactive chip → Selects it with ascending direction
 * - Click active chip → Toggles direction (asc ↔ desc)
 * - Visual feedback via filled variant for active sort
 */
export const AtomicSort = ({ options, selectedId, sortDirection, onSortChange, showDirectionToggle = true, variant = 'outlined', color = 'primary', size = 'md', style, testID, }) => {
    const tokens = useAppDesignTokens();
    /**
     * Handle sort chip press
     * - If clicking active chip: Toggle direction
     * - If clicking inactive chip: Select it with 'asc' direction
     */
    const handleSortPress = (optionId) => {
        if (selectedId === optionId) {
            const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            onSortChange(optionId, newDirection);
        }
        else {
            onSortChange(optionId, 'asc');
        }
    };
    const directionIcon = sortDirection === 'asc' ? 'arrow-upward' : 'arrow-downward';
    return (<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
            paddingHorizontal: tokens.spacing.sm,
            gap: tokens.spacing.sm,
        }} style={[style]} testID={testID}>
      <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
        {options.map((option) => {
            const isSelected = selectedId === option.id;
            return (<AtomicChip key={option.id} variant={isSelected ? 'filled' : variant} color={color} size={size} leadingIcon={option.icon} trailingIcon={isSelected && showDirectionToggle ? directionIcon : undefined} selected={isSelected} clickable={true} onPress={() => handleSortPress(option.id)} testID={`sort-chip-${option.id}`}>
              {option.label}
            </AtomicChip>);
        })}
      </View>
    </ScrollView>);
};
