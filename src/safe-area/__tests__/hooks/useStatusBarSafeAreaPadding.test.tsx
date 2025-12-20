/**
 * Tests for useStatusBarSafeAreaPadding hook
 */

describe('useStatusBarSafeAreaPadding', () => {
  it('should be defined', () => {
    const { useStatusBarSafeAreaPadding } = require('../../hooks/useStatusBarSafeAreaPadding');
    expect(useStatusBarSafeAreaPadding).toBeDefined();
  });

  it('should return function', () => {
    const { useStatusBarSafeAreaPadding } = require('../../hooks/useStatusBarSafeAreaPadding');
    expect(typeof useStatusBarSafeAreaPadding).toBe('function');
  });
});