import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalization } from "@umituz/react-native-localization";
import { AtomicText } from "@umituz/react-native-design-system";
import { useOnboardingProvider } from "../providers/OnboardingProvider";

export interface OnboardingFooterProps {
  currentIndex: number;
  totalSlides: number;
  isLastSlide: boolean;
  onNext: () => void;
  showProgressBar?: boolean;
  showDots?: boolean;
  showProgressText?: boolean;
  nextButtonText?: string;
  getStartedButtonText?: string;
  disabled?: boolean;
}

export const OnboardingFooter = ({
  currentIndex,
  totalSlides,
  isLastSlide,
  onNext,
  showProgressBar = true,
  showDots = true,
  showProgressText = true,
  nextButtonText,
  getStartedButtonText,
  disabled = false,
}: OnboardingFooterProps) => {
  const insets = useSafeAreaInsets();
  const { t } = useLocalization();
  const {
    theme: { colors },
  } = useOnboardingProvider();

  const buttonText = isLastSlide
    ? getStartedButtonText || t("onboarding.getStarted")
    : nextButtonText || t("general.continue");

  const progressPercent = ((currentIndex + 1) / totalSlides) * 100;

  return (
    <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
      {showProgressBar && (
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: colors.progressBarBg }]}>
            <View style={[styles.progressFill, { width: `${progressPercent}%`, backgroundColor: colors.progressFillColor }]} />
          </View>
        </View>
      )}

      {showDots && (
        <View style={styles.dots}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: colors.dotColor },
                index === currentIndex && {
                  width: 12,
                  backgroundColor: colors.activeDotColor
                }
              ]}
            />
          ))}
        </View>
      )}

      <TouchableOpacity
        onPress={onNext}
        disabled={disabled}
        activeOpacity={0.7}
        style={[
          styles.button,
          {
            backgroundColor: colors.buttonBg,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        <AtomicText
          type="labelLarge"
          style={[styles.buttonText, { color: colors.buttonTextColor }]}
        >
          {buttonText}
        </AtomicText>
      </TouchableOpacity>

      {showProgressText && (
        <AtomicText
          type="labelSmall"
          style={[styles.progressText, { color: colors.progressTextColor }]}
        >
          {currentIndex + 1} {t("general.of")} {totalSlides}
        </AtomicText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  progressText: {
    marginTop: 12,
    textAlign: "center",
  },
  button: {
    width: "100%",
    minHeight: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontWeight: "700",
  },
});


