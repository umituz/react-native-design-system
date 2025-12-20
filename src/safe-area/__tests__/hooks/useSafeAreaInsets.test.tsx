/**
 * Tests for useSafeAreaInsets hook
 */

describe('useSafeAreaInsets', () => {
  it('should be defined', () => {
    const { useSafeAreaInsets } = require('../../hooks/useSafeAreaInsets');
    expect(useSafeAreaInsets).toBeDefined();
  });

  it('should return function', () => {
    const { useSafeAreaInsets } = require('../../hooks/useSafeAreaInsets');
    expect(typeof useSafeAreaInsets).toBe('function');
  });
});