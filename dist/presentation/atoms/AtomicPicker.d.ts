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
import { AtomicPickerProps } from './picker/types';
export type { AtomicPickerProps, PickerOption, PickerSize } from './picker/types';
/**
 * AtomicPicker - Universal option picker component
 *
 * Displays a button that opens a modal for selection.
 * Supports single/multi-select, search, and custom rendering.
 */
export declare const AtomicPicker: React.FC<AtomicPickerProps>;
