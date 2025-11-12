/**
 * AtomicConfirmationModal Type Definitions
 *
 * Type-safe interfaces for confirmation modal component
 */

import { StyleProp, ViewStyle } from 'react-native';
import type { AtomicIconColor } from '@umituz/react-native-design-system-atoms';

/**
 * Confirmation modal variant
 * Determines the visual style and default behavior
 */
export type ConfirmationModalVariant =
  | 'default'      // Generic confirmation (blue/primary)
  | 'destructive'  // Delete/remove actions (red/error)
  | 'warning'      // Warning/caution (orange/warning)
  | 'success';     // Success confirmation (green/success)

/**
 * Props for AtomicConfirmationModal component
 */
export interface AtomicConfirmationModalProps {
  /**
   * Whether the modal is visible
   */
  visible: boolean;

  /**
   * Modal title (required)
   * e.g., "Delete Item?", "Confirm Action", "Are you sure?"
   */
  title: string;

  /**
   * Modal message/description (required)
   * e.g., "This action cannot be undone."
   */
  message: string;

  /**
   * Variant determines visual style
   * @default 'default'
   */
  variant?: ConfirmationModalVariant;

  /**
   * Confirm button text (required)
   */
  confirmText: string;

  /**
   * Cancel button text (required)
   */
  cancelText: string;

  /**
   * Icon name to display at top (MaterialIcons name)
   * If not provided, uses variant-specific default icon
   * @see https://fonts.google.com/icons
   */
  icon?: string;

  /**
   * Callback when user confirms
   */
  onConfirm: () => void;

  /**
   * Callback when user cancels or dismisses
   */
  onCancel: () => void;

  /**
   * Whether to show backdrop (tap outside to close)
   * @default true
   */
  showBackdrop?: boolean;

  /**
   * Whether backdrop is dismissible
   * @default true
   */
  backdropDismissible?: boolean;

  /**
   * Custom style for modal container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Test ID for testing
   */
  testID?: string;
}

/**
 * Variant configuration
 * Maps variant to icon, colors, and default text
 */
export interface ConfirmationModalVariantConfig {
  icon: string; // MaterialIcons name
  confirmText: string;
  iconColor: AtomicIconColor;
}
