/**
 * SectionContainer Molecule - Universal Section Wrapper
 *
 * Provides consistent section layout with optional title
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: MOLECULE
 * Composition: View + AtomicText + Layout
 *
 * Usage:
 * - Home screen sections
 * - Dashboard sections
 * - Settings groups
 * - Content sections
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { AtomicText } from '../atoms/AtomicText';
import { useAppDesignTokens } from '../hooks/useAppDesignTokens';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface SectionContainerProps {
  /** Section title (optional) */
  title?: string;
  /** Section title color (default: textPrimary) */
  titleColor?: string;
  /** Section title style override */
  titleStyle?: TextStyle;
  /** Container style override */
  style?: ViewStyle;
  /** Content to render inside section */
  children: React.ReactNode;
  /** Right action element (e.g., "See All" link) */
  rightAction?: React.ReactNode;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  titleColor,
  titleStyle,
  style,
  children,
  rightAction,
}) => {
  const tokens = useAppDesignTokens();
  const styles = getStyles(tokens);

  return (
    <View style={[styles.section, style]}>
      {title && (
        <View style={styles.header}>
          <AtomicText
            type="titleLarge"
            color={titleColor || "primary"}
            style={StyleSheet.flatten([
              styles.sectionTitle,
              titleStyle,
            ])}
          >
            {title}
          </AtomicText>
          {rightAction && <View style={styles.rightAction}>{rightAction}</View>}
        </View>
      )}
      {children}
    </View>
  );
};

// =============================================================================
// STYLES
// =============================================================================

const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) =>
  StyleSheet.create({
    section: {
      marginBottom: tokens.spacing.lg,
      paddingHorizontal: tokens.spacing.md,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: tokens.spacing.md,
    },
    sectionTitle: {
      fontSize: tokens.typography.titleLarge.fontSize,
      fontWeight: tokens.typography.titleLarge.fontWeight,
    },
    rightAction: {
      marginLeft: tokens.spacing.sm,
    },
  });

// =============================================================================
// EXPORTS
// =============================================================================

