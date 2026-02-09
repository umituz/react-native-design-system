/**
 * Error State Component
 * Generic error display with retry action
 *
 * Presentation Layer - UI Component
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicIcon,
  AtomicText,
  useIconName,
} from "../../../atoms";
import {
  useAppDesignTokens,
} from "../../../theme";

export interface ExceptionErrorStateProps {
  /** Icon name (interpreted by app's icon renderer) */
  icon?: string;
  /** Error title */
  title: string;
  /** Error description */
  description?: string;
  /** Retry button label */
  actionLabel?: string;
  /** Retry action callback */
  onAction?: () => void;
  /** Custom illustration instead of icon */
  illustration?: React.ReactNode;
}

export const ExceptionErrorState: React.FC<ExceptionErrorStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  illustration,
}) => {
  const tokens = useAppDesignTokens();
  const alertCircleIcon = useIconName('alertCircle');
  const refreshIcon = useIconName('refresh');
  const displayIcon = icon || alertCircleIcon;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        actionButton: {
          alignItems: "center",
          borderRadius: tokens.borders.radius.full,
          flexDirection: "row",
          gap: tokens.spacing.sm,
          marginTop: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.lg,
          paddingVertical: tokens.spacing.md,
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
          textAlign: "center",
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
          textAlign: "center",
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
          style={[styles.iconContainer, { backgroundColor: tokens.colors.surface }]}
        >
          <AtomicIcon name={displayIcon as never} size="xxl" color="secondary" />
        </View>
      )}

      <AtomicText type="headlineSmall" color="primary" style={styles.title}>
        {title}
      </AtomicText>

      {description && (
        <AtomicText type="bodyMedium" color="secondary" style={styles.description}>
          {description}
        </AtomicText>
      )}

      {actionLabel && onAction && (
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: tokens.colors.primary }]}
          onPress={onAction}
          activeOpacity={0.8}
        >
          <AtomicIcon name={refreshIcon} size="sm" color="onPrimary" />
          <AtomicText type="labelLarge" color="onPrimary">
            {actionLabel}
          </AtomicText>
        </TouchableOpacity>
      )}
    </View>
  );
};
