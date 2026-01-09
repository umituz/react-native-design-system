/**
 * Question Renderer Component
 * Single Responsibility: Render appropriate question component based on type
 */

import React from "react";
import type { OnboardingQuestion } from "../../domain/entities/OnboardingQuestion";
import { SingleChoiceQuestion } from "./questions/SingleChoiceQuestion";
import { MultipleChoiceQuestion } from "./questions/MultipleChoiceQuestion";
import { TextInputQuestion } from "./questions/TextInputQuestion";
import { RatingQuestion } from "./questions/RatingQuestion";

export interface QuestionRendererProps {
  question: OnboardingQuestion;
  value: any;
  onChange: (value: any) => void;
}

export const QuestionRenderer = ({
  question,
  value,
  onChange,
}: QuestionRendererProps) => {
  switch (question.type) {
    case "single_choice":
      return (
        <SingleChoiceQuestion
          question={question}
          value={value}
          onChange={onChange}
        />
      );
    case "multiple_choice":
      return (
        <MultipleChoiceQuestion
          question={question}
          value={value}
          onChange={onChange}
        />
      );
    case "text_input":
      return (
        <TextInputQuestion
          question={question}
          value={value}
          onChange={onChange}
        />
      );
    case "rating":
      return (
        <RatingQuestion
          question={question}
          value={value}
          onChange={onChange}
        />
      );
    default:
      return null;
  }
};
