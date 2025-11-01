/**
 * FormContainer Component
 *
 * A reusable container for forms with Material Design 3 integration,
 * proper keyboard handling, and responsive layout.
 *
 * Features:
 * - Material Design 3 Surface component for elevation and theme integration
 * - Universal keyboard handling (no platform-specific code)
 * - ScrollView with automatic content padding
 * - Safe area insets for bottom tab navigation overlap
 * - Responsive max width for large screens (tablets)
 * - Consistent vertical spacing between form elements
 * - Theme-aware surface colors and elevation
 * - Optimized performance with memoized styles
 *
 * Usage:
 * ```tsx
 * <FormContainer>
 *   <AtomicInput label="Name" value={name} onChangeText={setName} />
 *   <AtomicTextArea label="Description" value={desc} onChangeText={setDesc} />
 *   <AtomicButton variant="primary" onPress={handleSubmit}>
 *     Submit
 *   </AtomicButton>
 * </FormContainer>
 * ```
 *
 * Why This Component:
 * - Prevents keyboard from covering input fields (universal solution)
 * - Handles safe area (notch, bottom tabs) automatically
 * - Consistent form layout across all 100+ generated apps
 * - Responsive design for tablets (max 700px) and phones (full width)
 * - Automatic vertical spacing between form elements (no manual marginBottom)
 * - Material Design 3 surface with proper elevation
 * - Reduces boilerplate in form screens
 * - Universal code - no platform checks, works on iOS, Android, Web
 *
 * Technical Details:
 * - Uses ScrollView with contentContainerStyle for keyboard handling
 * - React Native Paper Surface for Material Design 3 integration
 * - Vertical spacing via Children.map() wrapping (universal compatibility)
 * - Safe area insets from react-native-safe-area-context
 * - Responsive values from useResponsive hook
 *
 * @module FormContainer
 */

import React, { useMemo, Children } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Surface } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDesignTokens } from '../hooks/useAppDesignTokens';
import { useResponsive } from '../hooks/useResponsive';

/**
 * Props for FormContainer component
 */
export interface FormContainerProps {
  /** Form content (inputs, buttons, etc.) */
  children: React.ReactNode;
  /** Container style override (for outer View) */
  containerStyle?: StyleProp<ViewStyle>;
  /** Content container style override (for ScrollView content) */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Show vertical scroll indicator */
  showsVerticalScrollIndicator?: boolean;
  /** Optional test ID for E2E testing */
  testID?: string;
  /** Disable Material Design elevation (default: false) */
  disableElevation?: boolean;
}

/**
 * FormContainer - Universal form wrapper component
 *
 * Wraps forms with:
 * - Material Design 3 Surface component
 * - Universal keyboard handling (no platform checks)
 * - ScrollView for content overflow
 * - Safe area insets (bottom tabs, notch)
 * - Responsive max width (tablets)
 * - Theme integration
 */
export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  containerStyle,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  testID,
  disableElevation = false,
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const { formContentWidth, formBottomPadding, formElementSpacing } = useResponsive();

  // Memoize styles to prevent recreation on every render
  // Only recreate when theme colors or responsive values change
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: tokens.colors.backgroundPrimary,
        },
        surface: {
          flex: 1,
          backgroundColor: tokens.colors.surface,
        },
        scrollView: {
          flex: 1,
        },
        contentContainer: {
          flexGrow: 1,
          padding: tokens.spacing.lg,
          paddingTop: tokens.spacing.xl,
          // Bottom padding: base + safe area insets for tab bar
          paddingBottom: formBottomPadding + insets.bottom,
          // Responsive max width (undefined for phones, 700px for tablets)
          maxWidth: formContentWidth,
          alignSelf: 'center',
          width: '100%',
        },
        // Wrapper for each form element to add vertical spacing
        // This is the universal replacement for CSS gap property
        formElementWrapper: {
          marginBottom: formElementSpacing,
        },
      }),
    [
      tokens.colors.backgroundPrimary,
      tokens.colors.surface,
      tokens.spacing.lg,
      tokens.spacing.xl,
      formBottomPadding,
      formContentWidth,
      formElementSpacing,
      insets.bottom,
    ]
  );

  // Wrap each child with spacing View (universal gap replacement)
  // Children.map() handles arrays, fragments, single elements correctly
  const childrenWithSpacing = useMemo(() => {
    const childArray = Children.toArray(children);
    return childArray.map((child, index) => (
      <View
        key={index}
        style={index < childArray.length - 1 ? styles.formElementWrapper : undefined}
      >
        {child}
      </View>
    ));
  }, [children, styles.formElementWrapper]);

  return (
    <View style={[styles.container, containerStyle]} testID={testID}>
      <Surface
        style={styles.surface}
        elevation={disableElevation ? 0 : 1}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          testID={testID ? `${testID}-scroll` : undefined}
        >
          {childrenWithSpacing}
        </ScrollView>
      </Surface>
    </View>
  );
};
