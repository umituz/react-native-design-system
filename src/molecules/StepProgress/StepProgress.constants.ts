/**
 * StepProgress Constants
 *
 * Base size configurations for StepProgress component.
 * All sizes will be multiplied by spacingMultiplier at runtime.
 */

/**
 * Base spacing (px) - before spacingMultiplier
 */
export const BASE_SPACING = {
  gap: 8,
  paddingHorizontal: 24,
  paddingVertical: 16,
} as const;

/**
 * Base step dimensions (px) - before spacingMultiplier
 */
export const BASE_STEP_DIMENSIONS = {
  height: 4,
  borderRadius: 2,
} as const;
