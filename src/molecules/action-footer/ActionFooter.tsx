
import React, { useMemo, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AtomicText } from '../../atoms/AtomicText';
import { AtomicIcon } from '../../atoms';
import { useAppDesignTokens } from '../../theme';
import type { ActionFooterProps } from './types';

const createStyles = () => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
    gap: 0,
  },
  backButton: {
    width: 56,
    height: 56,
    borderRadius: 0,
    backgroundColor: '',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '',
  },
  actionButton: {
    flex: 1,
    height: 56,
    borderRadius: 0,
    overflow: 'hidden',
  },
  actionContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '',
    gap: 0,
    paddingHorizontal: 0,
  },
  actionText: {
    color: '',
    fontWeight: '800',
    fontSize: 18,
  },
});

const baseStyles = createStyles();

export const ActionFooter = React.memo<ActionFooterProps>(({
  onBack,
  onAction,
  actionLabel,
  actionIcon = 'arrow-forward',
  backIcon = 'chevron-back',
  style,
  loading = false,
}) => {
  const tokens = useAppDesignTokens();

  const themedStyles = useMemo(
    () => ({
      container: {
        ...baseStyles.container,
        paddingVertical: tokens.spacing.md,
        gap: tokens.spacing.md,
      },
      backButton: {
        ...baseStyles.backButton,
        borderRadius: tokens.borders.radius.lg,
        backgroundColor: tokens.colors.surface,
        borderColor: tokens.colors.outlineVariant,
      },
      actionButton: {
        ...baseStyles.actionButton,
        borderRadius: tokens.borders.radius.lg,
      },
      actionContent: {
        ...baseStyles.actionContent,
        backgroundColor: tokens.colors.primary,
        gap: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.lg,
      },
      actionText: {
        ...baseStyles.actionText,
        color: tokens.colors.onPrimary,
      },
    }),
    [tokens],
  );

  const handleBackPress = useCallback(() => {
    onBack?.();
  }, [onBack]);

  const handleActionPress = useCallback(() => {
    if (!loading) {
      onAction?.();
    }
  }, [loading, onAction]);

  return (
    <View style={[themedStyles.container, style]}>
      <TouchableOpacity
        style={themedStyles.backButton}
        onPress={handleBackPress}
        activeOpacity={0.7}
        testID="action-footer-back"
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <AtomicIcon
          name={backIcon}
          size="md"
          color="textPrimary"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={themedStyles.actionButton}
        onPress={handleActionPress}
        activeOpacity={0.9}
        disabled={loading}
        testID="action-footer-action"
        accessibilityRole="button"
        accessibilityLabel={actionLabel}
        accessibilityState={{ disabled: loading, busy: loading }}
      >
        <View style={themedStyles.actionContent}>
          <AtomicText style={themedStyles.actionText}>{actionLabel}</AtomicText>
          <AtomicIcon
            name={actionIcon}
            size="sm"
            color="onPrimary"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
});