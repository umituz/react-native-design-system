/**
 * Tests for SafeAreaProvider component
 */

describe('SafeAreaProvider', () => {
  it('should be defined', () => {
    const { SafeAreaProvider } = require('../../components/SafeAreaProvider');
    expect(SafeAreaProvider).toBeDefined();
  });

  it('should have useSafeAreaConfig export', () => {
    const { useSafeAreaConfig } = require('../../components/SafeAreaProvider');
    expect(useSafeAreaConfig).toBeDefined();
  });
});