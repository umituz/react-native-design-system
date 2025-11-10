/**
 * EmptyState Molecule - Universal Empty State Display
 *
 * Displays icon, title, and subtitle for empty data scenarios
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: MOLECULE
 * Composition: Icon + AtomicText + Layout
 *
 * Usage:
 * - Empty lists
 * - Empty grids
 * - No search results
 * - No data states
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AtomicText, AtomicIcon } from '../atoms';
import { useAppDesignTokens } from '@umituz/react-native-theme';
// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================
export const EmptyState = ({ icon, iconSize = 'xl', title, subtitle, iconColor, titleColor, subtitleColor, style, titleStyle, subtitleStyle, }) => {
    const tokens = useAppDesignTokens();
    const styles = getStyles(tokens);
    return (<View style={[styles.container, style]}>
      <AtomicIcon name={icon} size={iconSize} customColor={iconColor || tokens.colors.textSecondary}/>
      <AtomicText type="headlineMedium" color={titleColor || tokens.colors.textPrimary} style={StyleSheet.flatten([
            styles.title,
            titleStyle,
        ])}>
        {title}
      </AtomicText>
      {subtitle && (<AtomicText type="bodyMedium" color={subtitleColor || tokens.colors.textSecondary} style={StyleSheet.flatten([
                styles.subtitle,
                subtitleStyle,
            ])}>
          {subtitle}
        </AtomicText>)}
    </View>);
};
// =============================================================================
// STYLES
// =============================================================================
const getStyles = (tokens) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: tokens.spacing.xl,
        paddingHorizontal: tokens.spacing.lg,
    },
    title: {
        fontSize: tokens.typography.headingMedium.fontSize,
        fontWeight: tokens.typography.headingMedium.fontWeight,
        marginTop: tokens.spacing.md,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: tokens.typography.bodySmall.fontSize,
        marginTop: tokens.spacing.xs,
        textAlign: 'center',
    },
});
// =============================================================================
// EXPORTS
// =============================================================================
