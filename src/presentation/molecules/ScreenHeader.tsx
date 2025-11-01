/**
 * ScreenHeader Component - {{APP_NAME}}
 *
 * Reusable screen header with consistent back button placement
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Features:
 * - Top-left back button (arrow-back icon)
 * - Centered title text
 * - Optional right action button
 * - Consistent spacing and layout
 * - Works with all 100+ generated apps
 *
 * CRITICAL: Back button MUST ALWAYS be top-left (never bottom, never center)
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AtomicIcon } from '../atoms/AtomicIcon';
import { AtomicText } from '../atoms/AtomicText';
import { useAppDesignTokens } from '../hooks/useAppDesignTokens';

export interface ScreenHeaderProps {
  /** Screen title (centered) */
  title: string;

  /** Optional right action button */
  rightAction?: React.ReactNode;

  /** Custom back button action (default: navigation.goBack()) */
  onBackPress?: () => void;

  /** Hide back button (rare cases only) */
  hideBackButton?: boolean;

  /** Additional header style */
  style?: ViewStyle;

  /** Test ID for E2E testing */
  testID?: string;
}

/**
 * ScreenHeader Component
 *
 * @example
 * // Basic usage (most common)
 * <ScreenHeader title="Settings" />
 *
 * @example
 * // With right action
 * <ScreenHeader
 *   title="Edit Profile"
 *   rightAction={<TouchableOpacity onPress={handleSave}><Text>Save</Text></TouchableOpacity>}
 * />
 *
 * @example
 * // Custom back action
 * <ScreenHeader
 *   title="Unsaved Changes"
 *   onBackPress={handleUnsavedChanges}
 * />
 */
export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  rightAction,
  onBackPress,
  hideBackButton = false,
  style,
  testID = 'screen-header',
}) => {
  const navigation = useNavigation();
  const tokens = useAppDesignTokens();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: tokens.spacing.screenPadding,
          paddingVertical: tokens.spacing.md,
          borderBottomWidth: 0.5,
          backgroundColor: tokens.colors.backgroundPrimary,
          borderBottomColor: tokens.colors.border,
        },
        style
      ]}
      testID={testID}
    >
      {/* Left: Back Button (ALWAYS top-left when visible) */}
      <View style={{ width: 40, alignItems: 'flex-start' }}>
        {!hideBackButton && (
          <TouchableOpacity
            onPress={handleBackPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            testID={`${testID}-back-button`}
          >
            <AtomicIcon name="arrow-back" color="primary" />
          </TouchableOpacity>
        )}
      </View>

      {/* Center: Title */}
      <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: tokens.spacing.sm }}>
        <AtomicText
          type="headlineMedium"
          style={[
            {
              fontWeight: tokens.typography.bold,
              textAlign: 'center',
              color: tokens.colors.textPrimary,
            }
          ]}
          numberOfLines={1}
          testID={`${testID}-title`}
        >
          {title}
        </AtomicText>
      </View>

      {/* Right: Optional Action or Placeholder */}
      <View style={{ width: 40, alignItems: 'flex-start' }}>
        {rightAction || <View style={{ width: 40 }} />}
      </View>
    </View>
  );
};

export default ScreenHeader;
