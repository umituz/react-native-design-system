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
      if (__DEV__) {
        console.log('[BottomSheetModal] onChange triggered', { index });
      }
      onChange?.(index);
      if (index === -1) onDismiss?.();
    },
    [onChange, onDismiss]
  );

  useImperativeHandle(ref, () => ({
    present: () => {
      if (__DEV__) {
        console.log('[BottomSheetModal] present() called', {
          refExists: !!modalRef.current,
          hasPresentMethod: typeof modalRef.current?.present === 'function',
          refType: typeof modalRef.current,
          refKeys: modalRef.current ? Object.keys(modalRef.current) : []
        });
      }
      
      try {
        if (!modalRef.current) {
          if (__DEV__) console.error('[BottomSheetModal] modalRef.current is null!');
          return;
        }
        
        if (typeof modalRef.current.present !== 'function') {
          if (__DEV__) console.error('[BottomSheetModal] present is not a function!', typeof modalRef.current.present);
          return;
        }
        
        if (__DEV__) console.log('[BottomSheetModal] Calling modalRef.current.present()...');
        modalRef.current.present();
        if (__DEV__) console.log('[BottomSheetModal] modalRef.current.present() executed');
      } catch (error) {
        if (__DEV__) console.error('[BottomSheetModal] Error calling present():', error);
      }
    },
    dismiss: () => {
      if (__DEV__) console.log('[BottomSheetModal] dismiss() called');
      modalRef.current?.dismiss();
    },
    snapToIndex: (index: number) => {
      if (__DEV__) console.log('[BottomSheetModal] snapToIndex called', { index });
      modalRef.current?.snapToIndex(index);
    },
    snapToPosition: (pos: string | number) => modalRef.current?.snapToPosition(pos),
    expand: () => modalRef.current?.expand(),
    collapse: () => modalRef.current?.collapse(),
  }));

  React.useEffect(() => {
    if (__DEV__) {
      console.log('[BottomSheetModal] Component mounted', {
        hasModalRef: !!modalRef.current,
        snapPoints: config.snapPoints,
        preset
      });
    }
  }, []);

  React.useEffect(() => {
    if (__DEV__) {
      console.log('[BottomSheetModal] modalRef updated', {
        hasModalRef: !!modalRef.current,
      });
    }
  }, [modalRef.current]);

  return (
    <GorhomBottomSheetModal
      ref={modalRef}
      index={-1}
      snapPoints={config.snapPoints}
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}
      keyboardBehavior={config.keyboardBehavior}
      enableHandlePanningGesture={config.enableHandleIndicator}
      enablePanDownToClose={config.enablePanDownToClose ?? true}
      onChange={handleSheetChange}
      onDismiss={onDismiss}
      onAnimate={(fromIndex, toIndex) => {
        if (__DEV__) {
          console.log('[BottomSheetModal] onAnimate', { fromIndex, toIndex });
        }
      }}
      backgroundStyle={[styles.background, { backgroundColor: backgroundColor || tokens.colors.surface }]}
      handleIndicatorStyle={[styles.handleIndicator, { backgroundColor: tokens.colors.border }]}
      enableOverDrag={false}
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

