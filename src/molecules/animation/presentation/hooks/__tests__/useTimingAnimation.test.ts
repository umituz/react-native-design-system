/**
 * useTimingAnimation Hook Tests
 *
 * Unit tests for timing-based animations (fade, slide).
 */

import { renderHook, act } from '@testing-library/react';
import { useTimingAnimation } from '../useTimingAnimation';
import { ANIMATION_CONSTANTS } from '../../../domain/entities/Animation';
import { withTiming } from 'react-native-reanimated';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => ({
  useSharedValue: jest.fn((initialValue) => ({
    value: initialValue,
  })),
  useAnimatedStyle: jest.fn((styleFactory) => styleFactory()),
  withTiming: jest.fn((toValue, config) => ({ toValue, config })),
  Easing: {
    ease: jest.fn(),
    out: jest.fn((easing) => easing),
    bezier: jest.fn(() => jest.fn()),
  },
}));

// Mock AnimationConfigService
jest.mock('../../../infrastructure/services/TimingAnimationConfigService', () => ({
  TimingAnimationConfigService: {
    getTimingConfig: jest.fn(() => ({
      duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
    })),
  },
}));

describe('useTimingAnimation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useTimingAnimation());

    expect(result.current.opacity.value).toBe(1);
    expect(result.current.translateY.value).toBe(0);
    expect(result.current.translateX.value).toBe(0);
  });

  it('should provide animation functions', () => {
    const { result } = renderHook(() => useTimingAnimation());

    expect(typeof result.current.fadeIn).toBe('function');
    expect(typeof result.current.fadeOut).toBe('function');
    expect(typeof result.current.slideInUp).toBe('function');
    expect(typeof result.current.slideInDown).toBe('function');
    expect(typeof result.current.slideInLeft).toBe('function');
    expect(typeof result.current.slideInRight).toBe('function');
  });

  describe('fadeIn', () => {
    it('should animate opacity to 1 with default config', () => {
      const { result } = renderHook(() => useTimingAnimation());

      act(() => {
        result.current.fadeIn();
      });

      expect(withTiming).toHaveBeenCalledWith(1, {
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
        easing: expect.any(Function),
      });
    });

    it('should use custom config when provided', () => {
      const { result } = renderHook(() => useTimingAnimation());
      const customConfig = { duration: 500 };

      act(() => {
        result.current.fadeIn(customConfig);
      });

      expect(withTiming).toHaveBeenCalledWith(1, customConfig);
    });
  });

  describe('fadeOut', () => {
    it('should animate opacity to 0 with default config', () => {
      const { result } = renderHook(() => useTimingAnimation());

      act(() => {
        result.current.fadeOut();
      });

      expect(withTiming).toHaveBeenCalledWith(0, {
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
        easing: expect.any(Function),
      });
    });
  });

  describe('slideInUp', () => {
    it('should slide from bottom to top with default distance', () => {
      const { result } = renderHook(() => useTimingAnimation());

      act(() => {
        result.current.slideInUp();
      });

      expect(result.current.translateY.value).toBe(0);
      expect(withTiming).toHaveBeenCalledWith(0, {
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
        easing: expect.any(Function),
      });
    });

    it('should use custom distance', () => {
      const { result } = renderHook(() => useTimingAnimation());
      const customDistance = 150;

      act(() => {
        result.current.slideInUp(customDistance);
      });

      expect(result.current.translateY.value).toBe(0);
    });
  });

  describe('slideInDown', () => {
    it('should slide from top to bottom', () => {
      const { result } = renderHook(() => useTimingAnimation());

      act(() => {
        result.current.slideInDown();
      });

      expect(result.current.translateY.value).toBe(0);
    });
  });

  describe('slideInLeft', () => {
    it('should slide from left to right', () => {
      const { result } = renderHook(() => useTimingAnimation());

      act(() => {
        result.current.slideInLeft();
      });

      expect(result.current.translateX.value).toBe(0);
    });
  });

  describe('slideInRight', () => {
    it('should slide from right to left', () => {
      const { result } = renderHook(() => useTimingAnimation());

      act(() => {
        result.current.slideInRight();
      });

      expect(result.current.translateX.value).toBe(0);
    });
  });

  describe('shared values', () => {
    it('should expose shared values for custom animations', () => {
      const { result } = renderHook(() => useTimingAnimation());

      expect(result.current.opacity).toBeDefined();
      expect(result.current.translateY).toBeDefined();
      expect(result.current.translateX).toBeDefined();
    });
  });
});