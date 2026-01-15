/**
 * App Initialization Module
 *
 * Provides utilities for app initialization:
 * - createAppInitializer: Factory for creating app initializers
 * - useAppInitialization: Hook for managing initialization state
 * - createEnvConfig: Environment configuration factory
 */

// App Initializer
export {
  createAppInitializer,
  createInitModule,
} from "./createAppInitializer";

// Initialization Hook
export { useAppInitialization } from "./useAppInitialization";

// Environment Configuration
export * from "./env";

// Types
export type {
  InitModule,
  AppInitializerConfig,
  AppInitializerResult,
  UseAppInitializationOptions,
  UseAppInitializationReturn,
} from "./types";
