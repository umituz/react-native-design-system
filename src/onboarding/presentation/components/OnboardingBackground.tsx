/**
 * Onboarding Background Component
 * Handles rendering of video, image or solid backgrounds
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import type { OnboardingSlide } from "../../domain/entities/OnboardingSlide";
import { BackgroundVideo } from "./BackgroundVideo";
import { BackgroundImageCollage } from "./BackgroundImageCollage";
import { AtomicImage } from "../../../atoms/image/AtomicImage";

interface BackgroundContentProps {
  slide: OnboardingSlide;
  useCustomBackground: boolean;
  overlayOpacity: number;
}

const BackgroundContent: React.FC<BackgroundContentProps> = ({
  slide,
  useCustomBackground,
  overlayOpacity,
}) => {
  if (slide.backgroundVideo) {
    return (
      <BackgroundVideo
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

interface OnboardingBackgroundProps {
  currentSlide: OnboardingSlide | undefined;
  useCustomBackground: boolean;
  showOverlay: boolean;
  overlayOpacity: number;
}

export const OnboardingBackground: React.FC<OnboardingBackgroundProps> = ({
  currentSlide,
  useCustomBackground,
  showOverlay,
  overlayOpacity,
}) => {
  if (!currentSlide) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <BackgroundContent
        slide={currentSlide}
        useCustomBackground={useCustomBackground}
        overlayOpacity={overlayOpacity}
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
