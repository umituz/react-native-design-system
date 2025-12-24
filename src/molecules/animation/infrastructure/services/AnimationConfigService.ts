/**
 * Animation Config Service (Legacy)
 *
 * Legacy service for backward compatibility.
 * New implementations should use TimingAnimationConfigService and SpringAnimationConfigService.
 * @deprecated Use TimingAnimationConfigService and SpringAnimationConfigService instead
 */

import type {
  AnimationTimingConfig,
  AnimationSpringConfig,
} from '../../domain/entities/Animation';
import { AnimationPreset } from '../../domain/entities/Animation';
import { TimingAnimationConfigService } from './TimingAnimationConfigService';
import { SpringAnimationConfigService } from './SpringAnimationConfigService';

/**
 * @deprecated Use TimingAnimationConfigService and SpringAnimationConfigService instead
 */
export class AnimationConfigService {
  /**
   * @deprecated Use TimingAnimationConfigService.getTimingConfig instead
   */
  static getTimingConfig(preset: AnimationPreset): AnimationTimingConfig {
    return TimingAnimationConfigService.getTimingConfig(preset);
  }

  /**
   * @deprecated Use SpringAnimationConfigService.getSpringConfig instead
   */
  static getSpringConfig(preset: AnimationPreset): AnimationSpringConfig {
    return SpringAnimationConfigService.getSpringConfig(preset);
  }
}

