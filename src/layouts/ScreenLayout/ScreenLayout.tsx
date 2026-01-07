/**
 * ScreenLayout Component
 * Refactored: Extracted types, styles, and ContentWrapper
 */

import React, { useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDesignTokens } from '../../theme';
import { getScreenLayoutConfig } from '../../responsive/responsiveLayout';
import { AtomicKeyboardAvoidingView } from '../../atoms';
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

  // Use centralized layout config for consistency
  const finalMaxWidth = maxWidth || layoutConfig.maxContentWidth;
  const horizontalPadding = layoutConfig.horizontalPadding;
  const verticalPadding = layoutConfig.verticalPadding;

  // Pre-compute styles
  const styles = useMemo(
    () => getScreenLayoutStyles({ maxWidth: finalMaxWidth, horizontalPadding, verticalPadding }),
    [finalMaxWidth, horizontalPadding, verticalPadding]
  );

  const bgColor = backgroundColor || tokens.colors.backgroundPrimary;
  
  const content = (
    <View style={styles.responsiveWrapper}>
      {header}
      {scrollable ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          showsVerticalScrollIndicator={!hideScrollIndicator}
          keyboardShouldPersistTaps={keyboardAvoiding ? 'handled' : 'never'}
          refreshControl={refreshControl}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.content, contentContainerStyle]}>
          {children}
        </View>
      )}
      {footer}
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: bgColor }, containerStyle]}
      edges={edges}
      testID={testID}
    >
      {keyboardAvoiding ? (
         <AtomicKeyboardAvoidingView style={styles.keyboardAvoidingView}>
           {content}
         </AtomicKeyboardAvoidingView>
      ) : (
         <View style={styles.keyboardAvoidingView}>
           {content}
         </View>
      )}
    </SafeAreaView>
  );
};

// Re-export types for convenience
export type { ScreenLayoutProps } from './types';
