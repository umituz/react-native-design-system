/**
 * AtomicNumberInput Component
 *
 * A specialized number input component that wraps AtomicInput with
 * number-specific validation and keyboard handling.
 *
 * Features:
 * - Numeric keyboard (integer or decimal)
 * - Min/max validation
 * - Step increment support
 * - Automatic error states for invalid numbers
 * - Parsed number callback (onValueChange)
 * - Consistent styling with AtomicInput
 * - All AtomicInput features (variants, states, sizes)
 *
 * Usage:
 * ```tsx
 * const [age, setAge] = useState<number | null>(null);
 *
 * <AtomicNumberInput
 *   value={age?.toString() || ''}
 *   onValueChange={setAge}
 *   label="Age"
 *   min={0}
 *   max={150}
 *   helperText="Enter your age"
 * />
 * ```
 *
 * Why This Component:
 * - Separation of concerns (text vs number input)
 * - Built-in number validation
 * - Type-safe number callbacks
 * - Prevents non-numeric input via keyboard
 * - Consistent with AtomicInput styling
 *
 * @module AtomicNumberInput
 */
import React from 'react';
import { AtomicInputProps } from './AtomicInput';
/**
 * Props for AtomicNumberInput component
 * Extends AtomicInput but removes text-specific props
 */
export interface AtomicNumberInputProps extends Omit<AtomicInputProps, 'keyboardType' | 'secureTextEntry' | 'showPasswordToggle' | 'onChangeText'> {
    /** Minimum allowed value */
    min?: number;
    /** Maximum allowed value */
    max?: number;
    /** Step increment (for spinners, future feature) */
    step?: number;
    /** Allow decimal numbers (default: false for integers only) */
    allowDecimal?: boolean;
    /** Callback when valid number is entered (null if invalid/empty) */
    onValueChange?: (value: number | null) => void;
    /** Callback when raw text changes (optional) */
    onTextChange?: (text: string) => void;
}
/**
 * AtomicNumberInput - Specialized numeric input component
 *
 * Wraps AtomicInput with:
 * - Numeric keyboard
 * - Number validation (min, max, format)
 * - Parsed number callbacks
 * - Automatic error states
 */
export declare const AtomicNumberInput: React.FC<AtomicNumberInputProps>;
