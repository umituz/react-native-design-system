/**
 * GridContainer Molecule - Responsive Grid Layout
 *
 * Provides flexible grid layout with configurable columns and gap
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: MOLECULE
 * Composition: View + Responsive Layout
 *
 * Usage:
 * - Stats grids (2 columns)
 * - Action grids (2 columns)
 * - Product grids (2-3 columns)
 * - Gallery grids (3-4 columns)
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, DimensionValue } from 'react-native';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface GridContainerProps {
  /** Number of columns (default: 2) */
  columns?: 2 | 3 | 4;
  /** Gap between items in pixels (default: 8) */
  gap?: number;
  /** Container style override */
  style?: ViewStyle;
  /** Grid items to render */
  children: React.ReactNode;
}

export interface GridItemProps {
  /** Item content */
  children: React.ReactNode;
  /** Item style override */
  style?: ViewStyle;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

const GridContainerComponent: React.FC<GridContainerProps> = ({
  columns = 2,
  gap = 8,
  style,
  children,
}) => {
  const styles = getStyles(gap);

  return (
    <View style={[styles.container, style]}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<GridItemProps>(child)) {
          const childStyle = child.props.style;
          const itemStyle = getItemStyle(columns, gap);
          return React.cloneElement(child, {
            style: StyleSheet.flatten([itemStyle, childStyle]),
          });
        }
        return child;
      })}
    </View>
  );
};

// =============================================================================
// GRID ITEM COMPONENT
// =============================================================================

export const GridItem: React.FC<GridItemProps> = ({ children, style }) => {
  return <View style={style}>{children}</View>;
};

// Export GridContainer with Item property
export const GridContainer = GridContainerComponent as typeof GridContainerComponent & {
  Item: typeof GridItem;
};

// Attach GridItem to GridContainer for convenient usage
GridContainer.Item = GridItem;

// =============================================================================
// HELPERS
// =============================================================================

const getItemStyle = (columns: number, gap: number): ViewStyle => {
  // Calculate width: (100% - total gap space) / columns
  // For 2 columns with 8px gap: (100% - 8px) / 2 = ~48%
  // For 3 columns with 8px gap: (100% - 16px) / 3 = ~31.33%

  const widthMap: Record<number, DimensionValue> = {
    2: '48%' as DimensionValue,
    3: '31.33%' as DimensionValue,
    4: '23%' as DimensionValue,
  };

  return {
    width: widthMap[columns] || ('48%' as DimensionValue),
    marginHorizontal: gap / 2,
    marginBottom: gap * 1.5,
  };
};

// =============================================================================
// STYLES
// =============================================================================

const getStyles = (gap: number) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
      marginHorizontal: -(gap / 2),
    },
  });

// =============================================================================
// EXPORTS
// =============================================================================

