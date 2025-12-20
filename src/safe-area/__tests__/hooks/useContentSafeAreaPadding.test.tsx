/**
 * Tests for useContentSafeAreaPadding hook
 */

describe('useContentSafeAreaPadding', () => {
  it('should be defined', () => {
    const { useContentSafeAreaPadding } = require('../../hooks/useContentSafeAreaPadding');
    expect(useContentSafeAreaPadding).toBeDefined();
  });

  it('should return function', () => {
    const { useContentSafeAreaPadding } = require('../../hooks/useContentSafeAreaPadding');
    expect(typeof useContentSafeAreaPadding).toBe('function');
  });
});