/**
 * Splash Flow Hook
 * Manages splash screen initialization state
 *
 * IMPORTANT: Use isAppReady prop instead of duration for real initialization tracking.
 * Artificial delays cause poor UX - the splash should transition as soon as app is ready.
 */

import { useState, useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';

export interface UseSplashFlowOptions {
  /**
   * External readiness signal from app initialization
   * When true, splash will transition to main content
   */
  isAppReady?: boolean;
  /**
   * @deprecated Use isAppReady instead. Artificial delays cause poor UX.
   * Only use for fallback/timeout scenarios.
   */
  duration?: number;
}

export interface UseSplashFlowResult {
  isInitialized: boolean;
}

export const useSplashFlow = (options: UseSplashFlowOptions = {}): UseSplashFlowResult => {
  const { isAppReady, duration } = options;
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Primary: Use external app ready signal (preferred)
    if (isAppReady !== undefined) {
      if (isAppReady && !isInitialized) {
        setIsInitialized(true);
        DeviceEventEmitter.emit('splash-ready');
      }
      return undefined;
    }

    // Fallback: Use duration timer if isAppReady not provided (legacy support)
    if (duration !== undefined) {
      const timer = setTimeout(() => {
        setIsInitialized(true);
        DeviceEventEmitter.emit('splash-ready');
      }, duration);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [isAppReady, duration, isInitialized]);

  return { isInitialized };
};
