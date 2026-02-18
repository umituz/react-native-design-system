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

export interface AvatarProps {
  uri?: string;
  name?: string;
  icon?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  backgroundColor?: string;
  showStatus?: boolean;
  status?: 'online' | 'offline' | 'away' | 'busy';
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  onPress?: () => void;
}

interface AvatarContentProps {
  hasImage: boolean;
  hasName: boolean;
  uri?: string;
  initials: string;
  icon: string;
  config: typeof SIZE_CONFIGS[AvatarSize];
  borderRadius: number;
  imageStyle?: StyleProp<ImageStyle>;
}

const AvatarContent: React.FC<AvatarContentProps> = ({
  hasImage,
  hasName,
  uri,
  initials,
  icon,
  config,
  borderRadius,
  imageStyle,
}) => {
  const tokens = useAppDesignTokens();

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

  return (
    <AtomicIcon
      name={icon}
      customSize={config.iconSize}
      customColor={tokens.colors.textInverse}
    />
  );
};

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

  const statusPosition = useMemo(() => ({
    bottom: 0,
    right: 0,
  }), []);

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
      <AvatarContent
        hasImage={hasImage}
        hasName={hasName}
        uri={uri}
        initials={initials}
        icon={icon}
        config={config}
        borderRadius={borderRadius}
        imageStyle={imageStyle}
      />

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
