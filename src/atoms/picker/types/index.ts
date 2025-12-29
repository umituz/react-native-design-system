import { ViewStyle, TextStyle } from 'react-native';
import { IconColor } from '../../AtomicIcon';

/**
 * Picker option item
 *
 * icon: Any MaterialIcons name
 * @see https://fonts.google.com/icons
 */
export interface PickerOption {
  label: string;
  value: string;
  icon?: string; // MaterialIcons name
  disabled?: boolean;
  description?: string;
  testID?: string;
}

export type PickerSize = 'sm' | 'md' | 'lg';

/**
 * AtomicPickerProps
 *
 * IMPORTANT: String props (placeholder, emptyMessage, etc.) are REQUIRED
 * for proper i18n support. Pass translated strings from your app's i18n system.
 * Do NOT rely on default English values.
 */
export interface AtomicPickerProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options: PickerOption[];
  label?: string;
  /** Placeholder text - REQUIRED for i18n, pass translated string */
  placeholder: string;
  error?: string;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  autoClose?: boolean;
  color?: IconColor;
  size?: PickerSize;
  modalTitle?: string;
  /** Empty state message - REQUIRED for i18n, pass translated string */
  emptyMessage: string;
  /** Search placeholder text - REQUIRED for i18n, pass translated string */
  searchPlaceholder: string;
  /** Clear button accessibility label - REQUIRED for i18n, pass translated string */
  clearAccessibilityLabel: string;
  /** Close button accessibility label - REQUIRED for i18n, pass translated string */
  closeAccessibilityLabel: string;
  style?: ViewStyle | ViewStyle[];
  labelStyle?: TextStyle | TextStyle[];
  testID?: string;
}
