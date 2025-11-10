import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
/**
 * Sort option interface
 */
export interface SortOption {
    id: string;
    label: string;
    icon?: string;
}
/**
 * Sort direction type
 */
export type SortDirection = 'asc' | 'desc';
/**
 * AtomicSort component props
 */
export interface AtomicSortProps {
    options: SortOption[];
    selectedId: string | null;
    sortDirection: SortDirection;
    onSortChange: (optionId: string, direction: SortDirection) => void;
    showDirectionToggle?: boolean;
    variant?: 'outlined' | 'filled' | 'soft';
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md' | 'lg';
    style?: StyleProp<ViewStyle>;
    testID?: string;
}
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
export declare const AtomicSort: React.FC<AtomicSortProps>;
