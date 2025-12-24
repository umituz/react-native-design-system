/**
 * AnimationThemeProvider Tests
 *
 * Unit tests for theme system functionality.
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { AnimationThemeProvider, useAnimationTheme } from '../AnimationThemeProvider';
import { DEFAULT_ANIMATION_THEME } from '../../../domain/entities/AnimationTheme';

// Mock console.warn
const originalWarn = console.warn;
beforeEach(() => {
  console.warn = jest.fn();
});

afterEach(() => {
  console.warn = originalWarn;
});

describe('AnimationThemeProvider', () => {
  it('should render children', () => {
    const TestComponent = () => <div>Test Child</div>;
    
    render(
      <AnimationThemeProvider>
        <TestComponent />
      </AnimationThemeProvider>
    );

    expect(screen.getByText('Test Child')).toBeTruthy();
  });

  it('should provide default theme when no custom theme provided', () => {
    const TestComponent = () => {
      const { theme } = useAnimationTheme();
      return <div>{theme.colors.primary}</div>;
    };

    render(
      <AnimationThemeProvider>
        <TestComponent />
      </AnimationThemeProvider>
    );

    expect(screen.getByText(DEFAULT_ANIMATION_THEME.colors.primary)).toBeTruthy();
  });

  it('should merge custom theme with default theme', () => {
    const customTheme = {
      colors: {
        primary: '#custom-color',
      },
    };

    const TestComponent = () => {
      const { theme } = useAnimationTheme();
      return <div>{theme.colors.primary}</div>;
    };

    render(
      <AnimationThemeProvider theme={customTheme}>
        <TestComponent />
      </AnimationThemeProvider>
    );

    expect(screen.getByText('#custom-color')).toBeTruthy();
  });

  it('should preserve default values for non-overridden properties', () => {
    const customTheme = {
      colors: {
        primary: '#custom-color',
      },
    };

    const TestComponent = () => {
      const { theme } = useAnimationTheme();
      return <div>{theme.colors.secondary}</div>;
    };

    render(
      <AnimationThemeProvider theme={customTheme}>
        <TestComponent />
      </AnimationThemeProvider>
    );

    expect(screen.getByText(DEFAULT_ANIMATION_THEME.colors.secondary)).toBeTruthy();
  });

  it('should allow theme updates', () => {
    const TestComponent = () => {
      const { theme, setTheme } = useAnimationTheme();
      
      React.useEffect(() => {
        setTheme({ colors: { primary: '#updated-color' } });
      }, [setTheme]);

      return <div>{theme.colors.primary}</div>;
    };

    render(
      <AnimationThemeProvider>
        <TestComponent />
      </AnimationThemeProvider>
    );

    expect(screen.getByText('#updated-color')).toBeTruthy();
  });
});

describe('useAnimationTheme', () => {
  it('should return theme and setTheme', () => {
    const TestComponent = () => {
      const { theme, setTheme } = useAnimationTheme();
      
      return (
        <div>
          <div testID="theme">{JSON.stringify(theme)}</div>
          <div testID="set-theme">{typeof setTheme}</div>
        </div>
      );
    };

    render(
      <AnimationThemeProvider>
        <TestComponent />
      </AnimationThemeProvider>
    );

    expect(screen.getByTestId('set-theme')).toHaveTextContent('function');
    
    const themeElement = screen.getByTestId('theme');
    const theme = JSON.parse(themeElement.props.children);
    expect(theme).toHaveProperty('colors');
    expect(theme).toHaveProperty('spacing');
    expect(theme).toHaveProperty('borderRadius');
    expect(theme).toHaveProperty('opacity');
  });

  it('should warn when used outside provider', () => {
    const TestComponent = () => {
      const { theme } = useAnimationTheme();
      return <div>{theme.colors.primary}</div>;
    };

    render(<TestComponent />);

    expect(console.warn).toHaveBeenCalledWith(
      'useAnimationTheme must be used within AnimationThemeProvider'
    );
  });

  it('should return default theme when used outside provider', () => {
    const TestComponent = () => {
      const { theme } = useAnimationTheme();
      return <div>{theme.colors.primary}</div>;
    };

    render(<TestComponent />);

    expect(screen.getByText(DEFAULT_ANIMATION_THEME.colors.primary)).toBeTruthy();
  });
});