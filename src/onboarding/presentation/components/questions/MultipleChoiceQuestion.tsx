/**
 * Multiple Choice Question Component
 * Single Responsibility: Render multiple choice question with options
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText } from "../../../../atoms/AtomicText";
import { useOnboardingProvider } from "../../providers/OnboardingProvider";
import { ensureArray } from "../../../infrastructure/utils/arrayUtils";
import type { OnboardingQuestion } from "../../../domain/entities/OnboardingQuestion";
import { QuestionOptionItem } from "./QuestionOptionItem";

export interface MultipleChoiceQuestionProps {
  question: OnboardingQuestion;
  value: string[] | undefined;
  onChange: (value: string[]) => void;
}

export const MultipleChoiceQuestion = ({
  question,
  value,
  onChange,
}: MultipleChoiceQuestionProps) => {
  const {
    theme: { colors },
  } = useOnboardingProvider();

  const safeValue = ensureArray(value);

  const handleToggle = (optionId: string) => {
    const newValue = safeValue.includes(optionId)
      ? safeValue.filter((id) => id !== optionId)
      : [...safeValue, optionId];

    if (question.validation?.maxSelections && newValue.length > question.validation.maxSelections) {
      return;
    }
    onChange(newValue);
  };

  return (
    <View style={styles.container}>
      {question.options?.map((option) => (
        <QuestionOptionItem
          key={option.id}
          option={option}
          isSelected={safeValue.includes(option.id)}
          onPress={() => handleToggle(option.id)}
          colors={colors}
        />
      ))}
      {question.validation?.maxSelections && (
        <AtomicText
          type="labelSmall"
          style={[styles.hint, { color: colors.subTextColor }]}
        >
          Select up to {question.validation.maxSelections} options
        </AtomicText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 12,
  },
  hint: {
    textAlign: "center",
    marginTop: 8,
  },
});
