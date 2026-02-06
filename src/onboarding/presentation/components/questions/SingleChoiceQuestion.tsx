import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicIcon, AtomicText } from "../../../../atoms";
import { useOnboardingProvider } from "../../providers/OnboardingProvider";
import type { OnboardingQuestion, QuestionOption } from "../../../domain/entities/OnboardingQuestion";

export interface SingleChoiceQuestionProps {
  question: OnboardingQuestion;
  value: string | undefined;
  onChange: (value: string) => void;
}

export const SingleChoiceQuestion = ({
  question,
  value,
  onChange,
}: SingleChoiceQuestionProps) => {
  const {
    theme: { colors },
  } = useOnboardingProvider();

  const renderOption = (option: QuestionOption) => {
    const isSelected = value === option.id;
    const isEmoji = option.iconType === 'emoji';

    return (
      <TouchableOpacity
        key={option.id}
        style={[
          styles.option,
          {
            backgroundColor: isSelected ? colors.iconBg : colors.featureItemBg,
            borderColor: isSelected ? colors.iconColor : colors.headerButtonBorder,
            borderWidth: isSelected ? 2 : 1,
          }
        ]}
        onPress={() => onChange(option.id)}
        activeOpacity={0.8}
      >
        {option.icon && (
          <View style={[
            styles.optionIcon,
            { backgroundColor: isSelected ? colors.iconColor : colors.featureItemBg }
          ]}>
            {isEmoji ? (
              <AtomicText style={{ fontSize: 24 }}>{option.icon}</AtomicText>
            ) : (
              <AtomicIcon
                name={option.icon}
                customSize={20}
                customColor={isSelected ? colors.buttonTextColor : colors.subTextColor}
              />
            )}
          </View>
        )}
        <AtomicText type="bodyLarge" style={[styles.optionLabel, { color: isSelected ? colors.textColor : colors.subTextColor, fontWeight: isSelected ? '700' : '500' }]}>
          {option.label}
        </AtomicText>
        <View style={[
          styles.radioOuter,
          { borderColor: isSelected ? colors.iconColor : colors.headerButtonBorder }
        ]}>
          {isSelected && (
            <View style={[styles.radioInner, { backgroundColor: colors.iconColor }]} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {question.options?.map(renderOption)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 16,
    marginBottom: 8,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});


