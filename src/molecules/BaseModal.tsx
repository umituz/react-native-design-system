/**
 * BaseModal Component
 * Generic fullscreen modal with responsive design
 * Used across all modals in the app for consistency
 */

import React, { useEffect } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, ViewStyle, Text } from 'react-native';
import { useAppDesignTokens } from '../theme';
import { useResponsive } from '../responsive';

declare const __DEV__: boolean;

export interface BaseModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dismissOnBackdrop?: boolean;
  contentStyle?: ViewStyle;
  testID?: string;
  title?: string;
  subtitle?: string;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  visible,
  onClose,
  children,
  dismissOnBackdrop = true,
  contentStyle,
  testID = 'base-modal',
  title,
  subtitle,
}) => {
  const tokens = useAppDesignTokens();
  const { modalLayout } = useResponsive();

  // Debug logging for modal visibility
  useEffect(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[BaseModal] Visibility changed:", {
        visible,
        testID,
        modalWidth: modalLayout.width,
        modalHeight: modalLayout.height,
      });
    }
  }, [visible, testID, modalLayout.width, modalLayout.height]);

  const handleBackdropPress = React.useCallback(() => {
    if (dismissOnBackdrop) {
      onClose();
    }
  }, [dismissOnBackdrop, onClose]);

  if (!visible) return null;

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[BaseModal] Rendering modal content:", { testID });
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
      testID={testID}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={[
            styles.backdrop,
            { backgroundColor: `rgba(0, 0, 0, ${modalLayout.backdropOpacity})` }
          ]}
          activeOpacity={1}
          onPress={handleBackdropPress}
          testID={`${testID}-backdrop`}
        />

        <View
          style={[
            styles.content,
            {
              width: modalLayout.width,
              height: modalLayout.height,
              borderRadius: modalLayout.borderRadius,
              backgroundColor: tokens.colors.backgroundPrimary,
              borderColor: tokens.colors.border,
            },
            contentStyle,
          ]}
          testID={`${testID}-content`}
        >
          {(title || subtitle) && (
            <View style={{ 
              paddingTop: tokens.spacing.lg,
              paddingHorizontal: tokens.spacing.md,
              paddingBottom: tokens.spacing.md,
            }}>
              {title && (
                <Text style={{ 
                  fontSize: 20, 
                  fontWeight: '700', 
                  color: tokens.colors.textPrimary, 
                  textAlign: 'center',
                  marginBottom: subtitle ? tokens.spacing.xs : 0,
                }}>
                  {title}
                </Text>
              )}
              {subtitle && (
                <Text style={{ 
                  fontSize: 15, 
                  color: tokens.colors.textSecondary, 
                  textAlign: 'center', 
                  lineHeight: 20,
                }}>
                  {subtitle}
                </Text>
              )}
            </View>
          )}
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    overflow: 'hidden',
    borderWidth: 1,
  },
});
