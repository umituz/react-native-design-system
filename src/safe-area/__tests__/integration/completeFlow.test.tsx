/**
 * Integration tests for complete flow
 */

describe('Integration Tests', () => {
  it('should import useSafeAreaInsets', () => {
    const { useSafeAreaInsets } = require('../../hooks/useSafeAreaInsets');
    expect(useSafeAreaInsets).toBeDefined();
  });

  it('should import useStatusBarSafeAreaPadding', () => {
    const { useStatusBarSafeAreaPadding } = require('../../hooks/useStatusBarSafeAreaPadding');
    expect(useStatusBarSafeAreaPadding).toBeDefined();
  });

  it('should import useHeaderSafeAreaPadding', () => {
    const { useHeaderSafeAreaPadding } = require('../../hooks/useHeaderSafeAreaPadding');
    expect(useHeaderSafeAreaPadding).toBeDefined();
  });

  it('should import useContentSafeAreaPadding', () => {
    const { useContentSafeAreaPadding } = require('../../hooks/useContentSafeAreaPadding');
    expect(useContentSafeAreaPadding).toBeDefined();
  });
});