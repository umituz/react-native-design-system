/**
 * Empty State Component
 * Displays when no data is available
 *
 * Presentation Layer - UI Component
 */

import React, { useMemo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AtomicIcon, AtomicText } from "../../../atoms";
import { useAppDesignTokens } from "../../../theme";

export interface ExceptionEmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  illustration?: React.ReactNode;
}

export const ExceptionEmptyState: React.FC<ExceptionEmptyStateProps> = ({
  icon = "inbox",
  title,
  description,
  actionLabel,
  onAction,
  illustration,
}) => {
  const tokens = useAppDesignTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        actionButton: {
          borderRadius: tokens.borders.radius.md,
          marginTop: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.lg,
          paddingVertical: tokens.spacing.md,
        },
        actionButtonText: {
          // AtomicText handles typography
        },
        container: {
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
          padding: tokens.spacing.xl,
        },
        description: {
          marginBottom: tokens.spacing.lg,
          maxWidth: 280,
        },
        iconContainer: {
          alignItems: "center",
          borderRadius: 60,
          height: 120,
          justifyContent: "center",
          marginBottom: tokens.spacing.lg,
          width: 120,
        },
        title: {
          marginBottom: tokens.spacing.sm,
        },
      }),
    [tokens],
  );

  return (
    <View style={styles.container}>
      {illustration ? (
        illustration
      ) : (
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: tokens.colors.surface },
          ]}
        >
          <AtomicIcon name={icon} size="xxl" color="secondary" />
        </View>
      )}

      <AtomicText
        type="headlineSmall"
        color="primary"
        style={[styles.title, { textAlign: "center" }]}
      >
        {title}
      </AtomicText>

      {description && (
        <AtomicText
          type="bodyMedium"
          color="secondary"
          style={[styles.description, { textAlign: "center" }]}
        >
          {description}
        </AtomicText>
      )}

      {actionLabel && onAction && (
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: tokens.colors.primary },
          ]}
          onPress={onAction}
          activeOpacity={0.8}
        >
          <AtomicText
            type="labelLarge"
            color="onPrimary"
            style={styles.actionButtonText}
          >
            {actionLabel}
          </AtomicText>
        </TouchableOpacity>
      )}
    </View>
  );
};

