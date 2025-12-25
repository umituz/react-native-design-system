/**
 * useTransformAnimation Hook Tests
 *
 * Unit tests for transform-based animations (spin, pulse, shake).
 */

import { renderHook, act } from '@testing-library/react';
import { useTransformAnimation } from '../useTransformAnimation';
import { withTiming, withSequence, withRepeat, Easing } from 'react-native-reanimated';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => ({
  useSharedValue: jest.fn((initialValue) => ({
    value: initialValue,
  })),
  useAnimatedStyle: jest.fn((styleFactory) => styleFactory()),
  withTiming: jest.fn((toValue, config) => ({ toValue, config })),
  withSequence: jest.fn((...animations) => animations),
  withRepeat: jest.fn((animation, count, reverse) => ({ animation, count, reverse })),
  Easing: {
    linear: jest.fn(),
  },
}));

describe('useTransformAnimation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useTransformAnimation());

    expect(result.current.translateX.value).toBe(0);
    expect(result.current.scale.value).toBe(1);
    expect(result.current.rotate.value).toBe(0);
  });

  it('should provide animation functions', () => {
    const { result } = renderHook(() => useTransformAnimation());

    expect(typeof result.current.shake).toBe('function');
    expect(typeof result.current.pulse).toBe('function');
    expect(typeof result.current.spin).toBe('function');
  });

  describe('shake', () => {
    it('should create shake animation sequence', () => {
      const { result } = renderHook(() => useTransformAnimation());

      act(() => {
        result.current.shake();
      });

      expect(withSequence).toHaveBeenCalledWith(
        withTiming(-10, { duration: 50 }),
        withRepeat(withTiming(10, { duration: 50 }), 4, true),
        withTiming(0, { duration: 50 })
      );
    });
  });

  describe('pulse', () => {
    it('should create pulse animation with default repeat count', () => {
      const { result } = renderHook(() => useTransformAnimation());

      act(() => {
        result.current.pulse();
      });

      expect(withRepeat).toHaveBeenCalledWith(
        withSequence(withTiming(1.1, { duration: 500 }), withTiming(1, { duration: 500 })),
        -1,
        false
      );
    });

    it('should use custom repeat count', () => {
      const { result } = renderHook(() => useTransformAnimation());
      const customRepeatCount = 3;

      act(() => {
        result.current.pulse(customRepeatCount);
      });

      expect(withRepeat).toHaveBeenCalledWith(
        expect.any(Object),
        customRepeatCount,
        false
      );
    });
  });

  describe('spin', () => {
    it('should create spin animation with default repeat count', () => {
      const { result } = renderHook(() => useTransformAnimation());

      act(() => {
        result.current.spin();
      });

      expect(withRepeat).toHaveBeenCalledWith(
        withTiming(360, { duration: 1000, easing: Easing.linear }),
        -1,
        false
      );
    });

    it('should use custom repeat count', () => {
      const { result } = renderHook(() => useTransformAnimation());
      const customRepeatCount = 2;

      act(() => {
        result.current.spin(customRepeatCount);
      });

      expect(withRepeat).toHaveBeenCalledWith(
        expect.any(Object),
        customRepeatCount,
        false
      );
    });
  });

  describe('shared values', () => {
    it('should expose shared values for custom animations', () => {
      const { result } = renderHook(() => useTransformAnimation());

      expect(result.current.translateX).toBeDefined();
      expect(result.current.scale).toBeDefined();
      expect(result.current.rotate).toBeDefined();
    });
  });
});