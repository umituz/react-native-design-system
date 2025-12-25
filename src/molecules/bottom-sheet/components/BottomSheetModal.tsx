declare const __DEV__: boolean;

import React, { forwardRef, useCallback, useMemo, useImperativeHandle, useRef } from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomSheetModal as GorhomBottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useAppDesignTokens } from '../../../theme';
import type {
  BottomSheetConfig,
  BottomSheetModalRef,
  BottomSheetModalProps,
} from '../types/BottomSheet';
import { BottomSheetUtils } from '../types/BottomSheet';

export const BottomSheetModal = forwardRef<BottomSheetModalRef, BottomSheetModalProps>((props, ref) => {
  const {
    children,
    preset = 'medium',
    snapPoints: customSnapPoints,
    initialIndex,
    enableBackdrop = true,
    backdropAppearsOnIndex,
    backdropDisappearsOnIndex,
    keyboardBehavior = 'interactive',
    enableHandleIndicator = true,
    enablePanDownToClose = true,
    enableDynamicSizing = false,
    onChange,
    onDismiss,
    backgroundColor,
  } = props;

  const tokens = useAppDesignTokens();
  const modalRef = useRef<GorhomBottomSheetModal>(null);

  const config: BottomSheetConfig = useMemo(() => {
    if (customSnapPoints) {
      return BottomSheetUtils.createConfig({
        snapPoints: customSnapPoints,
        initialIndex,
        enableBackdrop,
        backdropAppearsOnIndex,
        backdropDisappearsOnIndex,
        keyboardBehavior,
        enableHandleIndicator,
        enablePanDownToClose,
        enableDynamicSizing,
      });
    }
    return BottomSheetUtils.getPreset(preset);
  }, [preset, customSnapPoints, initialIndex, enableBackdrop, backdropAppearsOnIndex, backdropDisappearsOnIndex, keyboardBehavior, enableHandleIndicator, enablePanDownToClose, enableDynamicSizing]);

  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) =>
      enableBackdrop ? (
        <BottomSheetBackdrop
          {...backdropProps}
          appearsOnIndex={config.backdropAppearsOnIndex ?? 0}
          disappearsOnIndex={config.backdropDisappearsOnIndex ?? -1}
          opacity={0.5}
          pressBehavior="close"
        />
      ) : null,
    [enableBackdrop, config.backdropAppearsOnIndex, config.backdropDisappearsOnIndex]
  );

  const handleSheetChange = useCallback(
    (index: number) => {
      onChange?.(index);
      if (index === -1) onDismiss?.();
    },
    [onChange, onDismiss]
  );

  useImperativeHandle(ref, () => ({
    present: () => {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('[BottomSheetModal] present() called');
        // eslint-disable-next-line no-console
        console.log('[BottomSheetModal] modalRef.current:', modalRef.current);
      }
      modalRef.current?.present();
    },
    dismiss: () => modalRef.current?.dismiss(),
    snapToIndex: (index: number) => modalRef.current?.snapToIndex(index),
    snapToPosition: (pos: string | number) => modalRef.current?.snapToPosition(pos),
    expand: () => modalRef.current?.expand(),
    collapse: () => modalRef.current?.collapse(),
  }));

  return (
    <GorhomBottomSheetModal
      ref={modalRef}
      index={-1}
      snapPoints={config.snapPoints}
      enableDynamicSizing={config.enableDynamicSizing}
      backdropComponent={renderBackdrop}
      keyboardBehavior={config.keyboardBehavior}
      enableHandlePanningGesture={config.enableHandleIndicator}
      enablePanDownToClose={config.enablePanDownToClose}
      onChange={handleSheetChange}
      onDismiss={onDismiss}
      backgroundStyle={[styles.background, { backgroundColor: backgroundColor || tokens.colors.surface }]}
      handleIndicatorStyle={[styles.handleIndicator, { backgroundColor: tokens.colors.border }]}
    >
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </GorhomBottomSheetModal>
  );
});

BottomSheetModal.displayName = 'BottomSheetModal';

const styles = StyleSheet.create({
  background: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  handleIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  contentContainer: {
    flex: 1,
  },
});

