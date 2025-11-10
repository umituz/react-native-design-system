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
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, useWindowDimensions, } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDesignTokens } from '@umituz/react-native-theme';
import { useResponsive } from '../hooks/useResponsive';
import { AtomicIcon } from './AtomicIcon';
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
export const AtomicDatePicker = ({ value, onChange, label, error, disabled = false, minimumDate, maximumDate, mode = 'date', placeholder = 'Select date', testID, }) => {
    const tokens = useAppDesignTokens();
    const { height } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const { isTabletDevice } = useResponsive();
    const [show, setShow] = useState(false);
    /**
     * Handle date/time change
     * Universal handler that works across all platforms
     * Note: event.type can be 'set', 'dismissed', or 'neutralButtonPressed'
     */
    const handleChange = (event, selectedDate) => {
        // Close picker when user confirms or dismisses
        // iOS: Stays open until "Done" button (handled separately)
        // Android/Web: Auto-closes on selection
        if (event.type === 'set' || event.type === 'dismissed') {
            setShow(false);
        }
        // Update value only if date was selected (not dismissed)
        if (event.type === 'set' && selectedDate) {
            onChange(selectedDate);
        }
    };
    /**
     * Format date based on mode
     * Uses native Date formatting (locale-aware)
     */
    const formatDate = (date) => {
        if (mode === 'time') {
            // Format time only
            return date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        if (mode === 'datetime') {
            // Format date + time
            const dateStr = date.toLocaleDateString([], {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
            const timeStr = date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
            return `${dateStr} ${timeStr}`;
        }
        // Format date only
        return date.toLocaleDateString([], {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    /**
     * Determine icon color based on state
     */
    const getIconColor = () => {
        if (disabled)
            return 'secondary';
        if (error)
            return 'error';
        return 'primary';
    };
    const styles = getStyles(tokens, height, insets);
    return (<View style={styles.container} testID={testID}>
      {label && (<Text style={styles.label} testID={testID ? `${testID}-label` : undefined}>
          {label}
        </Text>)}

      <TouchableOpacity style={[
            styles.button,
            error ? styles.buttonError : undefined,
            disabled ? styles.buttonDisabled : undefined,
        ]} onPress={() => !disabled && setShow(true)} disabled={disabled} testID={testID ? `${testID}-button` : undefined} accessibilityLabel={label || placeholder} accessibilityRole="button" accessibilityState={{ disabled }}>
        <AtomicIcon name="calendar" color={getIconColor()} size="md"/>
        <Text style={[
            styles.text,
            disabled ? styles.textDisabled : undefined,
            error ? styles.textError : undefined,
        ]}>
          {value ? formatDate(value) : placeholder}
        </Text>
      </TouchableOpacity>

      {error && (<Text style={styles.errorText} testID={testID ? `${testID}-error` : undefined}>
          {error}
        </Text>)}

      {/* Universal DatePicker - Works across iOS, Android, Web */}
      {show && (<Modal transparent animationType={isTabletDevice ? 'fade' : 'slide'} visible={show} onRequestClose={() => setShow(false)}>
          <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShow(false)} accessibilityLabel="Close date picker" accessibilityRole="button">
            <View style={styles.pickerContainer} onStartShouldSetResponder={() => true}>
              <DateTimePicker value={value || new Date()} mode={mode} display="spinner" onChange={handleChange} minimumDate={minimumDate} maximumDate={maximumDate} testID={testID ? `${testID}-picker` : undefined}/>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.doneButton} onPress={() => setShow(false)} testID={testID ? `${testID}-done` : undefined} accessibilityLabel="Done" accessibilityRole="button">
                  <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>)}
    </View>);
};
/**
 * Get component styles based on design tokens
 */
const getStyles = (tokens, height, insets) => {
    // Responsive button sizing based on device height
    const buttonMinWidth = height <= 667 ? Math.min(height * 0.25, 150) : 200;
    return StyleSheet.create({
        container: {
            marginBottom: tokens.spacing.md,
        },
        label: {
            fontSize: tokens.typography.bodyMedium.fontSize,
            fontWeight: tokens.typography.semibold,
            color: tokens.colors.textPrimary,
            marginBottom: tokens.spacing.sm,
        },
        button: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: tokens.colors.surface,
            borderWidth: 1,
            borderColor: tokens.colors.border,
            borderRadius: tokens.borders.radius.lg,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.md,
            gap: tokens.spacing.sm,
            minHeight: 48, // Apple HIG minimum touch target
        },
        buttonError: {
            borderColor: tokens.colors.error,
            borderWidth: tokens.borders.width.medium,
        },
        buttonDisabled: {
            backgroundColor: tokens.colors.surfaceDisabled,
            opacity: tokens.opacity.disabled,
        },
        text: {
            flex: 1,
            fontSize: tokens.typography.bodyLarge.fontSize,
            color: tokens.colors.textPrimary,
        },
        textDisabled: {
            color: tokens.colors.textDisabled,
        },
        textError: {
            color: tokens.colors.error,
        },
        errorText: {
            fontSize: tokens.typography.bodySmall.fontSize,
            color: tokens.colors.error,
            marginTop: tokens.spacing.xs,
            marginLeft: tokens.spacing.xs,
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-start',
        },
        pickerContainer: {
            backgroundColor: tokens.colors.surface,
            borderTopLeftRadius: tokens.borders.radius.xl,
            borderTopRightRadius: tokens.borders.radius.xl,
            paddingTop: tokens.spacing.lg,
            paddingBottom: Math.max(insets.bottom + tokens.spacing.md, tokens.spacing.xl),
        },
        buttonContainer: {
            alignItems: 'center',
            marginTop: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.lg,
        },
        doneButton: {
            backgroundColor: tokens.colors.primary,
            paddingHorizontal: tokens.spacing.xl,
            paddingVertical: tokens.spacing.sm,
            borderRadius: tokens.borders.radius.lg,
            minWidth: buttonMinWidth,
            alignItems: 'center',
            minHeight: 44, // Apple HIG minimum touch target
        },
        doneText: {
            color: tokens.colors.onPrimary,
            fontSize: tokens.typography.bodyLarge.fontSize,
            fontWeight: tokens.typography.semibold,
        },
    });
};
