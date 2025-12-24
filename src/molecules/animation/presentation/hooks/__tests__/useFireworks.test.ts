/**
 * useFireworks Hook Tests
 *
 * Unit tests for fireworks particle system.
 */

import { renderHook, act } from '@testing-library/react';
import { useFireworks } from '../useFireworks';
import { FIREWORKS_CONSTANTS } from '../../../domain/entities/Animation';

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((cb) => {
  setTimeout(cb, 16);
  return 1;
});

global.cancelAnimationFrame = jest.fn();

describe('useFireworks', () => {
  const mockConfig = {
    colors: ['#FF0000', '#00FF00', '#0000FF'],
    particleCount: 10,
    duration: 1000,
    particleSize: 4,
    spread: 50,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with empty particles and inactive state', () => {
    const { result } = renderHook(() => useFireworks(mockConfig));

    expect(result.current.particles).toEqual([]);
    expect(result.current.isActive).toBe(false);
    expect(typeof result.current.trigger).toBe('function');
  });

  it('should require colors array', () => {
    const { result } = renderHook(() => useFireworks({ colors: [] }));

    expect(result.current.particles).toEqual([]);
    expect(result.current.trigger).toEqual(expect.any(Function));
    expect(result.current.isActive).toBe(false);
  });

  describe('trigger', () => {
    it('should create particles with correct count', () => {
      const { result } = renderHook(() => useFireworks(mockConfig));

      act(() => {
        result.current.trigger(100, 100);
      });

      expect(result.current.particles).toHaveLength(mockConfig.particleCount);
    });

    it('should create particles with correct properties', () => {
      const { result } = renderHook(() => useFireworks(mockConfig));

      act(() => {
        result.current.trigger(100, 100);
      });

      const particles = result.current.particles;
      particles.forEach(particle => {
        expect(particle).toHaveProperty('x');
        expect(particle).toHaveProperty('y');
        expect(particle).toHaveProperty('color');
        expect(particle).toHaveProperty('size');
        expect(particle).toHaveProperty('velocityX');
        expect(particle).toHaveProperty('velocityY');
        expect(particle).toHaveProperty('life');
        expect(particle).toHaveProperty('decay');
      });
    });

    it('should use provided colors', () => {
      const { result } = renderHook(() => useFireworks(mockConfig));

      act(() => {
        result.current.trigger(100, 100);
      });

      const particles = result.current.particles;
      const particleColors = particles.map(p => p.color);
      
      particleColors.forEach(color => {
        expect(mockConfig.colors).toContain(color);
      });
    });

    it('should set particles at trigger position', () => {
      const { result } = renderHook(() => useFireworks(mockConfig));
      const triggerX = 150;
      const triggerY = 200;

      act(() => {
        result.current.trigger(triggerX, triggerY);
      });

      const particles = result.current.particles;
      particles.forEach(particle => {
        expect(particle.x).toBe(triggerX);
        expect(particle.y).toBe(triggerY);
      });
    });

    it('should use default position when none provided', () => {
      const { result } = renderHook(() => useFireworks(mockConfig));

      act(() => {
        result.current.trigger();
      });

      const particles = result.current.particles;
      particles.forEach(particle => {
        expect(particle.x).toBe(0);
        expect(particle.y).toBe(0);
      });
    });

    it('should set active state to true', () => {
      const { result } = renderHook(() => useFireworks(mockConfig));

      act(() => {
        result.current.trigger(100, 100);
      });

      expect(result.current.isActive).toBe(true);
    });

    it('should start animation loop', () => {
      const { result } = renderHook(() => useFireworks(mockConfig));

      act(() => {
        result.current.trigger(100, 100);
      });

      expect(global.requestAnimationFrame).toHaveBeenCalled();
    });

    it('should auto-stop after duration', () => {
      const { result } = renderHook(() => useFireworks(mockConfig));

      act(() => {
        result.current.trigger(100, 100);
      });

      expect(result.current.isActive).toBe(true);

      act(() => {
        jest.advanceTimersByTime(mockConfig.duration);
      });

      expect(result.current.isActive).toBe(false);
    });
  });

  describe('particle physics', () => {
    it('should update particle positions over time', () => {
      const { result } = renderHook(() => useFireworks(mockConfig));

      act(() => {
        result.current.trigger(100, 100);
      });

      const initialParticles = [...result.current.particles];

      act(() => {
        jest.advanceTimersByTime(16); // One frame
      });

      const updatedParticles = result.current.particles;
      
      updatedParticles.forEach((particle, index) => {
        const initial = initialParticles[index];
        expect(particle.x).not.toBe(initial.x);
        expect(particle.y).not.toBe(initial.y);
        expect(particle.life).toBeLessThan(initial.life);
      });
    });

    it('should apply gravity to particles', () => {
      const { result } = renderHook(() => useFireworks(mockConfig));

      act(() => {
        result.current.trigger(100, 100);
      });

      const initialParticles = [...result.current.particles];

      act(() => {
        jest.advanceTimersByTime(16);
      });

      const updatedParticles = result.current.particles;
      
      updatedParticles.forEach((particle, index) => {
        const initial = initialParticles[index];
        const expectedY = initial.y + initial.velocityY * 0.1 + FIREWORKS_CONSTANTS.GRAVITY;
        expect(particle.y).toBeCloseTo(expectedY, 1);
      });
    });

    it('should remove dead particles', () => {
      const { result } = renderHook(() => useFireworks(mockConfig));

      act(() => {
        result.current.trigger(100, 100);
      });

      // Simulate particles dying
      act(() => {
        jest.advanceTimersByTime(2000); // Long enough for particles to die
      });

      expect(result.current.particles).toHaveLength(0);
      expect(result.current.isActive).toBe(false);
    });
  });

  describe('cleanup', () => {
    it('should cancel animation frame on unmount', () => {
      const { result, unmount } = renderHook(() => useFireworks(mockConfig));

      act(() => {
        result.current.trigger(100, 100);
      });

      unmount();

      expect(global.cancelAnimationFrame).toHaveBeenCalled();
    });
  });
});