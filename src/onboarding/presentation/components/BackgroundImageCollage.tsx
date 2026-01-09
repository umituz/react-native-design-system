/**
 * Background Image Collage Component
 * Displays multiple images in various layout patterns with safe area support
 */

import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "@umituz/react-native-design-system";
import {
  generateGridLayout,
  generateDenseGridLayout,
  generateMasonryLayout,
  generateCollageLayout,
  generateScatteredLayout,
  generateTilesLayout,
  generateHoneycombLayout,
  type ImageLayoutItem,
  type LayoutConfig,
  type ImageSourceType,
} from "../../infrastructure/utils/layouts";

export type CollageLayout =
  | "grid"
  | "dense"
  | "masonry"
  | "collage"
  | "scattered"
  | "tiles"
  | "honeycomb";

export interface BackgroundImageCollageProps {
  images: ImageSourceType[];
  layout?: CollageLayout;
  columns?: number;
  gap?: number;
  borderRadius?: number;
  opacity?: number;
}

type LayoutGenerator = (images: ImageSourceType[], config: LayoutConfig) => ImageLayoutItem[];

const LAYOUT_GENERATORS: Record<CollageLayout, LayoutGenerator> = {
  grid: generateGridLayout,
  dense: generateDenseGridLayout,
  masonry: generateMasonryLayout,
  collage: generateCollageLayout,
  scattered: generateScatteredLayout,
  tiles: generateTilesLayout,
  honeycomb: generateHoneycombLayout,
};

export const BackgroundImageCollage: React.FC<BackgroundImageCollageProps> = ({
  images,
  layout = "grid",
  columns,
  gap,
  borderRadius,
  opacity = 1,
}) => {
  const insets = useSafeAreaInsets();

  const imageLayouts = useMemo(() => {
    if (!images || images.length === 0) return [];

    const generator = LAYOUT_GENERATORS[layout] ?? generateGridLayout;
    return generator(images, {
      columns,
      gap,
      borderRadius,
      safeAreaInsets: insets
    });
  }, [images, layout, columns, gap, borderRadius, insets]);

  if (imageLayouts.length === 0) return null;

  return (
    <View style={[StyleSheet.absoluteFill, { opacity }]} pointerEvents="none">
      {imageLayouts.map((item, index) => (
        <Image
          key={index}
          source={item.source}
          style={item.style}
          contentFit="cover"
          transition={300}
        />
      ))}
    </View>
  );
};
