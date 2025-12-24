/**
 * useCelebrationState Hook
 * Single Responsibility: Manage celebration modal state
 */

import { useState, useCallback } from "react";
import type { CelebrationConfig } from "../../domain/entities/CelebrationConfig";

export interface UseCelebrationStateReturn {
  visible: boolean;
  config: CelebrationConfig | null;
  show: (config: CelebrationConfig) => void;
  hide: () => void;
}

const ANIMATION_CLEANUP_DELAY = 300;

/**
 * Hook for managing celebration modal state
 */
export function useCelebrationState(): UseCelebrationStateReturn {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<CelebrationConfig | null>(null);

  const show = useCallback((celebrationConfig: CelebrationConfig) => {
    setConfig(celebrationConfig);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
    // Clear config after animation completes
    setTimeout(() => {
      setConfig(null);
    }, ANIMATION_CLEANUP_DELAY);
  }, []);

  return {
    visible,
    config: config || null,
    show,
    hide,
  };
}

