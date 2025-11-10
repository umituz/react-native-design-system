/**
 * SectionHeader Molecule - Universal Section Header
 *
 * Displays section title with optional subtitle
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: MOLECULE
 * Composition: AtomicText + Layout
 *
 * Usage:
 * - List headers
 * - Grid headers
 * - Section dividers
 * - Screen headers
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AtomicText } from '../atoms/AtomicText';
import { useAppDesignTokens } from '@umituz/react-native-theme';
// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================
export const SectionHeader = ({ title, subtitle, titleColor, subtitleColor, style, titleStyle, subtitleStyle, rightAction, }) => {
    const tokens = useAppDesignTokens();
    const styles = getStyles(tokens);
    return (<View style={[styles.container, style]}>
      <View style={styles.textContainer}>
        <AtomicText type="headlineLarge" color={titleColor || "primary"} style={StyleSheet.flatten([
            styles.title,
            titleStyle,
        ])}>
          {title}
        </AtomicText>
        {subtitle && (<AtomicText type="bodyMedium" color={subtitleColor || "secondary"} style={StyleSheet.flatten([
                styles.subtitle,
                subtitleStyle,
            ])}>
            {subtitle}
          </AtomicText>)}
      </View>
      {rightAction && <View style={styles.rightAction}>{rightAction}</View>}
    </View>);
};
// =============================================================================
// STYLES
// =============================================================================
const getStyles = (tokens) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: tokens.typography.headlineLarge.fontSize,
        fontWeight: tokens.typography.headlineLarge.fontWeight,
        marginBottom: tokens.spacing.xs,
    },
    subtitle: {
        fontSize: tokens.typography.bodyMedium.fontSize,
    },
    rightAction: {
        marginLeft: tokens.spacing.sm,
    },
});
// =============================================================================
// EXPORTS
// =============================================================================
