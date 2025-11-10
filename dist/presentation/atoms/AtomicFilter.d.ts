import React from 'react';
import { AtomicFilterProps } from './filter/types';
export type { FilterOption, AtomicFilterProps } from './filter/types';
export { getFilterContainerStyle, getClearAllContainerStyle, getScrollContentContainerStyle, } from './filter/styles/filterStyles';
/**
 * AtomicFilter - Horizontal Filter Chip Component
 *
 * A Material Design 3 compliant filter component using chip selection.
 * Supports single and multi-select modes with "Clear All" functionality.
 *
 * @example
 * ```tsx
 * const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
 *
 * <AtomicFilter
 *   options={[
 *     { id: 'active', label: 'Active', icon: 'check-circle' },
 *     { id: 'completed', label: 'Completed', icon: 'check' },
 *     { id: 'pending', label: 'Pending', icon: 'clock' },
 *   ]}
 *   selectedIds={selectedFilters}
 *   onSelectionChange={setSelectedFilters}
 *   multiSelect={true}
 *   showClearAll={true}
 * />
 * ```
 *
 * Features:
 * - Horizontal scrollable filter chips
 * - Single/Multi-select modes
 * - Clear all button (when filters active)
 * - Theme-aware colors from design tokens
 * - Icon support per filter option
 * - Fully controlled component
 */
export declare const AtomicFilter: React.FC<AtomicFilterProps>;
