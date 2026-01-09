import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicIcon } from "../../../atoms/AtomicIcon";
import { AtomicText } from "../../../atoms/AtomicText";
import { useLocalization } from "@umituz/react-native-localization";
import { useOnboardingProvider } from "../providers/OnboardingProvider";

export interface OnboardingHeaderProps {
  isFirstSlide: boolean;
  onBack: () => void;
  onSkip: () => void;
  showBackButton?: boolean;
  showSkipButton?: boolean;
  skipButtonText?: string;
}

export const OnboardingHeader = ({
  isFirstSlide,
  onBack,
  onSkip,
  showBackButton = true,
  showSkipButton = true,
  skipButtonText,
}: OnboardingHeaderProps) => {
  const { t } = useLocalization();
  const {
    theme: { colors },
  } = useOnboardingProvider();

  const skipText = skipButtonText || t("onboarding.skip");

  return (
    <View style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity
          onPress={() => !isFirstSlide && onBack?.()}
          disabled={isFirstSlide}
          style={[
            styles.headerButton,
            {
              backgroundColor: colors.headerButtonBg,
              borderColor: colors.headerButtonBorder,
            },
            isFirstSlide && styles.headerButtonDisabled,
          ]}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <AtomicIcon name="chevron-back" customSize={20} customColor={colors.iconColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.headerButton} />
      )}
      {showSkipButton ? (
        <TouchableOpacity onPress={onSkip} activeOpacity={0.7}>
          <AtomicText
            type="labelLarge"
            style={[styles.skipText, { color: colors.textColor }]}
          >
            {skipText}
          </AtomicText>
        </TouchableOpacity>
      ) : <View />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  headerButtonDisabled: {
    opacity: 0,
  },
  skipText: {
    fontWeight: "700",
  },
});


