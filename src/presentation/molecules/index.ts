/**
 * Molecule Components Export Index
 *
 * Molecules are combinations of atoms that form more complex UI components
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: MOLECULES
 */

// Component exports
export { FormField } from './FormField';
export { ListItem } from './ListItem';
export { SearchBar } from './SearchBar';
export { LanguageSwitcher } from './LanguageSwitcher';
export { SectionCard } from './SectionCard';
export { IconContainer } from './IconContainer';
export { ScreenHeader } from './ScreenHeader';
export { AtomicConfirmationModal, useConfirmationModal } from './AtomicConfirmationModal';

// SettingItem moved to @domains/settings/presentation/components/SettingItem
// Import directly: import { SettingItem } from '@domains/settings/presentation/components/SettingItem';

// Type exports
export type { FormFieldProps } from './FormField';
export type { ListItemProps } from './ListItem';
export type { SearchBarProps } from './SearchBar';
export type { ScreenHeaderProps } from './ScreenHeader';
export type { AtomicConfirmationModalProps, ConfirmationModalVariant } from './AtomicConfirmationModal';

// Union type for all molecule props (used for type narrowing)
import type { FormFieldProps } from './FormField';
import type { ListItemProps } from './ListItem';
import type { SearchBarProps } from './SearchBar';
import type { ScreenHeaderProps } from './ScreenHeader';
import type { AtomicConfirmationModalProps } from './AtomicConfirmationModal';

export type MoleculeComponentProps =
  | FormFieldProps
  | ListItemProps
  | SearchBarProps
  | ScreenHeaderProps
  | AtomicConfirmationModalProps;
