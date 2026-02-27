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

export const ScreenLayout: React.FC<ScreenLayoutProps> = (props: ScreenLayoutProps) => {
  const {
    children,
    scrollable = true,
    edges = ['top', 'bottom', 'left', 'right'],
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
  } = props;
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
  
  // Robust safe area handling
  const paddingTop = edges.includes('top') ? insets.top : 0;
  const paddingBottom = edges.includes('bottom') ? insets.bottom : 0;
  const paddingLeft = edges.includes('left') ? insets.left : 0;
  const paddingRight = edges.includes('right') ? insets.right : 0;

  const content = (
    <View style={[
      styles.responsiveWrapper,
      {
        paddingTop,
        paddingBottom: footer ? 0 : paddingBottom,
        paddingLeft,
        paddingRight,
      }
    ]}>
      {header}
      {scrollable ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent, 
            contentContainerStyle,
          ]}
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
      {footer && (
        <View style={{ paddingBottom }}>
          {footer}
        </View>
      )}
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: bgColor }, containerStyle]}
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
    </View>
  );
};

// Re-export types for convenience
export type { ScreenLayoutProps } from './types';
