import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useAppDesignTokens } from "../theme";
import { CarouselScrollView } from "./CarouselScrollView";
import { CarouselDots } from "./CarouselDots";
import { CarouselItem } from "./CarouselItem";
import { useCarouselScroll } from "./useCarouselScroll";
import { calculateItemWidth } from "./carouselCalculations";
import type { CarouselProps } from "./types";

export const Carousel = <T,>({
  items,
  renderItem,
  itemWidth,
  spacing = 16,
  onIndexChange,
  showDots = true,
  pagingEnabled = true,
  style,
}: CarouselProps<T> & { style?: ViewStyle }) => {
  const tokens = useAppDesignTokens();
  const calculatedItemWidth = itemWidth || calculateItemWidth(spacing);

  const pageWidth = calculatedItemWidth + spacing;

  const { currentIndex, handleScroll } = useCarouselScroll({
    itemWidth: pageWidth,
    onIndexChange,
  });

  if (items.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <CarouselScrollView
        onScroll={handleScroll}
        pagingEnabled={pagingEnabled}
        spacing={spacing}
        itemWidth={calculatedItemWidth}
      >
        {items.map((item, index) => (
          <CarouselItem
            key={item.id}
            item={item}
            itemWidth={calculatedItemWidth}
            renderContent={(itemData) => renderItem(itemData, index)}
            style={
              index < items.length - 1 ? { marginRight: spacing } : undefined
            }
          />
        ))}
      </CarouselScrollView>

      {showDots && items.length > 1 && (
        <CarouselDots
          count={items.length}
          currentIndex={currentIndex}
          activeColor={tokens.colors.primary}
          inactiveColor={tokens.colors.border}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 8,
  },
});
