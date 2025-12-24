/**
 * Fireworks Domain Entity
 *
 * Types and constants for fireworks particle system
 */

/**
 * Particle configuration
 */
export interface ParticleConfig {
  x: number;
  y: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
  life: number;
  decay: number;
}

/**
 * Fireworks configuration
 */
export interface FireworksConfig {
  particleCount?: number;
  colors: string[]; // Required - colors must be provided by consumer
  duration?: number;
  particleSize?: number;
  spread?: number;
}

/**
 * Fireworks constants
 */
export const FIREWORKS_CONSTANTS = {
  DEFAULT_PARTICLE_COUNT: 50,
  DEFAULT_DURATION: 2000,
  DEFAULT_PARTICLE_SIZE: 4,
  DEFAULT_SPREAD: 100,
  DEFAULT_COLORS: [] as string[], // Colors should be provided by consumer
  GRAVITY: 0.3,
  DECAY_RATE: 0.02,
} as const;

