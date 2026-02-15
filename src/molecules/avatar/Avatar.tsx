/**
 * Avatar Domain - Avatar Component
 *
 * Universal avatar component with image, initials, and icon support.
 * Handles loading states, fallbacks, and status indicators.
 */

import React, { useMemo } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, type StyleProp, type ViewStyle, type ImageStyle } from 'react-native';
import { useAppDesignTokens } from '../../theme';
import { AtomicText, AtomicIcon } from '../../atoms';
import type { AvatarSize, AvatarShape } from './Avatar.types';
import { SIZE_CONFIGS, AVATAR_CONSTANTS } from './Avatar.constants';
import { AvatarUtils } from './Avatar.utils';

/**
 * Avatar component props
 */
export interface AvatarProps {
  /** Image URI */
  uri?: string;
  /** User name for initials */
  name?: string;
  /** Icon name (fallback when no image/name) */
  icon?: string;
  /** Size preset */
  size?: AvatarSize;
  /** Shape */
  shape?: AvatarShape;
  /** Custom background color */
  backgroundColor?: string;
  /** Show status indicator */
  showStatus?: boolean;
  /** Status (online/offline/away/busy) */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
  /** Custom image style */
  imageStyle?: StyleProp<ImageStyle>;
  /** OnPress handler */
  onPress?: () => void;
}

/**
 * Avatar Component
 * Displays user avatars with automatic fallback hierarchy:
 * 1. Image (if uri provided)
 * 2. Initials (if name provided)
 * 3. Icon (fallback)
 */
export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  icon = AVATAR_CONSTANTS.DEFAULT_ICON,
  size = AVATAR_CONSTANTS.DEFAULT_SIZE,
  shape = AVATAR_CONSTANTS.DEFAULT_SHAPE,
  backgroundColor,
  showStatus = false,
  status = 'offline',
  style,
  imageStyle,
  onPress,
}) => {
  const tokens = useAppDesignTokens();
  const config = useMemo(() => SIZE_CONFIGS[size], [size]);

  // Determine avatar type and content
  const hasImage = !!uri;
  const hasName = !!name;
  const initials = useMemo(
    () => (hasName ? AvatarUtils.generateInitials(name) : AVATAR_CONSTANTS.FALLBACK_INITIALS),
    [hasName, name]
  );
  const bgColor = useMemo(
    () => backgroundColor || (hasName ? AvatarUtils.getColorForName(name) : tokens.colors.surfaceSecondary),
    [backgroundColor, hasName, name, tokens.colors.surfaceSecondary]
  );
  const borderRadius = useMemo(
    () => AvatarUtils.getBorderRadius(shape, config.size),
    [shape, config.size]
  );

  // Status indicator position
  const statusPosition = useMemo(() => ({
    bottom: 0,
    right: 0,
  }), []);

  const renderContent = () => {
    if (hasImage) {
      return (
        <Image
          source={{ uri }}
          style={[
            styles.image,
            {
              width: config.size,
              height: config.size,
              borderRadius,
            },
            imageStyle,
          ]}
        />
      );
    }

    if (hasName) {
      return (
        <AtomicText
          type="bodyMedium"
          style={[
            styles.initials,
            {
              fontSize: config.fontSize,
              color: tokens.colors.textInverse,
            },
          ]}
        >
          {initials}
        </AtomicText>
      );
    }

    // Fallback to icon
    return (
      <AtomicIcon
        name={icon}
        customSize={config.iconSize}
        customColor={tokens.colors.textInverse}
      />
    );
  };

  const AvatarWrapper = onPress ? TouchableOpacity : View;

  return (
    <AvatarWrapper
      style={[
        styles.container,
        {
          width: config.size,
          height: config.size,
          borderRadius,
          backgroundColor: bgColor,
        },
        style,
      ]}
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : 'image'}
      accessibilityLabel={name || 'User avatar'}
      accessible={true}
    >
      {renderContent()}

      {/* Status Indicator */}
      {showStatus && (
        <View
          style={[
            styles.statusIndicator,
            {
              width: config.statusSize,
              height: config.statusSize,
              borderRadius: config.statusSize / 2,
              backgroundColor: AvatarUtils.getStatusColor(status),
              borderWidth: config.borderWidth,
              borderColor: tokens.colors.onBackground,
              ...statusPosition,
            },
          ]}
          accessibilityLabel={`Status: ${status}`}
          accessibilityRole="none"
        />
      )}
    </AvatarWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    fontWeight: '600',
    textAlign: 'center',
  },
  statusIndicator: {
    position: 'absolute',
  },
});

