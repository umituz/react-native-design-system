/**
 * useSpringAnimation Hook Tests
 *
 * Unit tests for spring-based animations (scale, bounce).
 */

import { renderHook, act } from '@testing-library/react';
import { useSpringAnimation } from '../useSpringAnimation';
import { AnimationPreset, ANIMATION_CONSTANTS } from '../../../domain/entities/Animation';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => ({
  useSharedValue: jest.fn((initialValue) => ({
    value: initialValue,
  })),
  useAnimatedStyle: jest.fn((styleFactory) => styleFactory()),
  withSpring: jest.fn((toValue, config) => ({ toValue, config })),
  withSequence: jest.fn((...animations) => animations),
}));

// Mock SpringAnimationConfigService
jest.mock('../../../infrastructure/services/SpringAnimationConfigService', () => ({
  SpringAnimationConfigService: {
    getSpringConfig: jest.fn((preset) => ({
      damping: ANIMATION_CONSTANTS.SPRING.DAMPING,
      stiffness: ANIMATION_CONSTANTS.SPRING.STIFFNESS,
    })),
  },
}));

describe('useSpringAnimation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSpringAnimation());

    expect(result.current.scale.value).toBe(1);
  });

  it('should provide animation functions', () => {
    const { result } = renderHook(() => useSpringAnimation());

    expect(typeof result.current.scaleIn).toBe('function');
    expect(typeof result.current.scaleOut).toBe('function');
    expect(typeof result.current.bounce).toBe('function');
  });

  describe('scaleIn', () => {
    it('should animate scale from 0 to 1 with default config', () => {
      const { result } = renderHook(() => useSpringAnimation());
      const { withSpring } = require('react-native-reanimated');

      act(() => {
        result.current.scaleIn();
      });

      expect(withSpring).toHaveBeenCalledWith(1, {
        damping: ANIMATION_CONSTANTS.SPRING.DAMPING,
        stiffness: ANIMATION_CONSTANTS.SPRING.STIFFNESS,
      });
    });

    it('should use custom config when provided', () => {
      const { result } = renderHook(() => useSpringAnimation());
      const { withSpring } = require('react-native-reanimated');
      const customConfig = { damping: 20, stiffness: 200 };

      act(() => {
        result.current.scaleIn(customConfig);
      });

      expect(withSpring).toHaveBeenCalledWith(1, customConfig);
    });
  });

  describe('scaleOut', () => {
    it('should animate scale to 0 with default config', () => {
      const { result } = renderHook(() => useSpringAnimation());
      const { withSpring } = require('react-native-reanimated');

      act(() => {
        result.current.scaleOut();
      });

      expect(withSpring).toHaveBeenCalledWith(0, {
        damping: ANIMATION_CONSTANTS.SPRING.DAMPING,
        stiffness: ANIMATION_CONSTANTS.SPRING.STIFFNESS,
      });
    });
  });

  describe('bounce', () => {
    it('should create bounce animation sequence', () => {
      const { result } = renderHook(() => useSpringAnimation());
      const { withSpring, withSequence } = require('react-native-reanimated');
      const mockConfig = { damping: 5, stiffness: 120 };

      act(() => {
        result.current.bounce(mockConfig);
      });

      expect(withSequence).toHaveBeenCalledWith(
        withSpring(0.8, mockConfig),
        withSpring(1.2, mockConfig),
        withSpring(1, mockConfig)
      );
    });

    it('should use default config when none provided', () => {
      const { result } = renderHook(() => useSpringAnimation());
      const { withSpring, withSequence } = require('react-native-reanimated');

      act(() => {
        result.current.bounce();
      });

      expect(withSequence).toHaveBeenCalled();
    });
  });

  describe('shared values', () => {
    it('should expose scale shared value for custom animations', () => {
      const { result } = renderHook(() => useSpringAnimation());

      expect(result.current.scale).toBeDefined();
      expect(result.current.scale.value).toBe(1);
    });
  });
});