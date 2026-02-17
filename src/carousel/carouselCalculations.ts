import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const calculateItemWidth = (padding: number = 16): number => {
  return SCREEN_WIDTH - padding * 2;
};

export const calculateIndexFromScroll = (
  scrollPosition: number,
  itemWidth: number,
): number => {
  return Math.round(scrollPosition / itemWidth);
};

export const getScreenWidth = (): number => {
  return SCREEN_WIDTH;
};
