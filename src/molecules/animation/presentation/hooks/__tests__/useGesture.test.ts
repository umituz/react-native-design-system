/**
 * useGesture Hook Tests
 *
 * Unit tests for gesture handling functionality.
 */

import { renderHook } from '@testing-library/react';
import { GestureDetector } from 'react-native-gesture-handler';
import { useGesture } from '../useGesture';
import { useGestureCreators } from '../useGestureCreators';
import { useGestureState } from '../useGestureState';

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => ({
  GestureDetector: jest.fn(({ children }) => children),
  Gesture: {
    Tap: jest.fn(() => ({
      numberOfTaps: jest.fn().mockReturnThis(),
      maxDuration: jest.fn().mockReturnThis(),
      onStart: jest.fn().mockReturnThis(),
    })),
    Pan: jest.fn(() => ({
      onStart: jest.fn().mockReturnThis(),
      onUpdate: jest.fn().mockReturnThis(),
      onEnd: jest.fn().mockReturnThis(),
    })),
    Pinch: jest.fn(() => ({
      onStart: jest.fn().mockReturnThis(),
      onUpdate: jest.fn().mockReturnThis(),
      onEnd: jest.fn().mockReturnThis(),
    })),
    LongPress: jest.fn(() => ({
      minDuration: jest.fn().mockReturnThis(),
      onStart: jest.fn().mockReturnThis(),
    })),
  },
}));

// Mock useGestureState
jest.mock('../useGestureState', () => ({
  useGestureState: jest.fn(() => ({
    translateX: { value: 0 },
    translateY: { value: 0 },
    scale: { value: 1 },
    reset: jest.fn(),
    animatedStyle: {},
  })),
}));

// Mock useGestureCreators
jest.mock('../useGestureCreators', () => ({
  useGestureCreators: jest.fn(() => ({
    createTapGesture: jest.fn(),
    createPanGesture: jest.fn(),
    createPinchGesture: jest.fn(),
    createLongPressGesture: jest.fn(),
  })),
}));

describe('useGesture', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide gesture creators', () => {
    const { result } = renderHook(() => useGesture());

    expect(typeof result.current.createTapGesture).toBe('function');
    expect(typeof result.current.createPanGesture).toBe('function');
    expect(typeof result.current.createPinchGesture).toBe('function');
    expect(typeof result.current.createLongPressGesture).toBe('function');
  });

  it('should provide shared values', () => {
    const { result } = renderHook(() => useGesture());

    expect(result.current.translateX).toBeDefined();
    expect(result.current.translateY).toBeDefined();
    expect(result.current.scale).toBeDefined();
  });

  it('should provide utilities', () => {
    const { result } = renderHook(() => useGesture());

    expect(typeof result.current.reset).toBe('function');
    expect(result.current.animatedStyle).toBeDefined();
  });

  it('should export GestureDetector', () => {
    const { result } = renderHook(() => useGesture());

    expect(result.current.GestureDetector).toBe(GestureDetector);
  });

  describe('gesture creators integration', () => {
    it('should integrate with useGestureCreators', () => {
      renderHook(() => useGesture());

      expect(useGestureCreators).toHaveBeenCalled();
    });

    it('should integrate with useGestureState', () => {
      renderHook(() => useGesture());

      expect(useGestureState).toHaveBeenCalled();
    });
  });
});