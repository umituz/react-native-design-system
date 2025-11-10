/**
 * AtomicConfirmationModal - Universal Confirmation Dialog
 *
 * A reusable confirmation modal for destructive and important actions.
 * Follows Material Design 3 dialog patterns and accessibility guidelines.
 *
 * Features:
 * - Multiple variants (default, destructive, warning, success)
 * - Configurable text and icons
 * - Backdrop dismissal
 * - Full keyboard and screen reader support
 * - Theme-aware styling
 *
 * @example
 * ```tsx
 * // Destructive confirmation (delete)
 * <AtomicConfirmationModal
 *   visible={showDeleteModal}
 *   variant="destructive"
 *   title="Delete Item?"
 *   message="This action cannot be undone. All data will be permanently deleted."
 *   confirmText="Delete"
 *   cancelText="Cancel"
 *   onConfirm={handleDelete}
 *   onCancel={() => setShowDeleteModal(false)}
 * />
 *
 * // Generic confirmation
 * <AtomicConfirmationModal
 *   visible={showConfirmModal}
 *   variant="default"
 *   title="Confirm Action"
 *   message="Are you sure you want to proceed?"
 *   onConfirm={handleConfirm}
 *   onCancel={() => setShowConfirmModal(false)}
 * />
 * ```
 */
import React from 'react';
import { AtomicConfirmationModalProps, ConfirmationModalVariant } from './confirmation-modal/types';
export type { AtomicConfirmationModalProps };
export type { ConfirmationModalVariant };
export declare const AtomicConfirmationModal: React.FC<AtomicConfirmationModalProps>;
/**
 * Hook for managing confirmation modal state
 *
 * @example
 * ```tsx
 * const { showConfirmation, confirmationProps } = useConfirmationModal({
 *   title: 'Delete Item?',
 *   message: 'This cannot be undone',
 *   variant: 'destructive',
 *   onConfirm: handleDelete,
 * });
 *
 * // In JSX
 * <AtomicConfirmationModal {...confirmationProps} />
 * <Button onPress={showConfirmation}>Delete</Button>
 * ```
 */
export declare const useConfirmationModal: (config: {
    title: string;
    message: string;
    variant?: ConfirmationModalVariant;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
}) => {
    showConfirmation: () => any;
    hideConfirmation: () => any;
    confirmationProps: AtomicConfirmationModalProps;
};
