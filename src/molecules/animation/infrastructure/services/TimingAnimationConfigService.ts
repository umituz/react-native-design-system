/**
 * Timing Animation Config Service
 *
 * Infrastructure service for timing animation configurations.
 * Separates timing configuration logic from domain entities.
 */

import type { AnimationTimingConfig } from '../../domain/entities/Animation';
import {
  AnimationPreset,
  ANIMATION_CONSTANTS,
} from '../../domain/entities/Animation';

/**
 * Service for providing timing animation configurations
 */
export class TimingAnimationConfigService {
  /**
   * Get preset timing config
   */
  static getTimingConfig(preset: AnimationPreset): AnimationTimingConfig {
    const configs: Record<AnimationPreset, AnimationTimingConfig> = {
      [AnimationPreset.FADE_IN]: {
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      },
      [AnimationPreset.FADE_OUT]: {
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      },
      [AnimationPreset.SLIDE_IN_UP]: {
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      },
      [AnimationPreset.SLIDE_IN_DOWN]: {
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      },
      [AnimationPreset.SLIDE_IN_LEFT]: {
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      },
      [AnimationPreset.SLIDE_IN_RIGHT]: {
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      },
      [AnimationPreset.SCALE_IN]: {
        duration: ANIMATION_CONSTANTS.DURATION.FAST,
      },
      [AnimationPreset.SCALE_OUT]: {
        duration: ANIMATION_CONSTANTS.DURATION.FAST,
      },
      [AnimationPreset.BOUNCE]: {
        duration: ANIMATION_CONSTANTS.DURATION.SLOW,
      },
      [AnimationPreset.SHAKE]: {
        duration: ANIMATION_CONSTANTS.DURATION.FAST,
      },
    };
    
    return configs[preset];
  }
}