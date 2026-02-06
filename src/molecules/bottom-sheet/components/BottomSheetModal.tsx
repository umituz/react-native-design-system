import React, { forwardRef, useImperativeHandle, useState, useCallback, useEffect } from 'react';
import { Modal, View, StyleSheet, Pressable } from 'react-native';
import { useAppDesignTokens } from '../../../theme';
import { useSafeAreaInsets } from '../../../safe-area';
import { getResponsiveBottomSheetLayout } from '../../../responsive';
import type { BottomSheetModalRef, BottomSheetModalProps } from '../types/BottomSheet';


export const BottomSheetModal = forwardRef<BottomSheetModalRef, BottomSheetModalProps>(
  (props, ref) => {
    const {
      children,
      preset = 'medium',
      onDismiss,
      backgroundColor,
    } = props;

    const [visible, setVisible] = useState(false);
    const tokens = useAppDesignTokens();
    const insets = useSafeAreaInsets();
    const { maxHeight, borderRadius } = getResponsiveBottomSheetLayout();

    const PRESET_HEIGHTS = {
      small: maxHeight * 0.35,
      medium: maxHeight * 0.6,
      large: maxHeight * 0.85,
      full: maxHeight,
      custom: maxHeight * 0.6,
    };

    const sheetHeight = PRESET_HEIGHTS[preset] || PRESET_HEIGHTS.medium;

    useEffect(() => {
      if (__DEV__) {
        console.log('[BottomSheetModal] Visible state changed:', {
          visible,
          preset,
          hasChildren: !!children,
          sheetHeight,
        });
      }
    }, [visible, preset, children, sheetHeight]);

    const present = useCallback(() => {
      if (__DEV__) console.log('[BottomSheetModal] Opening');
      setVisible(true);
    }, []);

    const dismiss = useCallback(() => {
      if (__DEV__) console.log('[BottomSheetModal] Closing');
      setVisible(false);
      onDismiss?.();
    }, [onDismiss]);

    useImperativeHandle(ref, () => ({
      present,
      dismiss,
      snapToIndex: (index: number) => {
        if (index >= 0) present();
        else dismiss();
      },
      snapToPosition: () => present(),
      expand: () => present(),
      collapse: () => dismiss(),
    }));

    const styles = StyleSheet.create({
      overlay: {
        flex: 1,
        backgroundColor: tokens.colors.modalOverlay,
        justifyContent: 'flex-end',
      },
      container: {
        height: sheetHeight,
        backgroundColor: backgroundColor || tokens.colors.surface,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        paddingBottom: Math.max(insets.bottom, 8),
      },
      handle: {
        width: 40,
        height: 4,
        backgroundColor: tokens.colors.border,
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 8,
      },
      content: {
        flex: 1,
      },
    });

    return (
      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={dismiss}
        statusBarTranslucent
      >
        <View style={styles.overlay}>
          <Pressable 
            style={StyleSheet.absoluteFill} 
            onPress={dismiss}
            accessibilityLabel="Close modal"
          />
          <View style={[styles.container, { width: '100%' }]}>
            <View style={{ flex: 1 }}>
              <View style={styles.handle} />
              {children}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
);

BottomSheetModal.displayName = 'BottomSheetModal';
