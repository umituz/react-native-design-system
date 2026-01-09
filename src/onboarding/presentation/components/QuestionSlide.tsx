/**
 * QuestionSlide Component
 * Single Responsibility: Render a question-type slide
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText } from "../../../atoms/AtomicText";
import type { OnboardingSlide } from "../../domain/entities/OnboardingSlide";
import { QuestionSlideHeader } from "./QuestionSlideHeader";
import { QuestionRenderer } from "./QuestionRenderer";
import { BaseSlide } from "./BaseSlide";
import { useOnboardingProvider } from "../providers/OnboardingProvider";
import { useLocalization } from "@umituz/react-native-localization";

export interface QuestionSlideProps {
  slide: OnboardingSlide;
  value: any;
  onChange: (value: any) => void;
  variant?: "default" | "card" | "minimal" | "fullscreen";
}

export const QuestionSlide = ({
  slide,
  value,
  onChange,
}: QuestionSlideProps) => {
  const {
    theme: { colors },
  } = useOnboardingProvider();
  const { t } = useLocalization();
  const { question } = slide;

  if (!question) return null;

  return (
    <BaseSlide contentPosition={slide.contentPosition}>
      <QuestionSlideHeader slide={slide} />

      <View style={styles.questionContainer}>
        <QuestionRenderer question={question} value={value} onChange={onChange} />
      </View>

      {question.validation?.required && !value && (
        <AtomicText
          type="labelSmall"
          style={[styles.requiredHint, { color: colors.errorColor }]}
        >
          {t("onboarding.fieldRequired")}
        </AtomicText>
      )}
    </BaseSlide>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    marginTop: 24,
    width: "100%",
  },
  requiredHint: {
    marginTop: 12,
    textAlign: "center",
    fontWeight: "600",
  },
});
