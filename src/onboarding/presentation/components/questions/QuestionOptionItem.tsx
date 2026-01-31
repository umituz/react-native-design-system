/**
 * Question Option Item Component
 * Single Responsibility: Render a single selectable option
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicIcon, AtomicText } from "../../../../atoms";
import type { QuestionOption } from "../../../domain/entities/OnboardingQuestion";
import type { OnboardingColors } from "../../types/OnboardingTheme";

export interface QuestionOptionItemProps {
  option: QuestionOption;
  isSelected: boolean;
  onPress: () => void;
  colors: OnboardingColors;
}

export const QuestionOptionItem = ({
  option,
  isSelected,
  onPress,
  colors,
}: QuestionOptionItemProps) => {
  const isEmoji = option.iconType === 'emoji';

  return (
    <TouchableOpacity
      style={[
        styles.option,
        {
          backgroundColor: isSelected ? colors.iconBg : colors.featureItemBg,
          borderColor: isSelected ? colors.iconColor : colors.headerButtonBorder,
          borderWidth: isSelected ? 2 : 1,
        }
      ]}
      onPress={onPress}
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
              name={option.icon as any}
              customSize={20}
              customColor={isSelected ? colors.buttonTextColor : colors.subTextColor}
            />
          )}
        </View>
      )}
      <AtomicText
        type="bodyLarge"
        style={[
          styles.optionLabel,
          {
            color: isSelected ? colors.textColor : colors.subTextColor,
            fontWeight: isSelected ? '700' : '500'
          }
        ]}
      >
        {option.label}
      </AtomicText>
      <View style={[
        styles.checkbox,
        {
          borderColor: isSelected ? colors.iconColor : colors.headerButtonBorder,
          backgroundColor: isSelected ? colors.iconColor : 'transparent',
          borderWidth: isSelected ? 0 : 2,
        }
      ]}>
        {isSelected && (
          <AtomicIcon
            name="checkmark"
            customSize={16}
            customColor={colors.buttonTextColor}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
