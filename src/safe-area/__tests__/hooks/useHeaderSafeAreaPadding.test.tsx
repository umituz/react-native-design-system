/**
 * Tests for useHeaderSafeAreaPadding hook
 */

describe('useHeaderSafeAreaPadding', () => {
  it('should be defined', () => {
    const { useHeaderSafeAreaPadding } = require('../../hooks/useHeaderSafeAreaPadding');
    expect(useHeaderSafeAreaPadding).toBeDefined();
  });

  it('should return function', () => {
    const { useHeaderSafeAreaPadding } = require('../../hooks/useHeaderSafeAreaPadding');
    expect(typeof useHeaderSafeAreaPadding).toBe('function');
  });
});