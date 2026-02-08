/**
 * Onboarding Flow Hook
 * Manages onboarding completion state with persistence
 */

import { useState, useEffect, useCallback } from 'react';
import { DeviceEventEmitter } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = 'onboarding_complete';

export interface UseOnboardingFlowResult {
  isOnboardingComplete: boolean;
  completeOnboarding: () => Promise<void>;
}

export const useOnboardingFlow = (): UseOnboardingFlowResult => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  // Load persisted state
  useEffect(() => {
    const isMounted = { current: true };

    const loadPersistedState = async () => {
      const value = await AsyncStorage.getItem(ONBOARDING_KEY);
      if (isMounted.current) {
        setIsOnboardingComplete(value === 'true');
      }
    };

    loadPersistedState();

    const subscription = DeviceEventEmitter.addListener(
      'onboarding-complete',
      () => {
        if (isMounted.current) {
          setIsOnboardingComplete(true);
          AsyncStorage.setItem(ONBOARDING_KEY, 'true');
        }
      },
    );

    return () => {
      isMounted.current = false;
      subscription.remove();
    };
  }, []);

  const completeOnboarding = useCallback(async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setIsOnboardingComplete(true);
    DeviceEventEmitter.emit('onboarding-complete');
  }, []);

  return {
    isOnboardingComplete,
    completeOnboarding,
  };
};
