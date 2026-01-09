/**
 * Onboarding Validation Service
 *
 * Business logic for validating onboarding question answers
 * Follows Single Responsibility Principle
 */

import type { OnboardingQuestion } from "../../domain/entities/OnboardingQuestion";

/**
 * ValidationManager
 */
export class ValidationManager {
  /**
   * Validate answer against question validation rules
   * @param question - The question to validate against
   * @param answer - The answer to validate
   * @returns true if valid, false otherwise
   */
  static validateAnswer(
    question: OnboardingQuestion,
    answer: any,
  ): boolean {
    const { validation } = question;
    if (!validation) {
      return true;
    }

    // Required validation
    if (validation.required && !answer) {
      return false;
    }

    // Type-specific validations
    switch (question.type) {
      case "multiple_choice":
        return this.validateMultipleChoice(answer, validation);
      case "text_input":
        return this.validateTextInput(answer, validation);
      case "rating":
        return this.validateNumeric(answer, validation);
      default:
        break;
    }

    // Custom validator
    if (validation.customValidator) {
      const customResult = validation.customValidator(answer);
      return customResult === true;
    }

    return true;
  }

  /**
   * Validate multiple choice answer
   */
  private static validateMultipleChoice(
    answer: any,
    validation: OnboardingQuestion["validation"],
  ): boolean {
    if (!validation) return true;

    if (validation.minSelections) {
      if (!answer || !Array.isArray(answer) || answer.length < validation.minSelections) {
        return false;
      }
    }

    if (validation.maxSelections) {
      if (Array.isArray(answer) && answer.length > validation.maxSelections) {
        return false;
      }
    }

    return true;
  }

  /**
   * Validate text input answer
   */
  private static validateTextInput(
    answer: any,
    validation: OnboardingQuestion["validation"],
  ): boolean {
    if (!validation) return true;

    if (typeof answer !== "string") {
      return false;
    }

    if (validation.minLength && answer.length < validation.minLength) {
      return false;
    }

    if (validation.maxLength && answer.length > validation.maxLength) {
      return false;
    }

    return true;
  }

  /**
   * Validate numeric answer (rating)
   */
  private static validateNumeric(
    answer: any,
    validation: OnboardingQuestion["validation"],
  ): boolean {
    if (!validation) return true;

    if (typeof answer !== "number") {
      return false;
    }

    if (validation.min !== undefined && answer < validation.min) {
      return false;
    }

    if (validation.max !== undefined && answer > validation.max) {
      return false;
    }

    return true;
  }
}

