/**
 * EmptyState - Universal Empty State Component
 *
 * Displays when no data is available
 *
 * Atomic Design Level: ATOM
 * Purpose: Empty state indication across all apps
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { AtomicIcon } from './icon';
import { AtomicText } from './AtomicText';
import { useAppDesignTokens } from '../theme';

export interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  illustration?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'file-tray-outline',
  title,
  subtitle,
  description,
  actionLabel,
  onAction,
  illustration,
  style,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const displayDescription = description || subtitle;

  const themedStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          padding: tokens.spacing.xl,
        },
        iconContainer: {
          width: 120,
          height: 120,
          borderRadius: 60,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          marginBottom: tokens.spacing.lg,
        },
        title: {
          marginBottom: tokens.spacing.sm,
        },
        description: {
          marginBottom: tokens.spacing.lg,
        },
        actionButton: {
          paddingHorizontal: tokens.spacing.lg,
          paddingVertical: tokens.spacing.md,
          borderRadius: tokens.borders.radius.md,
          marginTop: tokens.spacing.sm,
        },
      }),
    [tokens],
  );

  return (
    <View style={[themedStyles.container, style]} testID={testID}>
      {illustration ? (
        illustration
      ) : (
        <View
          style={[
            themedStyles.iconContainer,
            { backgroundColor: tokens.colors.surface },
          ]}
        >
          <AtomicIcon name={icon} size="xxl" color="secondary" />
        </View>
      )}

      <AtomicText
        type="headlineSmall"
        color="primary"
        style={[themedStyles.title, { textAlign: 'left' }]}
      >
        {title}
      </AtomicText>

      {displayDescription && (
        <AtomicText
          type="bodyMedium"
          color="secondary"
          style={[themedStyles.description, { textAlign: 'left' }]}
        >
          {displayDescription}
        </AtomicText>
      )}

      {actionLabel && onAction && (
        <TouchableOpacity
          style={[
            themedStyles.actionButton,
            { backgroundColor: tokens.colors.primary },
          ]}
          onPress={onAction}
          activeOpacity={0.8}
        >
          <AtomicText type="labelLarge" color="onPrimary">
            {actionLabel}
          </AtomicText>
        </TouchableOpacity>
      )}
    </View>
  );
};

