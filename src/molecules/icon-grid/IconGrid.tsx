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
} from 'react-native';
import { useAppDesignTokens } from '../../theme';
import { AtomicIcon } from '../../atoms';
import { AtomicText } from '../../atoms';
import type { IconName } from '../../atoms';

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
export const IconGrid: React.FC<IconGridProps> = ({
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

  // Total gap space between columns (N columns = N-1 gaps)
  const itemWidth = useMemo(() => {
    if (containerWidth <= 0) return 0;
    const totalGap = gap * (columns - 1);
    // Subtract 1px safety margin to prevent sub-pixel wrapping
    return Math.floor((containerWidth - totalGap) / columns) - 1;
  }, [containerWidth, columns, gap]);

  const { cardBackground, borderLight, textPrimary } = tokens.colors;

  return (
    <View
      style={[styles.grid, { columnGap: gap, rowGap: rowGap ?? gap }, style]}
      onLayout={handleLayout}
    >
      {items.map((item) =>
        itemWidth > 0 ? (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            onPress={item.onPress}
            style={[styles.card, { width: itemWidth }]}
          >
            <View
              style={[
                styles.iconBox,
                { width: itemWidth, backgroundColor: cardBackground, borderColor: borderLight },
              ]}
            >
              <AtomicIcon name={item.icon} size="lg" color="textPrimary" />
            </View>
            <AtomicText
              style={[styles.label, { color: textPrimary }]}
              numberOfLines={1}
            >
              {item.label}
            </AtomicText>
          </TouchableOpacity>
        ) : (
          // Placeholder — keeps grid stable before first layout measurement
          <View key={item.id} style={{ width: 0, height: 0 }} />
        ),
      )}
    </View>
  );
};

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
