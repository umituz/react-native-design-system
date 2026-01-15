/**
 * useAppInitialization Hook
 * Manages app initialization state in React components
 */

import { useState, useEffect, useCallback } from "react";
import type {
  UseAppInitializationOptions,
  UseAppInitializationReturn,
  AppInitializerResult,
} from "./types";

/**
 * Hook to manage app initialization
 *
 * @example
 * ```typescript
 * const { isReady, isLoading, error } = useAppInitialization(initializeApp, {
 *   onReady: () => console.log('App ready!'),
 * });
 *
 * if (isLoading) return <SplashScreen />;
 * if (error) return <ErrorScreen error={error} />;
 * return <App />;
 * ```
 */
export function useAppInitialization(
  initializer: () => Promise<AppInitializerResult>,
  options: UseAppInitializationOptions = {}
): UseAppInitializationReturn {
  const { skip = false, onReady, onError } = options;

  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(!skip);
  const [error, setError] = useState<Error | null>(null);

  const initialize = useCallback(async () => {
    if (skip) {
      setIsReady(true);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const result = await initializer();

      if (!result.success && result.failedModules.length > 0) {
        const criticalFailed = result.failedModules.length > 0;
        if (criticalFailed) {
          throw new Error(
            `Initialization failed: ${result.failedModules.join(", ")}`
          );
        }
      }

      setIsReady(true);
      onReady?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [initializer, skip, onReady, onError]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return { isReady, isLoading, error };
}
