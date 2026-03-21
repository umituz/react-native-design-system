/**
 * StepHeader Constants
 *
 * Base size configurations for StepHeader component.
 * All sizes will be multiplied by spacingMultiplier at runtime.
 */

/**
 * Base font sizes (px) - before spacingMultiplier
 */
export const BASE_FONT_SIZES = {
  title: 28,
  subtitle: 16,
} as const;

/**
 * Base spacing (px) - before spacingMultiplier
 */
export const BASE_SPACING = {
  marginBottom: 32,
  paddingHorizontal: 24,
  stepIndicatorMarginBottom: 12,
  titleMarginBottom: 12,
} as const;

/**
 * Base step dot sizes (px) - before spacingMultiplier
 */
export const BASE_STEP_DOT_SIZES = {
  width: 8,
  height: 8,
  borderRadius: 4,
  marginHorizontal: 4,
} as const;

/**
 * Default configuration
 */
export const DEFAULT_CONFIG = {
  showStepIndicator: false,
  titleAlignment: "left" as const,
  titleFontSize: BASE_FONT_SIZES.title,
  subtitleFontSize: BASE_FONT_SIZES.subtitle,
  spacing: {
    marginBottom: BASE_SPACING.marginBottom,
    paddingHorizontal: BASE_SPACING.paddingHorizontal,
  },
} as const;
