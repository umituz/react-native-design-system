/**
 * useLoading - Loading State Management Hook
 *
 * Centralized hook for managing loading states across the application
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Features:
 * - ✅ Simple boolean loading state
 * - ✅ Message management
 * - ✅ Icon configuration per context
 * - ✅ Type-safe loading control
 */

import { useState, useCallback } from 'react';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface LoadingConfig {
  isLoading: boolean;
  message?: string;
  icon?: string;
}

export interface UseLoadingReturn {
  /**
   * Current loading state
   */
  isLoading: boolean;

  /**
   * Current loading message
   */
  message: string | undefined;

  /**
   * Current loading icon
   */
  icon: string | undefined;

  /**
   * Start loading with optional message and icon
   */
  startLoading: (message?: string, icon?: string) => void;

  /**
   * Stop loading and clear message
   */
  stopLoading: () => void;

  /**
   * Update loading message without affecting state
   */
  setMessage: (message: string | undefined) => void;

  /**
   * Update loading icon without affecting state
   */
  setIcon: (icon: string | undefined) => void;
}

// =============================================================================
// HOOK IMPLEMENTATION
// =============================================================================

export const useLoading = (initialConfig?: LoadingConfig): UseLoadingReturn => {
  const [isLoading, setIsLoading] = useState(initialConfig?.isLoading ?? false);
  const [message, setMessage] = useState<string | undefined>(initialConfig?.message);
  const [icon, setIcon] = useState<string | undefined>(initialConfig?.icon);

  /**
   * Start loading with optional message and icon
   */
  const startLoading = useCallback((msg?: string, ico?: string) => {
    setIsLoading(true);
    if (msg !== undefined) setMessage(msg);
    if (ico !== undefined) setIcon(ico);
  }, []);

  /**
   * Stop loading and clear message
   */
  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setMessage(undefined);
  }, []);

  return {
    isLoading,
    message,
    icon,
    startLoading,
    stopLoading,
    setMessage,
    setIcon,
  };
};

export default useLoading;
