/**
 * Spring Animation Config Service
 *
 * Infrastructure service for spring animation configurations.
 * Separates spring configuration logic from domain entities.
 */

import type { AnimationSpringConfig } from '../../domain/entities/Animation';
import {
  AnimationPreset,
  ANIMATION_CONSTANTS,
} from '../../domain/entities/Animation';

/**
 * Service for providing spring animation configurations
 */
export class SpringAnimationConfigService {
  /**
   * Get preset spring config
   */
  static getSpringConfig(preset: AnimationPreset): AnimationSpringConfig {
    const configs: Record<AnimationPreset, AnimationSpringConfig> = {
      [AnimationPreset.FADE_IN]: {
        damping: ANIMATION_CONSTANTS.SPRING.DAMPING,
        stiffness: ANIMATION_CONSTANTS.SPRING.STIFFNESS,
      },
      [AnimationPreset.FADE_OUT]: {
        damping: ANIMATION_CONSTANTS.SPRING.DAMPING,
        stiffness: ANIMATION_CONSTANTS.SPRING.STIFFNESS,
      },
      [AnimationPreset.SLIDE_IN_UP]: {
        damping: ANIMATION_CONSTANTS.SPRING.DAMPING,
        stiffness: ANIMATION_CONSTANTS.SPRING.STIFFNESS,
      },
      [AnimationPreset.SLIDE_IN_DOWN]: {
        damping: ANIMATION_CONSTANTS.SPRING.DAMPING,
        stiffness: ANIMATION_CONSTANTS.SPRING.STIFFNESS,
      },
      [AnimationPreset.SLIDE_IN_LEFT]: {
        damping: ANIMATION_CONSTANTS.SPRING.DAMPING,
        stiffness: ANIMATION_CONSTANTS.SPRING.STIFFNESS,
      },
      [AnimationPreset.SLIDE_IN_RIGHT]: {
        damping: ANIMATION_CONSTANTS.SPRING.DAMPING,
        stiffness: ANIMATION_CONSTANTS.SPRING.STIFFNESS,
      },
      [AnimationPreset.SCALE_IN]: {
        damping: 15,
        stiffness: 150,
      },
      [AnimationPreset.SCALE_OUT]: {
        damping: 15,
        stiffness: 150,
      },
      [AnimationPreset.BOUNCE]: {
        damping: 5,
        stiffness: 120,
      },
      [AnimationPreset.SHAKE]: {
        damping: 8,
        stiffness: 200,
      },
    };
    
    return configs[preset];
  }
}