/**
 * React Native Onboarding - Public API
 *
 * Generic onboarding flow for React Native apps with custom backgrounds,
 * animations, and customizable slides. Follows SOLID, DRY, KISS principles.
 *
 * Architecture:
 * - Domain: Entities and interfaces (business logic)
 * - Infrastructure: Storage and hooks (state management)
 * - Presentation: Components and screens (UI)
 *
 * Usage:
 *   import { OnboardingScreen, OnboardingSlide } from '@umituz/react-native-onboarding';
 *
 *   <OnboardingScreen
 *     slides={[
 *       {
 *         id: '1',
 *         title: 'Welcome',
 *         description: 'Welcome to the app',
 *         icon: '🎉',
 *         backgroundColor: '#3B82F6',
 *       },
 *     ]}
 *   />
 */

// =============================================================================
// DOMAIN LAYER - Entities and Interfaces
// =============================================================================

export type { OnboardingSlide, SlideType } from "./domain/entities/OnboardingSlide";
export type { OnboardingOptions } from "./domain/entities/OnboardingOptions";
export type {
  OnboardingQuestion,
  QuestionType,
  QuestionOption,
  QuestionValidation,
} from "./domain/entities/OnboardingQuestion";
export type { OnboardingUserData } from "./domain/entities/OnboardingUserData";

// =============================================================================
// INFRASTRUCTURE LAYER - Storage and Hooks
// =============================================================================

export {
  useOnboardingStore,
  useOnboarding,
} from "./infrastructure/storage/OnboardingStore";
export type { OnboardingStoreState } from "./infrastructure/storage/OnboardingStoreState";
export type { OnboardingStoreActions } from "./infrastructure/storage/OnboardingStoreActions";
export type { OnboardingStoreSelectors } from "./infrastructure/storage/OnboardingStoreSelectors";
export {
  useOnboardingNavigation,
  type UseOnboardingNavigationReturn,
} from "./infrastructure/hooks/useOnboardingNavigation";
export {
  useOnboardingContainerStyle,
  type UseOnboardingContainerStyleProps,
  type UseOnboardingContainerStyleReturn,
} from "./presentation/hooks/useOnboardingContainerStyle";

// =============================================================================
// PRESENTATION LAYER - Components and Screens
// =============================================================================

export { OnboardingScreen, type OnboardingScreenProps } from "./presentation/screens/OnboardingScreen";
export { OnboardingHeader, type OnboardingHeaderProps } from "./presentation/components/OnboardingHeader";
export { OnboardingFooter, type OnboardingFooterProps } from "./presentation/components/OnboardingFooter";
export { OnboardingProvider, type OnboardingProviderProps, type OnboardingTranslations, useOnboardingProvider } from "./presentation/providers/OnboardingProvider";
export { BackgroundImageCollage, type CollageLayout, type BackgroundImageCollageProps } from "./presentation/components/BackgroundImageCollage";
export type { OnboardingTheme, OnboardingColors } from "./presentation/types/OnboardingTheme";

// =============================================================================
// UTILITIES - Helper functions
// =============================================================================

export { ensureArray, safeIncludes, safeFilter } from "./infrastructure/utils/arrayUtils";
export type { ImageLayoutItem, LayoutConfig } from "./infrastructure/utils/layouts";

// Export OnboardingSlide component
// Note: TypeScript doesn't allow exporting both a type and a value with the same name
// The type is exported above as OnboardingSlide
// The component is exported here with a different name to avoid conflict
import { OnboardingSlide as OnboardingSlideComponent } from "./presentation/components/OnboardingSlide";
export { OnboardingSlideComponent };
export type { OnboardingSlideProps } from "./presentation/components/OnboardingSlide";

// Export QuestionSlide component
export { QuestionSlide } from "./presentation/components/QuestionSlide";
export type { QuestionSlideProps } from "./presentation/components/QuestionSlide";

// Export question components
export { SingleChoiceQuestion } from "./presentation/components/questions/SingleChoiceQuestion";
export type { SingleChoiceQuestionProps } from "./presentation/components/questions/SingleChoiceQuestion";
export { MultipleChoiceQuestion } from "./presentation/components/questions/MultipleChoiceQuestion";
export type { MultipleChoiceQuestionProps } from "./presentation/components/questions/MultipleChoiceQuestion";
export { TextInputQuestion } from "./presentation/components/questions/TextInputQuestion";
export type { TextInputQuestionProps } from "./presentation/components/questions/TextInputQuestion";
export { RatingQuestion } from "./presentation/components/questions/RatingQuestion";
export type { RatingQuestionProps } from "./presentation/components/questions/RatingQuestion";

export { OnboardingResetSetting } from "./presentation/components/OnboardingResetSetting";
export type { OnboardingResetSettingProps } from "./presentation/components/OnboardingResetSetting";


export { useOnboardingFlow, type UseOnboardingFlowResult } from './hooks/useOnboardingFlow';
