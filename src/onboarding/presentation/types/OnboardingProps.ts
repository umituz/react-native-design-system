/**
 * Onboarding Screen Content Props
 */

import type { OnboardingSlide } from "../../domain/entities/OnboardingSlide";

export interface OnboardingScreenContentProps {
  containerStyle?: any;
  useCustomBackground: boolean;
  currentSlide: OnboardingSlide | undefined;
  isFirstSlide: boolean;
  isLastSlide: boolean;
  currentIndex: number;
  totalSlides: number;
  currentAnswer: any;
  isAnswerValid: boolean;
  showBackButton: boolean;
  showSkipButton: boolean;
  showProgressBar: boolean;
  showDots: boolean;
  showProgressText: boolean;
  skipButtonText?: string;
  nextButtonText?: string;
  getStartedButtonText?: string;
  onBack: () => void;
  onSkip: () => void;
  onNext: () => void;
  onAnswerChange: (value: any) => void;
  renderHeader?: (props: {
    isFirstSlide: boolean;
    onBack: () => void;
    onSkip: () => void;
  }) => React.ReactNode;
  renderFooter?: (props: {
    currentIndex: number;
    totalSlides: number;
    isLastSlide: boolean;
    onNext: () => void;
    onUpgrade?: () => void;
    showPaywallOnComplete?: boolean;
  }) => React.ReactNode;
  renderSlide?: (slide: OnboardingSlide) => React.ReactNode;
  onUpgrade?: () => void;
  showPaywallOnComplete?: boolean;
  variant?: "default" | "card" | "minimal" | "fullscreen";
}
