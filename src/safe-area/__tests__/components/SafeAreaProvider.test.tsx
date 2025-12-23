/**
 * Tests for SafeAreaProvider component
 */
import { SafeAreaProvider, useSafeAreaConfig } from '../../components/SafeAreaProvider';

describe('SafeAreaProvider', () => {
  it('should be defined', () => {
    expect(SafeAreaProvider).toBeDefined();
  });

  it('should have useSafeAreaConfig export', () => {
    expect(useSafeAreaConfig).toBeDefined();
  });
});