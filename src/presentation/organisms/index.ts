/**
 * Organism Components Export Index
 *
 * Organisms are complex components composed of molecules and atoms
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ORGANISMS
 */

// Component exports
// AppHeader - Main application header with navigation
export { AppHeader } from './AppHeader';

// ScreenLayout - Universal screen container with consistent layout
export { ScreenLayout } from './ScreenLayout';

// Type exports
export type { AppHeaderProps } from './AppHeader';
export type { ScreenLayoutProps } from './ScreenLayout';

// Union type for all organism props (used for type narrowing)
import type { AppHeaderProps } from './AppHeader';
import type { ScreenLayoutProps } from './ScreenLayout';

export type OrganismComponentProps = AppHeaderProps | ScreenLayoutProps;
