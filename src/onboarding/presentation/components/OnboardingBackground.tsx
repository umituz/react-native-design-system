/**
 * Onboarding Background Component
 * Handles rendering of video, image or solid backgrounds.
 *
 * expo-video is an OPTIONAL peer dependency.
 * Pass a VideoComponent prop to enable video backgrounds.
 * Without it the video slide type is silently skipped.
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import type { OnboardingSlide } from "../../domain/entities/OnboardingSlide";
import { BackgroundImageCollage } from "./BackgroundImageCollage";
import { AtomicImage } from "../../../atoms/image/AtomicImage";

type VideoComponentType = React.ComponentType<{
  source: unknown;
  overlayOpacity?: number;
}>;

interface BackgroundContentProps {
  slide: OnboardingSlide;
  useCustomBackground: boolean;
  overlayOpacity: number;
  VideoComponent?: VideoComponentType;
}

const BackgroundContent: React.FC<BackgroundContentProps> = ({
  slide,
  useCustomBackground,
  overlayOpacity,
  VideoComponent,
}) => {
  if (slide.backgroundVideo) {
    // Only render if the consuming app injected a VideoComponent (requires expo-video)
    if (!VideoComponent) return null;
    return (
      <VideoComponent
        source={slide.backgroundVideo}
        overlayOpacity={overlayOpacity}
      />
    );
  }

  if (slide.backgroundImages && slide.backgroundImages.length > 0) {
    return (
      <BackgroundImageCollage
        images={slide.backgroundImages}
        layout={slide.backgroundImagesLayout || "grid"}
        columns={slide.backgroundImagesColumns}
        gap={slide.backgroundImagesGap}
        borderRadius={slide.backgroundImagesBorderRadius}
      />
    );
  }

  if (slide.backgroundImage) {
    return (
      <AtomicImage
        source={slide.backgroundImage}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        cachePolicy="memory-disk"
        priority="high"
      />
    );
  }

  if (useCustomBackground && slide.backgroundColor) {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: slide.backgroundColor }
        ]}
      />
    );
  }

  return null;
};

export interface OnboardingBackgroundProps {
  currentSlide: OnboardingSlide | undefined;
  useCustomBackground: boolean;
  showOverlay: boolean;
  overlayOpacity: number;
  /**
   * Optional video background component.
   * Required only when slides use `backgroundVideo`.
   * Import from `./BackgroundVideo` in apps that have expo-video installed.
   *
   * @example
   * import { BackgroundVideo } from '@umituz/react-native-design-system/onboarding';
   * <OnboardingScreen VideoComponent={BackgroundVideo} ... />
   */
  VideoComponent?: VideoComponentType;
}

export const OnboardingBackground: React.FC<OnboardingBackgroundProps> = ({
  currentSlide,
  useCustomBackground,
  showOverlay,
  overlayOpacity,
  VideoComponent,
}) => {
  if (!currentSlide) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <BackgroundContent
        slide={currentSlide}
        useCustomBackground={useCustomBackground}
        overlayOpacity={overlayOpacity}
        VideoComponent={VideoComponent}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: showOverlay
              ? `rgba(0,0,0,${overlayOpacity})`
              : "transparent",
          },
        ]}
      />
    </View>
  );
};
