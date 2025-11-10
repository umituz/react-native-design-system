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
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDesignTokens } from '@umituz/react-native-theme';
export const ScreenLayout = ({ children, scrollable = true, edges = ['top'], header, footer, backgroundColor, containerStyle, contentContainerStyle, testID, hideScrollIndicator = false, keyboardAvoiding = false, }) => {
    // Automatically uses current theme from global store
    const tokens = useAppDesignTokens();
    const styles = useMemo(() => getStyles(tokens), [tokens]);
    const bgColor = backgroundColor || tokens.colors.backgroundPrimary;
    // Non-scrollable layout
    if (!scrollable) {
        return (<SafeAreaView style={[styles.container, { backgroundColor: bgColor }, containerStyle]} edges={edges} testID={testID}>
        {header}
        <View style={[styles.content, contentContainerStyle]}>
          {children}
        </View>
        {footer}
      </SafeAreaView>);
    }
    // Scrollable layout (default)
    return (<SafeAreaView style={[styles.container, { backgroundColor: bgColor }, containerStyle]} edges={edges} testID={testID}>
      {header}
      <ScrollView style={styles.scrollView} contentContainerStyle={[styles.scrollContent, contentContainerStyle]} showsVerticalScrollIndicator={!hideScrollIndicator} keyboardShouldPersistTaps={keyboardAvoiding ? 'handled' : 'never'}>
        {children}
      </ScrollView>
      {footer}
    </SafeAreaView>);
};
const getStyles = (tokens) => StyleSheet.create({
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
