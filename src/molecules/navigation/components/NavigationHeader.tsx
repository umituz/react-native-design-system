import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AtomicText } from '../../../atoms';
import { AtomicIcon } from '../../../atoms';
import { useAppDesignTokens } from '../../../theme';
import { useSafeAreaInsets } from '../../../safe-area';

export interface NavigationHeaderProps {
  title: string;
  onBackPress?: () => void;
  rightElement?: React.ReactNode;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  onBackPress,
  rightElement,
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      paddingTop: insets.top,
      paddingHorizontal: tokens.spacing.md,
      paddingBottom: tokens.spacing.sm,
      backgroundColor: tokens.colors.backgroundPrimary,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: tokens.colors.outlineVariant,
      zIndex: 100,
    },
    backButton: {
      marginRight: tokens.spacing.md,
      width: 40,
      height: 40,
      borderRadius: tokens.borders.radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: tokens.colors.surfaceVariant,
    },
    title: {
      flex: 1,
      textAlign: 'left',
    },
  });

  return (
    <View style={styles.container}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <AtomicIcon
            name="arrow-back"
            size="md"
            color="textPrimary"
          />
        </TouchableOpacity>
      )}

      <AtomicText
        type="titleMedium"
        color="textPrimary"
        numberOfLines={1}
        style={styles.title}
      >
        {title}
      </AtomicText>

      {rightElement && (
        <View>
          {rightElement}
        </View>
      )}
    </View>
  );
};
