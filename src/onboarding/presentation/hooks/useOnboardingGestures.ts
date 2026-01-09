/**
 * useOnboardingGestures Hook
 * Handles swipe gestures for onboarding navigation
 */

import { useRef } from "react";
import { PanResponder } from "react-native";

interface UseOnboardingGesturesProps {
  isFirstSlide: boolean;
  isAnswerValid: boolean;
  onNext: () => void;
  onBack: () => void;
}

export const useOnboardingGestures = ({
  isFirstSlide,
  isAnswerValid,
  onNext,
  onBack,
}: UseOnboardingGesturesProps) => {
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only trigger for horizontal swipes
        return Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dy) < 40;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50) {
          // Swipe Right -> Previous
          if (!isFirstSlide) {
            onBack();
          }
        } else if (gestureState.dx < -50) {
          // Swipe Left -> Next
          if (isAnswerValid) {
            onNext();
          }
        }
      },
    })
  ).current;

  return panResponder;
};
