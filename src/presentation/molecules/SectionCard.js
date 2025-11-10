/**
 * SectionCard Molecule Component
 *
 * Reusable section card with title and content area.
 * Used throughout settings screens for consistent grouping.
 *
 * Features:
 * - Automatic theme-aware styling
 * - Uppercase section titles with proper spacing
 * - Built on AtomicCard for consistency
 * - Flexible content area
 *
 * Atomic Design: Molecule (Card + Text)
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-theme';
import { AtomicCard } from '../atoms/AtomicCard';
import { AtomicText } from '../atoms/AtomicText';
export const SectionCard = ({ title, children, style, contentStyle, testID, }) => {
    const tokens = useAppDesignTokens();
    const styles = getStyles(tokens);
    return (<AtomicCard variant="outlined" style={StyleSheet.flatten([styles.card, style])} testID={testID}>
      <AtomicText type="labelLarge" color={tokens.colors.textSecondary} style={styles.title}>
        {title.toUpperCase()}
      </AtomicText>
      <View style={contentStyle}>
        {children}
      </View>
    </AtomicCard>);
};
const getStyles = (tokens) => StyleSheet.create({
    card: {
        paddingVertical: tokens.spacing.md,
        paddingHorizontal: 0,
        marginHorizontal: tokens.spacing.md,
        marginBottom: tokens.spacing.lg,
    },
    title: {
        fontSize: tokens.typography.labelLarge.fontSize,
        fontWeight: tokens.typography.labelLarge.fontWeight,
        letterSpacing: 0.5,
        paddingHorizontal: tokens.spacing.md,
        marginBottom: tokens.spacing.sm,
    },
});
