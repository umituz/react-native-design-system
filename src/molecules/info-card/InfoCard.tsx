
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AtomicText } from '../../atoms/AtomicText';
import { useAppDesignTokens } from '../../theme';
import type { InfoCardProps } from './types';

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  content,
  style,
}) => {
  const tokens = useAppDesignTokens();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: tokens.colors.surface,
      borderRadius: tokens.borders.radius.xl,
      padding: tokens.spacing.lg,
      borderWidth: 1,
      borderColor: tokens.colors.outlineVariant,
    },
    title: {
      ...tokens.typography.labelLarge,
      color: tokens.colors.primary,
      fontWeight: '800', // Using string as expected by RN
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: tokens.spacing.xs,
    },
    content: {
      ...tokens.typography.bodyMedium,
      color: tokens.colors.textPrimary,
      lineHeight: 22,
    },
  });

  return (
    <View style={[styles.container, style]}>
      <AtomicText style={styles.title}>{title}</AtomicText>
      <AtomicText style={styles.content}>{content}</AtomicText>
    </View>
  );
};
