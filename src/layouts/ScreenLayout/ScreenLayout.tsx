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
import { View, ScrollView, StyleSheet, type ViewStyle, RefreshControlProps } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Edge } from 'react-native-safe-area-context';
import { useAppDesignTokens } from '../../theme';
import { getResponsiveHorizontalPadding } from '../../responsive/responsiveLayout';
import { isTablet as checkIsTablet } from '../../device/detection';

/**
 * NOTE: This component now works in conjunction with the SafeAreaProvider
 * from our safe-area module. The SafeAreaProvider should wrap your app root:
 * 
 * import { SafeAreaProvider } from '../../index';
 * 
 * function App() {
 *   return (
 *     <SafeAreaProvider>
 *       <YourApp />
 *     </SafeAreaProvider>
 *   );
 * }
 */

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

  /**
   * Accessibility label for the layout
   */
  accessibilityLabel?: string;

  /**
   * Accessibility hint for the layout
   */
  accessibilityHint?: string;

  /**
   * Whether the layout is accessible
   */
  accessible?: boolean;

  /**
   * Enable responsive content width and centering (default: true)
   */
  responsiveEnabled?: boolean;

  /**
   * Maximum content width override
   */
  maxWidth?: number;

  /**
   * RefreshControl component for pull-to-refresh
   */
  refreshControl?: React.ReactElement<RefreshControlProps>;
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
  responsiveEnabled = true,
  maxWidth,
  refreshControl,
}) => {
  // Automatically uses current theme from global store
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const isTabletDevice = checkIsTablet();

  // Only apply maxWidth for tablets - phones should fill full width
  const finalMaxWidth = maxWidth || (responsiveEnabled && isTabletDevice ? 600 : undefined);
  const horizontalPadding = responsiveEnabled ? getResponsiveHorizontalPadding(tokens.spacing.md, insets) : tokens.spacing.md;

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
    },
    responsiveWrapper: {
      flex: 1,
      width: '100%',
      ...(finalMaxWidth ? { maxWidth: finalMaxWidth, alignSelf: 'center' as const } : {}),
    },
    content: {
      flex: 1,
      paddingHorizontal: horizontalPadding,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: horizontalPadding,
      paddingBottom: tokens.spacing.lg,
    },
  }), [tokens, finalMaxWidth, horizontalPadding]);

  const bgColor = backgroundColor || tokens.colors.backgroundPrimary;

  // Non-scrollable layout
  if (!scrollable) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: bgColor }, containerStyle]}
        edges={edges}
        testID={testID}
      >
        <View style={styles.responsiveWrapper}>
          {header}
          <View style={[styles.content, contentContainerStyle]}>
            {children}
          </View>
          {footer}
        </View>
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
      <View style={styles.responsiveWrapper}>
        {header}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          showsVerticalScrollIndicator={!hideScrollIndicator}
          keyboardShouldPersistTaps={keyboardAvoiding ? 'handled' : 'never'}
          refreshControl={refreshControl}
        >
          {children}
        </ScrollView>
        {footer}
      </View>
    </SafeAreaView>
  );
};
