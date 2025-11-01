/**
 * Loading Domain - Public API
 *
 * Domain-Driven Design (DDD) Architecture
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * This is the SINGLE SOURCE OF TRUTH for the Loading domain.
 * ALL imports from this domain MUST go through this file.
 *
 * Architecture:
 * - presentation/components: UI components (LoadingState, LoadingSpinner)
 * - presentation/hooks: React hooks (useLoading)
 *
 * Usage:
 *   import { LoadingState, LoadingSpinner, useLoading } from '@domains/design-system';
 */

// =============================================================================
// PRESENTATION LAYER - Components
// =============================================================================

export { LoadingState } from './presentation/components/LoadingState';
export type { LoadingStateProps, LoadingStateSize } from './presentation/components/LoadingState';

export { LoadingSpinner } from './presentation/components/LoadingSpinner';
export type {
  LoadingSpinnerProps,
  LoadingSpinnerSize,
  LoadingSpinnerColor,
} from './presentation/components/LoadingSpinner';

// =============================================================================
// PRESENTATION LAYER - Hooks
// =============================================================================

export { useLoading } from './presentation/hooks/useLoading';
export type {
  LoadingConfig,
  UseLoadingReturn,
} from './presentation/hooks/useLoading';
