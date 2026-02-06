/**
 * Onboarding Slide Entity
 *
 * Domain entity representing a single onboarding slide
 */

import type { VideoSource } from "expo-video";
import type { ImageSourceType } from "../types/ImageSourceType";
import type { OnboardingQuestion, OnboardingAnswerValue } from "./OnboardingQuestion";

/**
 * Slide type - determines the content and behavior
 */
export type SlideType = "info" | "question" | "welcome" | "completion";

/**
 * Content position - determines where the text content is positioned
 */
export type ContentPosition = "center" | "bottom";

/**
 * Onboarding Slide
 * Each slide represents one step in the onboarding flow
 */
export interface OnboardingSlide {
  /**
   * Unique identifier for the slide
   */
  id: string;

  /**
   * Slide type (default: "info")
   */
  type?: SlideType;

  /**
   * Slide title
   */
  title: string;

  /**
   * Slide description/body text
   */
  description: string;

  /**
   * Icon to display (emoji or icon name)
   */
  icon?: string;

  /**
   * Type of icon: 'emoji' or 'icon' (default: 'icon')
   */
  iconType?: 'emoji' | 'icon';

  /**
   * Hide icon even if provided (default: false)
   */
  hideIcon?: boolean;

  /**
   * Content position: 'center' or 'bottom' (default: 'center')
   */
  contentPosition?: ContentPosition;

  /**
   * Background color for the slide background (optional)
   * Only used if useCustomBackground is true
   */
  backgroundColor?: string;

  /**
   * Use custom background color instead of theme defaults (default: false)
   * If true and backgroundColor is provided, it will be used
   */
  useCustomBackground?: boolean;

  /**
   * Optional image URL (alternative to icon)
   */
  image?: ImageSourceType;

  /**
   * Optional background image (URL or require path)
   * Stretches to fill the screen behind content
   */
  backgroundImage?: ImageSourceType;

  /**
   * Optional multiple background images (URLs or require paths)
   * Displayed in a collage/grid pattern behind content
   * If provided, takes precedence over single backgroundImage
   */
  backgroundImages?: ImageSourceType[];

  /**
   * Layout pattern for multiple background images
   * 'grid' - Equal sized grid (auto columns)
   * 'dense' - Dense grid with many small images (6 columns)
   * 'masonry' - Pinterest-style masonry layout
   * 'collage' - Random sizes and positions
   * 'scattered' - Small randomly placed images
   * 'tiles' - Fixed size tiles centered
   * 'honeycomb' - Hexagonal pattern
   * Default: 'grid'
   */
  backgroundImagesLayout?: 'grid' | 'dense' | 'masonry' | 'collage' | 'scattered' | 'tiles' | 'honeycomb';

  /**
   * Number of columns for grid-based layouts
   * Only applies to: grid, dense, masonry, tiles
   */
  backgroundImagesColumns?: number;

  /**
   * Gap between images in pixels
   */
  backgroundImagesGap?: number;

  /**
   * Border radius for images
   */
  backgroundImagesBorderRadius?: number;

  /**
   * Optional background video (URL or require path)
   * Plays in loop behind content
   */
  backgroundVideo?: VideoSource;

  /**
   * Opacity of the overlay color on top of background media
   * Range: 0.0 to 1.0 (Default: 0.5)
   */
  overlayOpacity?: number;

  /**
   * Optional features list to display
   */
  features?: string[];

  /**
   * Optional question for personalization
   * Only used when type is "question"
   */
  question?: OnboardingQuestion;

  /**
   * Skip this slide if condition is met
   * @param answers - Previous answers
   * @returns true to skip, false to show
   */
  skipIf?: (answers: Record<string, OnboardingAnswerValue>) => boolean;
}
