/**
 * ScreenLayout - Universal Screen Container Component
 *
 * Provides consistent layout structure for all screens:
 * - SafeAreaView with configurable edges
 * - Optional ScrollView for content
 * - Theme-aware background colors
 * - Optional header/footer slots
 * - Consistent spacing and padding
 *
 * Usage:
 * <ScreenLayout>
 *   <View>Your content here</View>
 * </ScreenLayout>
 *
 * Advanced:
 * <ScreenLayout
 *   scrollable={false}
 *   edges={['top', 'bottom']}
 *   header={<CustomHeader />}
 * >
 *   <View>Content</View>
 * </ScreenLayout>
 */

import React, { useMemo } from 'react';
import { View, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { useAppDesignTokens } from '@umituz/react-native-theme';

export interface ScreenLayoutProps {
  /**
   * Content to render inside the layout
   */
  children: React.ReactNode;

  /**
   * Enable scrolling (default: true)
   * Set to false for screens with custom scroll logic
   */
  scrollable?: boolean;

  /**
   * Safe area edges to apply (default: ['top'])
   * Common values:
   * - ['top'] - For screens with bottom tabs
   * - ['top', 'bottom'] - For modal screens
   * - [] - No safe area (use cautiously)
   */
  edges?: Edge[];

  /**
   * Optional header component
   * Rendered above scrollable content
   */
  header?: React.ReactNode;

  /**
   * Optional footer component
   * Rendered below scrollable content
   */
  footer?: React.ReactNode;

  /**
   * Override background color
   * If not provided, uses theme's backgroundPrimary
   */
  backgroundColor?: string;

  /**
   * Custom container style
   */
  containerStyle?: ViewStyle;

  /**
   * Custom content container style (for ScrollView)
   */
  contentContainerStyle?: ViewStyle;

  /**
   * Test ID for automation
   */
  testID?: string;

  /**
   * Hide vertical scroll indicator (default: false)
   */
  hideScrollIndicator?: boolean;

  /**
   * Enable keyboard avoiding behavior (default: false)
   * Useful for screens with inputs
   */
  keyboardAvoiding?: boolean;

}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  scrollable = true,
  edges = ['top'],
  header,
  footer,
  backgroundColor,
  containerStyle,
  contentContainerStyle,
  testID,
  hideScrollIndicator = false,
  keyboardAvoiding = false,
}) => {
  // Automatically uses current theme from global store
  const tokens = useAppDesignTokens();
  const styles = useMemo(() => getStyles(tokens), [tokens]);

  const bgColor = backgroundColor || tokens.colors.backgroundPrimary;

  // Non-scrollable layout
  if (!scrollable) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: bgColor }, containerStyle]}
        edges={edges}
        testID={testID}
      >
        {header}
        <View style={[styles.content, contentContainerStyle]}>
          {children}
        </View>
        {footer}
      </SafeAreaView>
    );
  }

  // Scrollable layout (default)
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: bgColor }, containerStyle]}
      edges={edges}
      testID={testID}
    >
      {header}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        showsVerticalScrollIndicator={!hideScrollIndicator}
        keyboardShouldPersistTaps={keyboardAvoiding ? 'handled' : 'never'}
      >
        {children}
      </ScrollView>
      {footer}
    </SafeAreaView>
  );
};

const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: tokens.spacing.md,
      paddingBottom: tokens.spacing.lg,
    },
  });
