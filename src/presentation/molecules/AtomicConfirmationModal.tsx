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
import { View, Modal, TouchableOpacity } from 'react-native';
import { useAppDesignTokens } from '../hooks/useAppDesignTokens';
// @ts-ignore - Optional peer dependency
import { useLocalization } from '@umituz/react-native-localization';
import { AtomicText } from '../atoms/AtomicText';
import { AtomicButton } from '../atoms/AtomicButton';
import { AtomicIcon } from '../atoms/AtomicIcon';
import {
  AtomicConfirmationModalProps,
  ConfirmationModalVariant,
} from './confirmation-modal/types';
import {
  getVariantConfig,
  getModalOverlayStyle,
  getBackdropStyle,
  getModalContainerStyle,
  getIconContainerStyle,
  getTitleContainerStyle,
  getMessageContainerStyle,
  getButtonContainerStyle,
  getButtonStyle,
} from './confirmation-modal/styles/confirmationModalStyles';

export type { AtomicConfirmationModalProps };
export type { ConfirmationModalVariant };

export const AtomicConfirmationModal: React.FC<AtomicConfirmationModalProps> = ({
  visible,
  title,
  message,
  variant = 'default',
  confirmText,
  cancelText,
  icon,
  onConfirm,
  onCancel,
  showBackdrop = true,
  backdropDismissible = true,
  style,
  testID = 'atomic-confirmation-modal',
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  // Get variant-specific configuration (icon and color only)
  const variantConfig = getVariantConfig(variant as 'default' | 'destructive' | 'warning' | 'success', tokens);

  // Get locale-aware default text based on variant
  const getDefaultConfirmText = (): string => {
    switch (variant) {
      case 'destructive':
        return t('general.delete');
      case 'warning':
        return t('general.continue');
      case 'success':
      case 'default':
      default:
        return t('general.confirm');
    }
  };

  // Determine final text values
  const finalConfirmText = confirmText || getDefaultConfirmText();
  const finalCancelText = cancelText || t('general.cancel');

  // Determine final icon
  const finalIcon = icon || variantConfig.icon;

  // Handle backdrop press
  const handleBackdropPress = () => {
    if (backdropDismissible) {
      onCancel();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent
      testID={testID}
    >
      <View style={getModalOverlayStyle(tokens)}>
        {/* Backdrop - Tap to dismiss if enabled */}
        {showBackdrop && (
          <TouchableOpacity
            style={getBackdropStyle()}
            activeOpacity={1}
            onPress={handleBackdropPress}
            testID={`${testID}-backdrop`}
          />
        )}

        {/* Modal Container */}
        <View style={[getModalContainerStyle(tokens), style]}>
          {/* Icon */}
          <View style={getIconContainerStyle(tokens)}>
            <AtomicIcon
              name={finalIcon}
              size="xl"
              color={variantConfig.iconColor}
              testID={`${testID}-icon`}
            />
          </View>

          {/* Title */}
          <View style={getTitleContainerStyle(tokens)}>
            <AtomicText
              type="titleLarge"
              style={{
                color: tokens.colors.textPrimary,
                textAlign: 'center',
                fontWeight: tokens.typography.bold,
              }}
              testID={`${testID}-title`}
            >
              {title}
            </AtomicText>
          </View>

          {/* Message */}
          <View style={getMessageContainerStyle(tokens)}>
            <AtomicText
              type="bodyMedium"
              style={{
                color: tokens.colors.textSecondary,
                textAlign: 'center',
                lineHeight: tokens.typography.bodyMedium.lineHeight,
              }}
              testID={`${testID}-message`}
            >
              {message}
            </AtomicText>
          </View>

          {/* Action Buttons */}
          <View style={getButtonContainerStyle(tokens)}>
            {/* Cancel Button */}
            <AtomicButton
              variant="outline"
              size="md"
              onPress={onCancel}
              style={getButtonStyle()}
              testID={`${testID}-cancel-button`}
            >
              {finalCancelText}
            </AtomicButton>

            {/* Confirm Button */}
            <AtomicButton
              variant={variant === 'destructive' ? 'primary' : 'primary'}
              size="md"
              onPress={onConfirm}
              style={[
                getButtonStyle(),
                ...(variant === 'destructive' ? [{ backgroundColor: tokens.colors.error }] : []),
                ...(variant === 'warning' ? [{ backgroundColor: tokens.colors.warning }] : []),
                ...(variant === 'success' ? [{ backgroundColor: tokens.colors.success }] : []),
              ]}
              testID={`${testID}-confirm-button`}
            >
              {finalConfirmText}
            </AtomicButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
export const useConfirmationModal = (config: {
  title: string;
  message: string;
  variant?: ConfirmationModalVariant;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
}) => {
  const [visible, setVisible] = React.useState(false);

  const showConfirmation = () => setVisible(true);
  const hideConfirmation = () => setVisible(false);

  const handleConfirm = () => {
    config.onConfirm();
    hideConfirmation();
  };

  const confirmationProps: AtomicConfirmationModalProps = {
    visible,
    title: config.title,
    message: config.message,
    variant: config.variant || 'default',
    confirmText: config.confirmText,
    cancelText: config.cancelText,
    onConfirm: handleConfirm,
    onCancel: hideConfirmation,
  };

  return {
    showConfirmation,
    hideConfirmation,
    confirmationProps,
  };
};
