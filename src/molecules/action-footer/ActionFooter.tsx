
import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AtomicText } from '../../atoms/AtomicText';
import { AtomicIcon } from '../../atoms';
import { useAppDesignTokens } from '../../theme';
import type { ActionFooterProps } from './types';

export const ActionFooter: React.FC<ActionFooterProps> = ({
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
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: tokens.spacing.md,
          gap: tokens.spacing.md,
        },
        backButton: {
          width: 56,
          height: 56,
          borderRadius: tokens.borders.radius.lg,
          backgroundColor: tokens.colors.surface,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: tokens.colors.outlineVariant,
        },
        actionButton: {
          flex: 1,
          height: 56,
          borderRadius: tokens.borders.radius.lg,
          overflow: 'hidden',
        },
        actionContent: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: tokens.colors.primary,
          gap: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.lg,
        },
        actionText: {
          color: tokens.colors.onPrimary,
          fontWeight: '800',
          fontSize: 18,
        },
      }),
    [tokens],
  );

  return (
    <View style={[themedStyles.container, style]}>
      <TouchableOpacity
        style={themedStyles.backButton}
        onPress={onBack}
        activeOpacity={0.7}
        testID="action-footer-back"
      >
        <AtomicIcon
          name={backIcon}
          size="md"
          color="textPrimary"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={themedStyles.actionButton}
        onPress={onAction}
        activeOpacity={0.9}
        disabled={loading}
        testID="action-footer-action"
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
};
