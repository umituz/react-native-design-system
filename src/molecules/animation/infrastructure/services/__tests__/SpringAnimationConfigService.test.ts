/**
 * SpringAnimationConfigService Tests
 *
 * Unit tests for spring animation configuration service.
 */

import { SpringAnimationConfigService } from '../SpringAnimationConfigService';
import { AnimationPreset, ANIMATION_CONSTANTS } from '../../../domain/entities/Animation';

describe('SpringAnimationConfigService', () => {
  describe('getSpringConfig', () => {
    it('should return config for FADE_IN preset', () => {
      const config = SpringAnimationConfigService.getSpringConfig(AnimationPreset.FADE_IN);

      expect(config).toEqual({
        damping: ANIMATION_CONSTANTS.SPRING.DAMPING,
        stiffness: ANIMATION_CONSTANTS.SPRING.STIFFNESS,
      });
    });

    it('should return config for FADE_OUT preset', () => {
      const config = SpringAnimationConfigService.getSpringConfig(AnimationPreset.FADE_OUT);

      expect(config).toEqual({
        damping: ANIMATION_CONSTANTS.SPRING.DAMPING,
        stiffness: ANIMATION_CONSTANTS.SPRING.STIFFNESS,
      });
    });

    it('should return config for SCALE_IN preset', () => {
      const config = SpringAnimationConfigService.getSpringConfig(AnimationPreset.SCALE_IN);

      expect(config).toEqual({
        damping: 15,
        stiffness: 150,
      });
    });

    it('should return config for SCALE_OUT preset', () => {
      const config = SpringAnimationConfigService.getSpringConfig(AnimationPreset.SCALE_OUT);

      expect(config).toEqual({
        damping: 15,
        stiffness: 150,
      });
    });

    it('should return config for BOUNCE preset', () => {
      const config = SpringAnimationConfigService.getSpringConfig(AnimationPreset.BOUNCE);

      expect(config).toEqual({
        damping: 5,
        stiffness: 120,
      });
    });

    it('should return config for SHAKE preset', () => {
      const config = SpringAnimationConfigService.getSpringConfig(AnimationPreset.SHAKE);

      expect(config).toEqual({
        damping: 8,
        stiffness: 200,
      });
    });

    it('should return default spring config for slide presets', () => {
      const slidePresets = [
        AnimationPreset.SLIDE_IN_UP,
        AnimationPreset.SLIDE_IN_DOWN,
        AnimationPreset.SLIDE_IN_LEFT,
        AnimationPreset.SLIDE_IN_RIGHT,
      ];

      slidePresets.forEach(preset => {
        const config = SpringAnimationConfigService.getSpringConfig(preset);
        
        expect(config).toEqual({
          damping: ANIMATION_CONSTANTS.SPRING.DAMPING,
          stiffness: ANIMATION_CONSTANTS.SPRING.STIFFNESS,
        });
      });
    });

    it('should handle all animation presets', () => {
      const presets = Object.values(AnimationPreset);

      presets.forEach(preset => {
        const config = SpringAnimationConfigService.getSpringConfig(preset);
        
        expect(config).toBeDefined();
        expect(config).toHaveProperty('damping');
        expect(config).toHaveProperty('stiffness');
        expect(typeof config.damping).toBe('number');
        expect(typeof config.stiffness).toBe('number');
        expect(config.damping).toBeGreaterThan(0);
        expect(config.stiffness).toBeGreaterThan(0);
      });
    });

    it('should have appropriate values for different animation types', () => {
      const bounceConfig = SpringAnimationConfigService.getSpringConfig(AnimationPreset.BOUNCE);
      const shakeConfig = SpringAnimationConfigService.getSpringConfig(AnimationPreset.SHAKE);
      const scaleConfig = SpringAnimationConfigService.getSpringConfig(AnimationPreset.SCALE_IN);

      // Bounce should be more bouncy (lower damping, moderate stiffness)
      expect(bounceConfig.damping).toBeLessThan(scaleConfig.damping);
      expect(bounceConfig.stiffness).toBeLessThan(scaleConfig.stiffness);

      // Shake should be quick and responsive (higher damping and stiffness)
      expect(shakeConfig.damping).toBeGreaterThan(bounceConfig.damping);
      expect(shakeConfig.stiffness).toBeGreaterThan(scaleConfig.stiffness);
    });
  });
});