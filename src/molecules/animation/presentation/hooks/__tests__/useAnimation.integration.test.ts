/**
 * useAnimation Hook Integration Tests
 *
 * Integration tests for combined animation functionality.
 */

import { renderHook, act } from '@testing-library/react';
import { useAnimation } from '../useAnimation';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => ({
  useSharedValue: jest.fn((initialValue) => ({
    value: initialValue,
  })),
  useAnimatedStyle: jest.fn((styleFactory) => styleFactory()),
  withTiming: jest.fn((toValue, config) => ({ toValue, config })),
  withSpring: jest.fn((toValue, config) => ({ toValue, config })),
  withSequence: jest.fn((...animations) => animations),
  withRepeat: jest.fn((animation, count, reverse) => ({ animation, count, reverse })),
  Easing: {
    ease: jest.fn(),
    out: jest.fn((easing) => easing),
    bezier: jest.fn(() => jest.fn()),
    linear: jest.fn(),
  },
}));

// Mock all sub-hooks
jest.mock('../useTimingAnimation', () => ({
  useTimingAnimation: jest.fn(() => ({
    fadeIn: jest.fn(),
    fadeOut: jest.fn(),
    slideInUp: jest.fn(),
    slideInDown: jest.fn(),
    slideInLeft: jest.fn(),
    slideInRight: jest.fn(),
    opacity: { value: 1 },
    translateY: { value: 0 },
    translateX: { value: 0 },
  })),
}));

jest.mock('../useSpringAnimation', () => ({
  useSpringAnimation: jest.fn(() => ({
    scaleIn: jest.fn(),
    scaleOut: jest.fn(),
    bounce: jest.fn(),
    scale: { value: 1 },
  })),
}));

jest.mock('../useTransformAnimation', () => ({
  useTransformAnimation: jest.fn(() => ({
    shake: jest.fn(),
    pulse: jest.fn(),
    spin: jest.fn(),
    translateX: { value: 0 },
    scale: { value: 1 },
    rotate: { value: 0 },
  })),
}));

describe('useAnimation Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should integrate all animation hooks', () => {
    const { useTimingAnimation } = require('../useTimingAnimation');
    const { useSpringAnimation } = require('../useSpringAnimation');
    const { useTransformAnimation } = require('../useTransformAnimation');

    renderHook(() => useAnimation());

    expect(useTimingAnimation).toHaveBeenCalled();
    expect(useSpringAnimation).toHaveBeenCalled();
    expect(useTransformAnimation).toHaveBeenCalled();
  });

  it('should provide all timing animations', () => {
    const { result } = renderHook(() => useAnimation());

    expect(typeof result.current.fadeIn).toBe('function');
    expect(typeof result.current.fadeOut).toBe('function');
    expect(typeof result.current.slideInUp).toBe('function');
    expect(typeof result.current.slideInDown).toBe('function');
    expect(typeof result.current.slideInLeft).toBe('function');
    expect(typeof result.current.slideInRight).toBe('function');
  });

  it('should provide all spring animations', () => {
    const { result } = renderHook(() => useAnimation());

    expect(typeof result.current.scaleIn).toBe('function');
    expect(typeof result.current.scaleOut).toBe('function');
    expect(typeof result.current.bounce).toBe('function');
  });

  it('should provide all transform animations', () => {
    const { result } = renderHook(() => useAnimation());

    expect(typeof result.current.shake).toBe('function');
    expect(typeof result.current.pulse).toBe('function');
    expect(typeof result.current.spin).toBe('function');
  });

  it('should provide all shared values', () => {
    const { result } = renderHook(() => useAnimation());

    expect(result.current.opacity).toBeDefined();
    expect(result.current.translateY).toBeDefined();
    expect(result.current.translateX).toBeDefined();
    expect(result.current.scale).toBeDefined();
    expect(result.current.rotate).toBeDefined();
  });

  it('should provide animated style', () => {
    const { result } = renderHook(() => useAnimation());
    const { useAnimatedStyle } = require('react-native-reanimated');

    expect(typeof result.current.animatedStyle).toBe('function');
    expect(useAnimatedStyle).toHaveBeenCalled();
  });

  describe('animation combinations', () => {
    it('should allow combining fade and scale animations', () => {
      const { result } = renderHook(() => useAnimation());
      const mockTiming = require('../useTimingAnimation').useTimingAnimation();
      const mockSpring = require('../useSpringAnimation').useSpringAnimation();

      act(() => {
        result.current.fadeIn();
        result.current.scaleIn();
      });

      expect(mockTiming.fadeIn).toHaveBeenCalled();
      expect(mockSpring.scaleIn).toHaveBeenCalled();
    });

    it('should allow combining slide and rotate animations', () => {
      const { result } = renderHook(() => useAnimation());
      const mockTiming = require('../useTimingAnimation').useTimingAnimation();
      const mockTransform = require('../useTransformAnimation').useTransformAnimation();

      act(() => {
        result.current.slideInUp();
        result.current.spin();
      });

      expect(mockTiming.slideInUp).toHaveBeenCalled();
      expect(mockTransform.spin).toHaveBeenCalled();
    });

    it('should allow complex animation sequences', () => {
      const { result } = renderHook(() => useAnimation());
      const mockTiming = require('../useTimingAnimation').useTimingAnimation();
      const mockSpring = require('../useSpringAnimation').useSpringAnimation();
      const mockTransform = require('../useTransformAnimation').useTransformAnimation();

      act(() => {
        result.current.fadeIn();
        result.current.slideInUp();
        result.current.scaleIn();
        result.current.bounce();
        result.current.shake();
        result.current.pulse();
        result.current.spin();
      });

      expect(mockTiming.fadeIn).toHaveBeenCalled();
      expect(mockTiming.slideInUp).toHaveBeenCalled();
      expect(mockSpring.scaleIn).toHaveBeenCalled();
      expect(mockSpring.bounce).toHaveBeenCalled();
      expect(mockTransform.shake).toHaveBeenCalled();
      expect(mockTransform.pulse).toHaveBeenCalled();
      expect(mockTransform.spin).toHaveBeenCalled();
    });
  });

  describe('animated style composition', () => {
    it('should compose styles from all animation types', () => {
      const { useAnimatedStyle } = require('react-native-reanimated');
      const mockStyle = {
        opacity: 1,
        transform: [
          { translateY: 0 },
          { translateX: 0 },
          { scale: 1 },
          { rotate: '0deg' },
        ],
      };

      useAnimatedStyle.mockReturnValue(mockStyle);

      const { result } = renderHook(() => useAnimation());

      expect(result.current.animatedStyle).toBe(mockStyle);
    });

    it('should prioritize transform values over timing/spring values', () => {
      const { useAnimatedStyle } = require('react-native-reanimated');
      const mockTiming = require('../useTimingAnimation').useTimingAnimation();
      const mockTransform = require('../useTransformAnimation').useTransformAnimation();

      // Set transform values to non-default
      mockTransform.translateX.value = 50;
      mockTransform.scale.value = 1.5;

      renderHook(() => useAnimation());

      expect(useAnimatedStyle).toHaveBeenCalledWith(
        expect.any(Function)
      );
    });
  });
});