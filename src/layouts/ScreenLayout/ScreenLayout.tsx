/**
 * ScreenLayout Component
 * Refactored: Extracted types, styles, and ContentWrapper
 */

import React, { useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDesignTokens } from '../../theme';
import { getScreenLayoutConfig } from '../../responsive/responsiveLayout';
import { ContentWrapper } from './components/ContentWrapper';
import { getScreenLayoutStyles } from './styles/screenLayoutStyles';
import type { ScreenLayoutProps } from './types';

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
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();

  // Get all responsive layout values from centralized config
  const layoutConfig = useMemo(
    () => getScreenLayoutConfig(insets),
    [insets]
  );

  // Use provided maxWidth or responsive default
  const finalMaxWidth = maxWidth || (responsiveEnabled ? layoutConfig.maxContentWidth : undefined);
  const horizontalPadding = responsiveEnabled ? layoutConfig.horizontalPadding : tokens.spacing.md;
  const verticalPadding = responsiveEnabled ? layoutConfig.verticalPadding : tokens.spacing.lg;

  // Pre-compute styles
  const styles = useMemo(
    () => getScreenLayoutStyles(tokens, { maxWidth: finalMaxWidth, horizontalPadding, verticalPadding }),
    [tokens, finalMaxWidth, horizontalPadding, verticalPadding]
  );

  const bgColor = backgroundColor || tokens.colors.backgroundPrimary;

  // Non-scrollable layout
  if (!scrollable) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: bgColor }, containerStyle]}
        edges={edges}
        testID={testID}
      >
        <ContentWrapper keyboardAvoiding={keyboardAvoiding}>
          <View style={styles.responsiveWrapper}>
            {header}
            <View style={[styles.content, contentContainerStyle]}>
              {children}
            </View>
            {footer}
          </View>
        </ContentWrapper>
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
      <ContentWrapper keyboardAvoiding={keyboardAvoiding}>
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
      </ContentWrapper>
    </SafeAreaView>
  );
};

// Re-export types for convenience
export type { ScreenLayoutProps } from './types';
