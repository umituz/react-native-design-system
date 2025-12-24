/**
 * Fireworks Config Entity
 * Single Responsibility: Define fireworks configuration types and constants
 */

import type { FireworksConfig as AnimationFireworksConfig } from "../../../animation";

export interface ThemeColors {
  primary?: string;
  success?: string;
  warning?: string;
}

export interface CelebrationFireworksConfig extends Omit<AnimationFireworksConfig, 'colors'> {
  colors: string[];
}

export const DEFAULT_FIREWORKS_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#FFE66D",
  "#A8E6CF",
  "#95E1D3",
  "#F38181",
  "#AA96DA",
] as const;

export const DEFAULT_FIREWORKS_CONFIG: Required<Pick<CelebrationFireworksConfig, "particleCount" | "duration">> = {
  particleCount: 80,
  duration: 2000,
} as const;

