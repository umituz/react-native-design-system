/**
 * Simple test utilities for safe area package
 */

export const mockSafeAreaInsets = {
  top: 44,
  bottom: 34,
  left: 0,
  right: 0,
};

export const createWrapper = (insets = mockSafeAreaInsets) => {
  return ({ children }: { children: any }) => children;
};

export const renderHookWithSafeArea = <T, P>(
  hook: (props: P) => T,
  options?: {
    initialProps?: P;
    wrapper?: any;
    insets?: typeof mockSafeAreaInsets;
  },
) => {
  const wrapper = options?.wrapper || createWrapper(options?.insets);
  
  return {
    result: { current: hook(options?.initialProps as P) },
    rerender: () => {},
  };
};

export const resetMocks = () => {
  jest.clearAllMocks();
  jest.resetModules();
};

describe('testUtils', () => {
  it('should export functions', () => {
    expect(typeof mockSafeAreaInsets).toBe('object');
    expect(typeof createWrapper).toBe('function');
    expect(typeof resetMocks).toBe('function');
  });
});