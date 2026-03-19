/**
 * IconGrid - Reusable icon card grid
 *
 * Self-measuring grid that calculates item widths from actual container width.
 * Works correctly inside ScreenLayout (or any padded container) without needing
 * to know the parent's padding upfront.
 */

import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
  FlatList,
} from 'react-native';
import { useAppDesignTokens } from '../../theme';
import { AtomicIcon } from '../../atoms';
import { AtomicText } from '../../atoms';
import type { IconName } from '../../atoms';
import { calculateGridItemWidth } from '../../utils/math';

export interface IconGridItem {
  /** Unique identifier */
  id: string;
  /** Label shown below the icon */
  label: string;
  /** Icon name (AtomicIcon / Lucide-based) */
  icon: IconName;
  /** Called when the card is tapped */
  onPress: () => void;
}

export interface IconGridProps {
  /** Items to display */
  items: IconGridItem[];
  /** Number of columns (default: 3) */
  columns?: number;
  /** Gap between items in pixels (default: 10) */
  gap?: number;
  /** Vertical gap between rows (default: same as gap) */
  rowGap?: number;
  /** Optional container style */
  style?: StyleProp<ViewStyle>;
}

// Memoized grid item component to prevent unnecessary re-renders
const GridItem = React.memo<{
  item: IconGridItem;
  itemWidth: number;
  cardBackground: string;
  borderLight: string;
  textPrimary: string;
}>(({ item, itemWidth, cardBackground, borderLight, textPrimary }) => {
  const { onPress: handlePress } = item;

  const cardStyle = useMemo(
    () => [styles.card, { width: itemWidth }],
    [itemWidth]
  );

  const iconBoxStyle = useMemo(
    () => [
      styles.iconBox,
      { width: itemWidth, backgroundColor: cardBackground, borderColor: borderLight },
    ],
    [itemWidth, cardBackground, borderLight]
  );

  const labelStyle = useMemo(
    () => [styles.label, { color: textPrimary }],
    [textPrimary]
  );

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={cardStyle}
    >
      <View style={iconBoxStyle}>
        <AtomicIcon name={item.icon} size="lg" color="textPrimary" />
      </View>
      <AtomicText style={labelStyle} numberOfLines={1}>
        {item.label}
      </AtomicText>
    </TouchableOpacity>
  );
});

/**
 * A self-sizing icon card grid.
 *
 * @example
 * ```tsx
 * <IconGrid
 *   columns={3}
 *   items={[
 *     { id: 'aging', label: 'Aging', icon: 'flash', onPress: () => navigate('Aging') },
 *     { id: 'wardrobe', label: 'Wardrobe', icon: 'shirt', onPress: () => navigate('Wardrobe') },
 *   ]}
 * />
 * ```
 */
export const IconGrid = React.memo<IconGridProps>(({
  items,
  columns = 3,
  gap = 10,
  rowGap,
  style,
}) => {
  const tokens = useAppDesignTokens();
  const [containerWidth, setContainerWidth] = useState(0);

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { width } = e.nativeEvent.layout;
      if (width > 0 && width !== containerWidth) {
        setContainerWidth(width);
      }
    },
    [containerWidth],
  );

  // Calculate item width using utility function
  const itemWidth = useMemo(() => {
    return calculateGridItemWidth(containerWidth, columns, gap);
  }, [containerWidth, columns, gap]);

  const { cardBackground, borderLight, textPrimary } = tokens.colors;

  const gridStyle = useMemo(
    () => [styles.grid, { columnGap: gap, rowGap: rowGap ?? gap }, style],
    [gap, rowGap, style]
  );

  // Memoize color props to prevent unnecessary GridItem re-renders
  const colorProps = useMemo(() => ({
    cardBackground,
    borderLight,
    textPrimary,
  }), [cardBackground, borderLight, textPrimary]);

  // Stable renderItem with memoization
  const renderItem = useCallback(({ item }: { item: IconGridItem }) => {
    if (itemWidth === 0) {
      return <View key={item.id} style={{ width: 0, height: 0 }} />;
    }

    return (
      <GridItem
        item={item}
        itemWidth={itemWidth}
        {...colorProps}
      />
    );
  }, [itemWidth, colorProps]);

  const keyExtractor = useCallback((item: IconGridItem) => item.id, []);

  const getItemLayout = useCallback((_?: unknown, index?: number) => ({
    length: itemWidth,
    offset: itemWidth * (index || 0),
    index: index || 0,
  }), [itemWidth]);

  if (itemWidth === 0) {
    return (
      <View style={gridStyle} onLayout={handleLayout}>
        {items.map((item) => (
          <View key={item.id} style={{ width: 0, height: 0 }} />
        ))}
      </View>
    );
  }

  return (
    <View style={gridStyle} onLayout={handleLayout}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        numColumns={columns}
        scrollEnabled={false}
        contentContainerStyle={gridStyle}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    alignItems: 'center',
    gap: 8,
  },
  iconBox: {
    aspectRatio: 1,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
});
