/**
 * Fireworks Config Service
 * Single Responsibility: Build fireworks configuration from theme colors
 */

import type {
  ThemeColors,
  CelebrationFireworksConfig,
} from "../../domain/entities/FireworksConfig";
import {
  DEFAULT_FIREWORKS_COLORS,
  DEFAULT_FIREWORKS_CONFIG,
} from "../../domain/entities/FireworksConfig";

export class FireworksConfigService {
  /**
   * Build fireworks configuration with theme colors
   * Gracefully handles missing theme colors
   */
  static build(
    themeColors?: ThemeColors,
    customConfig?: Partial<CelebrationFireworksConfig>,
  ): CelebrationFireworksConfig {
    const colors: string[] = [];

    // Add theme colors if available
    if (themeColors?.primary) {
      colors.push(themeColors.primary);
    }
    if (themeColors?.success) {
      colors.push(themeColors.success);
    }
    if (themeColors?.warning) {
      colors.push(themeColors.warning);
    }

    // Add default colors
    colors.push(...DEFAULT_FIREWORKS_COLORS);

    return {
      particleCount: customConfig?.particleCount ?? DEFAULT_FIREWORKS_CONFIG.particleCount,
      duration: customConfig?.duration ?? DEFAULT_FIREWORKS_CONFIG.duration,
      colors: customConfig?.colors ?? colors,
      particleSize: customConfig?.particleSize,
      spread: customConfig?.spread,
    };
  }
}

