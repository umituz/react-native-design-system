/**
 * useAppInitialization Hook
 * Manages app initialization state in React components
 */

import { useState, useEffect, useRef } from "react";
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

  // Store callbacks in refs to avoid re-running effect
  const onReadyRef = useRef(onReady);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onReadyRef.current = onReady;
    onErrorRef.current = onError;
  });

  useEffect(() => {
    if (skip) {
      setIsReady(true);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const initialize = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await initializer();

        if (cancelled) return;

        if (!result.success && result.failedModules.length > 0) {
          throw new Error(
            `Initialization failed: ${result.failedModules.join(", ")}`
          );
        }

        setIsReady(true);
        onReadyRef.current?.();
      } catch (err) {
        if (cancelled) return;

        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        onErrorRef.current?.(error);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    initialize();

    return () => {
      cancelled = true;
    };
  }, [initializer, skip]);

  return { isReady, isLoading, error };
}
