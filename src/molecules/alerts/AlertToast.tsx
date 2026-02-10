/**
 * AlertToast Component
 *
 * Displays a toast-style alert.
 * Floats on top of content.
 */

import React, { useEffect, useCallback } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { AtomicText, AtomicIcon, useIconName } from '../../atoms';
import { useAppDesignTokens } from '../../theme';
import { Alert } from './AlertTypes';
import { useAlertStore } from './AlertStore';
import {
    getAlertBackgroundColor,
    getAlertTextColor,
    getActionButtonStyle,
    getActionTextColor,
    DEFAULT_ALERT_DURATION,
} from './utils/alertUtils';

interface AlertToastProps {
  alert: Alert;
}

export function AlertToast({ alert }: AlertToastProps) {
  const dismissAlert = useAlertStore((state: { dismissAlert: (id: string) => void }) => state.dismissAlert);
  const tokens = useAppDesignTokens();
  const closeIcon = useIconName('close');

  const dismiss = useCallback(() => {
    dismissAlert(alert.id);
    alert.onDismiss?.();
  }, [alert.id, dismissAlert, alert.onDismiss]);

  const handleDismiss = useCallback(() => {
    if (alert.dismissible) {
      dismiss();
    }
  }, [alert.dismissible, dismiss]);

  // Auto-dismiss after duration
  useEffect(() => {
    const duration = alert.duration ?? DEFAULT_ALERT_DURATION;
    if (duration <= 0) return;

    const timer = setTimeout(dismiss, duration);
    return () => clearTimeout(timer);
  }, [alert.duration, dismiss]);

  const backgroundColor = getAlertBackgroundColor(alert.type, tokens);
  const textColor = getAlertTextColor(tokens);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          padding: tokens.spacing.md,
          borderRadius: tokens.borders.radius.md,
        },
      ]}
      testID={alert.testID}
    >
      <Pressable onPress={handleDismiss} style={styles.content}>
        <View style={styles.row}>
          {alert.icon && (
            <AtomicIcon
              name={alert.icon}
              customSize={20}
              customColor={textColor}
              style={{ marginRight: tokens.spacing.sm }}
            />
          )}

          <View style={styles.textContainer}>
            <AtomicText
              type="bodyMedium"
              style={[styles.title, { color: textColor }]}
              numberOfLines={2}
            >
              {alert.title}
            </AtomicText>

            {alert.message && (
              <AtomicText
                type="bodySmall"
                style={[
                  styles.message,
                  { color: textColor, marginTop: tokens.spacing.xs },
                ]}
                numberOfLines={3}
              >
                {alert.message}
              </AtomicText>
            )}
          </View>

          {alert.dismissible && (
            <Pressable
              onPress={handleDismiss}
              style={[styles.closeButton, { marginLeft: tokens.spacing.sm }]}
              hitSlop={8}
            >
              <AtomicIcon name={closeIcon} customSize={20} customColor={textColor} />
            </Pressable>
          )}
        </View>

        {alert.actions && alert.actions.length > 0 && (
          <View style={[styles.actionsContainer, { marginTop: tokens.spacing.sm }]}>
            {alert.actions.map((action) => (
              <Pressable
                key={action.id}
                onPress={async () => {
                  await action.onPress();
                  if (action.closeOnPress ?? true) {
                    dismiss();
                  }
                }}
                style={[
                  styles.actionButton,
                  {
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                    marginRight: tokens.spacing.xs,
                    borderRadius: tokens.borders.radius.sm,
                  },
                  getActionButtonStyle(action.style, tokens),
                ]}
              >
                <AtomicText
                  type="bodySmall"
                  style={[
                    styles.actionText,
                    { color: getActionTextColor(action.style, tokens) },
                  ]}
                >
                  {action.label}
                </AtomicText>
              </Pressable>
            ))}
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
  },
  message: {
    opacity: 0.9,
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontWeight: '700',
  },
});
