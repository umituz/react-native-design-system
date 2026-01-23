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

  const renderContent = () => {
    if (currentSlide.backgroundVideo) {
      return (
        <BackgroundVideo
          source={currentSlide.backgroundVideo}
          overlayOpacity={overlayOpacity}
        />
      );
    }

    if (currentSlide.backgroundImages && currentSlide.backgroundImages.length > 0) {
      return (
        <BackgroundImageCollage
          images={currentSlide.backgroundImages}
          layout={currentSlide.backgroundImagesLayout || "grid"}
          columns={currentSlide.backgroundImagesColumns}
          gap={currentSlide.backgroundImagesGap}
          borderRadius={currentSlide.backgroundImagesBorderRadius}
        />
      );
    }

    if (currentSlide.backgroundImage) {
      return (
        <AtomicImage
          source={currentSlide.backgroundImage}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          cachePolicy="memory-disk"
          priority="high"
        />
      );
    }

    if (useCustomBackground && currentSlide.backgroundColor) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: currentSlide.backgroundColor }
          ]}
        />
      );
    }

    return null;
  };

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {renderContent()}
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
