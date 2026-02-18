/**
 * Avatar Domain - AvatarGroup Component
 *
 * Displays multiple avatars in a stacked layout.
 * Shows overflow count when exceeding max visible avatars.
 */

import React from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useAppDesignTokens } from '../../theme';
import { AtomicText } from '../../atoms';
import { Avatar } from './Avatar';
import type { AvatarSize, AvatarShape } from './Avatar.types';
import { SIZE_CONFIGS, AVATAR_CONSTANTS } from './Avatar.constants';

/**
 * Avatar item for group
 */
export interface AvatarGroupItem {
  uri?: string;
  name?: string;
  icon?: string;
}

/**
 * AvatarGroup component props
 */
export interface AvatarGroupProps {
  /** Array of avatar items */
  items: AvatarGroupItem[];
  /** Maximum visible avatars */
  maxVisible?: number;
  /** Avatar size */
  size?: AvatarSize;
  /** Avatar shape */
  shape?: AvatarShape;
  /** Spacing between avatars (negative for overlap) */
  spacing?: number;
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  items,
  maxVisible = AVATAR_CONSTANTS.MAX_GROUP_VISIBLE,
  size = AVATAR_CONSTANTS.DEFAULT_SIZE,
  shape = AVATAR_CONSTANTS.DEFAULT_SHAPE,
  spacing = AVATAR_CONSTANTS.GROUP_SPACING,
  style,
}) => {
  const tokens = useAppDesignTokens();
  const config = SIZE_CONFIGS[size];

  // Calculate visible avatars and overflow count
  const visibleItems = items.slice(0, maxVisible);
  const overflowCount = items.length - maxVisible;
  const hasOverflow = overflowCount > 0;

  return (
    <View style={[styles.container, style]}>
      {visibleItems.map((item, index) => (
        <View
          key={item.uri || item.name || item.icon}
          style={[
            styles.avatarWrapper,
            index > 0 && { marginLeft: spacing },
          ]}
        >
          <Avatar
            uri={item.uri}
            name={item.name}
            icon={item.icon}
            size={size}
            shape={shape}
            style={[
              styles.avatar,
              {
                borderWidth: 2,
                borderColor: tokens.colors.onBackground,
              },
            ]}
          />
        </View>
      ))}

      {hasOverflow && (
        <View
          style={[
            styles.avatarWrapper,
            { marginLeft: spacing },
          ]}
        >
          <View
            style={[
              styles.overflow,
              {
                width: config.size,
                height: config.size,
                borderRadius: shape === 'circle' ? config.size / 2 : shape === 'rounded' ? 8 : 0,
                backgroundColor: tokens.colors.surfaceSecondary,
                borderWidth: 2,
                borderColor: tokens.colors.onBackground,
              },
            ]}
          >
            <AtomicText
              type="bodySmall"
              style={[
                styles.overflowText,
                {
                  fontSize: config.fontSize,
                  color: tokens.colors.textSecondary,
                },
              ]}
            >
              +{overflowCount}
            </AtomicText>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {},
  avatar: {},
  overflow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overflowText: {
    fontWeight: '600',
  },
});

