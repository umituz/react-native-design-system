/**
 * Fireworks Component Tests
 *
 * Unit tests for fireworks particle system.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Fireworks } from '../Fireworks';
import { useFireworks } from '../../hooks/useFireworks';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => ({
  useAnimatedStyle: jest.fn((styleFactory) => styleFactory()),
  withTiming: jest.fn((toValue, config) => ({ toValue, config })),
}));

// Mock useFireworks hook
jest.mock('../../hooks/useFireworks', () => ({
  useFireworks: jest.fn(() => ({
    particles: [
      { x: 100, y: 100, color: '#FF0000', size: 4, life: 1 },
      { x: 150, y: 150, color: '#00FF00', size: 6, life: 0.5 },
    ],
    trigger: jest.fn(),
    isActive: true,
  })),
}));

describe('Fireworks Component', () => {
  const defaultProps = {
    colors: ['#FF0000', '#00FF00', '#0000FF'],
    testID: 'test-fireworks',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { getByTestId } = render(<Fireworks {...defaultProps} />);

    expect(getByTestId('test-fireworks')).toBeTruthy();
  });

  it('should render particles', () => {
    const { getAllByTestId } = render(<Fireworks {...defaultProps} />);

    const particles = getAllByTestId(/particle-/);
    expect(particles).toHaveLength(2);
  });

  it('should use default props when not provided', () => {
    const { getByTestId } = render(
      <Fireworks colors={['#FF0000']} />
    );

    expect(getByTestId('fireworks')).toBeTruthy();
  });

  it('should apply custom styles', () => {
    const customStyle = { backgroundColor: 'blue' };
    const { getByTestId } = render(
      <Fireworks
        colors={['#FF0000']}
        style={customStyle}
      />
    );

    const container = getByTestId('fireworks');
    expect(container.props.style).toEqual(
      expect.arrayContaining([customStyle])
    );
  });

  it('should handle layout changes', () => {
    const { getByTestId } = render(<Fireworks {...defaultProps} />);
    const container = getByTestId('test-fireworks');

    fireEvent(container, 'layout', {
      nativeEvent: {
        layout: { width: 300, height: 400 }
      }
    });
  });

  it('should have pointerEvents disabled', () => {
    const { getByTestId } = render(<Fireworks {...defaultProps} />);
    const container = getByTestId('test-fireworks');

    expect(container.props.pointerEvents).toBe('none');
  });

  describe('autoTrigger', () => {
    it('should trigger fireworks when autoTrigger is true and container has size', () => {
      const mockTrigger = jest.fn();
      (useFireworks as jest.Mock).mockReturnValue({
        particles: [],
        trigger: mockTrigger,
        isActive: false,
      });

      const { getByTestId } = render(
        <Fireworks
          colors={['#FF0000']}
          autoTrigger={true}
        />
      );

      const container = getByTestId('fireworks');
      fireEvent(container, 'layout', {
        nativeEvent: {
          layout: { width: 300, height: 400 }
        }
      });

      expect(mockTrigger).toHaveBeenCalledWith(150, 200); // center of container
    });

    it('should not trigger when autoTrigger is false', () => {
      const mockTrigger = jest.fn();
      (useFireworks as jest.Mock).mockReturnValue({
        particles: [],
        trigger: mockTrigger,
        isActive: false,
      });

      render(
        <Fireworks
          colors={['#FF0000']}
          autoTrigger={false}
        />
      );

      expect(mockTrigger).not.toHaveBeenCalled();
    });

    it('should use custom trigger position', () => {
      const mockTrigger = jest.fn();
      (useFireworks as jest.Mock).mockReturnValue({
        particles: [],
        trigger: mockTrigger,
        isActive: false,
      });

      const { getByTestId } = render(
        <Fireworks
          colors={['#FF0000']}
          autoTrigger={true}
          triggerX={0.25}
          triggerY={0.75}
        />
      );

      const container = getByTestId('fireworks');
      fireEvent(container, 'layout', {
        nativeEvent: {
          layout: { width: 400, height: 200 }
        }
      });

      expect(mockTrigger).toHaveBeenCalledWith(100, 150); // 25% of width, 75% of height
    });
  });

  describe('Particle rendering', () => {
    it('should render particle with correct properties', () => {
      const particles = [
        { x: 100, y: 100, color: '#FF0000', size: 4, life: 1 },
      ];
      (useFireworks as jest.Mock).mockReturnValue({
        particles,
        trigger: jest.fn(),
        isActive: false,
      });

      render(<Fireworks colors={['#FF0000']} />);

      // Particle should be rendered with correct properties
      expect(useFireworks).toHaveBeenCalledWith({
        colors: ['#FF0000'],
      });
    });
  });
});