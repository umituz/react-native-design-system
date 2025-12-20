/**
 * @umituz/react-native-design-system-organisms - Public API
 *
 * Organism design components for React Native - Complex UI patterns
 * Built from atoms and molecules following atomic design principles
 *
 * Usage:
 * ```typescript
 * import { ScreenLayout, AppHeader, FormContainer } from '@umituz/react-native-design-system-organisms';
 * ```
 */

// Component exports
export { AppHeader } from './AppHeader';
export { ScreenLayout } from './ScreenLayout';
export { FormContainer } from './FormContainer';

// Type exports
export type { AppHeaderProps } from './AppHeader';
export type { ScreenLayoutProps } from './ScreenLayout';
export type { FormContainerProps } from './FormContainer';

// Union type for all organism props (used for type narrowing)
import type { AppHeaderProps } from './AppHeader';
import type { ScreenLayoutProps } from './ScreenLayout';
import type { FormContainerProps } from './FormContainer';

export type OrganismComponentProps = 
  | { type: 'AppHeader'; props: AppHeaderProps }
  | { type: 'ScreenLayout'; props: ScreenLayoutProps }
  | { type: 'FormContainer'; props: FormContainerProps };
