/**
 * TimingAnimationConfigService Tests
 *
 * Unit tests for timing animation configuration service.
 */

import { TimingAnimationConfigService } from '../TimingAnimationConfigService';
import { AnimationPreset, ANIMATION_CONSTANTS } from '../../../domain/entities/Animation';

describe('TimingAnimationConfigService', () => {
  describe('getTimingConfig', () => {
    it('should return config for FADE_IN preset', () => {
      const config = TimingAnimationConfigService.getTimingConfig(AnimationPreset.FADE_IN);

      expect(config).toEqual({
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      });
    });

    it('should return config for FADE_OUT preset', () => {
      const config = TimingAnimationConfigService.getTimingConfig(AnimationPreset.FADE_OUT);

      expect(config).toEqual({
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      });
    });

    it('should return config for SLIDE_IN_UP preset', () => {
      const config = TimingAnimationConfigService.getTimingConfig(AnimationPreset.SLIDE_IN_UP);

      expect(config).toEqual({
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      });
    });

    it('should return config for SLIDE_IN_DOWN preset', () => {
      const config = TimingAnimationConfigService.getTimingConfig(AnimationPreset.SLIDE_IN_DOWN);

      expect(config).toEqual({
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      });
    });

    it('should return config for SLIDE_IN_LEFT preset', () => {
      const config = TimingAnimationConfigService.getTimingConfig(AnimationPreset.SLIDE_IN_LEFT);

      expect(config).toEqual({
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      });
    });

    it('should return config for SLIDE_IN_RIGHT preset', () => {
      const config = TimingAnimationConfigService.getTimingConfig(AnimationPreset.SLIDE_IN_RIGHT);

      expect(config).toEqual({
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      });
    });

    it('should return config for SCALE_IN preset', () => {
      const config = TimingAnimationConfigService.getTimingConfig(AnimationPreset.SCALE_IN);

      expect(config).toEqual({
        duration: ANIMATION_CONSTANTS.DURATION.FAST,
      });
    });

    it('should return config for SCALE_OUT preset', () => {
      const config = TimingAnimationConfigService.getTimingConfig(AnimationPreset.SCALE_OUT);

      expect(config).toEqual({
        duration: ANIMATION_CONSTANTS.DURATION.FAST,
      });
    });

    it('should return config for BOUNCE preset', () => {
      const config = TimingAnimationConfigService.getTimingConfig(AnimationPreset.BOUNCE);

      expect(config).toEqual({
        duration: ANIMATION_CONSTANTS.DURATION.SLOW,
      });
    });

    it('should return config for SHAKE preset', () => {
      const config = TimingAnimationConfigService.getTimingConfig(AnimationPreset.SHAKE);

      expect(config).toEqual({
        duration: ANIMATION_CONSTANTS.DURATION.FAST,
      });
    });

    it('should handle all animation presets', () => {
      const presets = Object.values(AnimationPreset);

      presets.forEach(preset => {
        const config = TimingAnimationConfigService.getTimingConfig(preset);
        
        expect(config).toBeDefined();
        expect(config).toHaveProperty('duration');
        expect(typeof config.duration).toBe('number');
        expect(config.duration).toBeGreaterThan(0);
      });
    });
  });
});