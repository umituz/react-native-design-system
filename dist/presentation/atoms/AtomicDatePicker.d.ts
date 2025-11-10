/**
 * AtomicDatePicker Component
 *
 * A reusable date picker component that wraps the native date picker
 * with consistent styling and behavior across platforms.
 *
 * Features:
 * - Platform-specific native pickers (iOS wheel, Android dialog)
 * - Consistent styling with design tokens
 * - Locale-aware date/time formatting (native Date methods)
 * - Timezone-aware (respects device timezone)
 * - Automatic language integration (native locale support)
 * - Optional label and error states
 * - Minimum and maximum date constraints
 * - Disabled state support
 * - Theme-aware styling
 * - Proper keyboard avoidance on iOS
 *
 * Usage:
 * ```tsx
 * const [selectedDate, setSelectedDate] = useState(new Date());
 *
 * <AtomicDatePicker
 *   value={selectedDate}
 *   onChange={setSelectedDate}
 *   label="Birth Date"
 *   minimumDate={new Date(1900, 0, 1)}
 *   maximumDate={new Date()}
 * />
 * ```
 *
 * Platform Behavior:
 * - iOS: Opens modal with spinner wheel, requires "Done" button
 * - Android: Opens native dialog, auto-closes on selection
 *
 * @module AtomicDatePicker
 */
import React from 'react';
/**
 * Props for AtomicDatePicker component
 */
export interface AtomicDatePickerProps {
    /** Selected date value */
    value: Date;
    /** Callback when date changes */
    onChange: (date: Date) => void;
    /** Optional label displayed above picker */
    label?: string;
    /** Optional error message displayed below picker */
    error?: string;
    /** Disable picker interaction */
    disabled?: boolean;
    /** Minimum selectable date */
    minimumDate?: Date;
    /** Maximum selectable date */
    maximumDate?: Date;
    /** Picker mode - date, time, or datetime (iOS only) */
    mode?: 'date' | 'time' | 'datetime';
    /** Placeholder text when no value selected */
    placeholder?: string;
    /** Optional test ID for E2E testing */
    testID?: string;
}
/**
 * AtomicDatePicker - Universal date/time picker component
 *
 * Wraps @react-native-community/datetimepicker with:
 * - Theme integration
 * - Platform-specific modal handling
 * - Error states
 * - Disabled states
 * - Responsive sizing
 */
export declare const AtomicDatePicker: React.FC<AtomicDatePickerProps>;
