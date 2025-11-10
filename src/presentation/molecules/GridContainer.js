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
import { View, StyleSheet } from 'react-native';
// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================
const GridContainerComponent = ({ columns = 2, gap = 8, style, children, }) => {
    const styles = getStyles(gap);
    return (<View style={[styles.container, style]}>
      {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                const childStyle = child.props.style;
                const itemStyle = getItemStyle(columns, gap);
                return React.cloneElement(child, {
                    style: StyleSheet.flatten([itemStyle, childStyle]),
                });
            }
            return child;
        })}
    </View>);
};
// =============================================================================
// GRID ITEM COMPONENT
// =============================================================================
export const GridItem = ({ children, style }) => {
    return <View style={style}>{children}</View>;
};
// Export GridContainer with Item property
export const GridContainer = GridContainerComponent;
// Attach GridItem to GridContainer for convenient usage
GridContainer.Item = GridItem;
// =============================================================================
// HELPERS
// =============================================================================
const getItemStyle = (columns, gap) => {
    // Calculate width: (100% - total gap space) / columns
    // For 2 columns with 8px gap: (100% - 8px) / 2 = ~48%
    // For 3 columns with 8px gap: (100% - 16px) / 3 = ~31.33%
    const widthMap = {
        2: '48%',
        3: '31.33%',
        4: '23%',
    };
    return {
        width: widthMap[columns] || '48%',
        marginHorizontal: gap / 2,
        marginBottom: gap * 1.5,
    };
};
// =============================================================================
// STYLES
// =============================================================================
const getStyles = (gap) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -(gap / 2),
    },
});
// =============================================================================
// EXPORTS
// =============================================================================
