import React, { forwardRef, useCallback, useMemo, useImperativeHandle, useRef } from 'react';
import { StyleSheet } from 'react-native';
import GorhomBottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useAppDesignTokens } from '@theme';
import type {
  BottomSheetConfig,
  BottomSheetRef,
  BottomSheetProps,
} from '../types/BottomSheet';
import { BottomSheetUtils } from '../types/BottomSheet';

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>((props, ref) => {
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
    onClose,
  } = props;

  const tokens = useAppDesignTokens();
  const sheetRef = useRef<GorhomBottomSheet>(null);

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
      if (index === -1) onClose?.();
    },
    [onChange, onClose]
  );

  useImperativeHandle(ref, () => ({
    snapToIndex: (index: number) => sheetRef.current?.snapToIndex(index),
    snapToPosition: (pos: string | number) => sheetRef.current?.snapToPosition(pos),
    expand: () => sheetRef.current?.expand(),
    collapse: () => sheetRef.current?.collapse(),
    close: () => sheetRef.current?.close(),
  }));

  if (!config.snapPoints || config.snapPoints.length === 0) return null;

  return (
    <GorhomBottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={config.snapPoints}
      enableDynamicSizing={config.enableDynamicSizing}
      backdropComponent={renderBackdrop}
      keyboardBehavior={config.keyboardBehavior}
      enableHandlePanningGesture={config.enableHandleIndicator}
      enablePanDownToClose={config.enablePanDownToClose}
      onChange={handleSheetChange}
      backgroundStyle={[styles.background, { backgroundColor: tokens.colors.surface }]}
      handleIndicatorStyle={[styles.handleIndicator, { backgroundColor: tokens.colors.border }]}
    >
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
});

BottomSheet.displayName = 'BottomSheet';

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

