import { useState, useCallback } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { calculateIndexFromScroll } from "./carouselCalculations";

interface UseCarouselScrollOptions {
  itemWidth: number;
  onIndexChange?: (index: number) => void;
}

export const useCarouselScroll = ({
  itemWidth,
  onIndexChange,
}: UseCarouselScrollOptions) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollPosition = event.nativeEvent.contentOffset.x;
      const newIndex = calculateIndexFromScroll(scrollPosition, itemWidth);

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        onIndexChange?.(newIndex);
      }
    },
    [itemWidth, currentIndex, onIndexChange],
  );

  return {
    currentIndex,
    handleScroll,
  };
};
