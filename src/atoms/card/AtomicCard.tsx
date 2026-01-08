/**
 * AtomicCard
 * 
 * Unified card component that handles base card states, media, info, and glowing effects.
 * Replaces InfoCard, MediaCard, and GlowingCard molecules.
 */

import React, { useMemo } from 'react';
import {
  View,
  Image,
  Pressable,
  type GestureResponderEvent,
} from 'react-native';
import { AtomicText } from '../AtomicText';
import { AtomicIcon } from '../AtomicIcon';
import { useAppDesignTokens } from '../../theme';
import { getCardVariantStyles, cardStyles } from './styles/cardStyles';
import { getCardPadding } from './configs/cardPaddingConfig';
import type { AtomicCardProps } from './types';

export const AtomicCard: React.FC<AtomicCardProps> = ({
  children,
  variant = 'elevated',
  padding = 'md',
  title,
  subtitle,
  description,
  image,
  imageAspectRatio = 1.6,
  badge,
  leftIcon,
  rightIcon,
  selected = false,
  glowColor,
  glowIntensity = 1,
  onPress,
  disabled = false,
  style,
  titleStyle,
  subtitleStyle,
  descriptionStyle,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  
  const variantStyles = useMemo(() => {
    const base = getCardVariantStyles(variant, tokens);
    if (variant === 'glowing' && glowColor) {
      return {
        ...base,
        container: {
          ...base.container,
          borderColor: glowColor,
          borderWidth: 2 * glowIntensity,
        }
      };
    }
    return base;
  }, [variant, tokens, glowColor, glowIntensity]);

  const paddingValue = getCardPadding(padding, tokens);

  const containerStyle = [
    cardStyles.container,
    { borderRadius: tokens.borders.radius.lg },
    variantStyles.container,
    selected && { borderColor: tokens.colors.primary, borderWidth: 2 },
    style,
  ];

  const handlePress = (event: GestureResponderEvent) => {
    if (!disabled && onPress) {
      onPress(event);
    }
  };

  const renderContent = () => (
    <>
      {/* Badge */}
      {badge && (
        <View style={[cardStyles.badge, { backgroundColor: tokens.colors.primary }]}>
          <AtomicText type="labelSmall" color="onPrimary">
            {badge}
          </AtomicText>
        </View>
      )}

      {/* Media */}
      {image && (
        <Image
          source={typeof image === 'string' ? { uri: image } : image}
          style={[cardStyles.image, { aspectRatio: imageAspectRatio }]}
          resizeMode="cover"
        />
      )}

      {/* Selected Indicator */}
      {selected && (
        <View style={cardStyles.selectedOverlay}>
          <AtomicIcon name="checkmark-circle" color="primary" size="md" />
        </View>
      )}

      {/* Text Content */}
      <View style={{ padding: paddingValue }}>
        {(title || leftIcon || rightIcon) && (
          <View style={cardStyles.header}>
            {leftIcon && (
              <AtomicIcon
                name={leftIcon}
                size="sm"
                color="primary"
                style={{ marginRight: 8 }}
              />
            )}
            <View style={cardStyles.titleContainer}>
              {title && (
                <AtomicText
                  type="titleMedium"
                  style={[cardStyles.title, titleStyle]}
                >
                  {title}
                </AtomicText>
              )}
              {subtitle && (
                <AtomicText
                  type="bodySmall"
                  color="textSecondary"
                  style={[cardStyles.subtitle, subtitleStyle]}
                >
                  {subtitle}
                </AtomicText>
              )}
            </View>
            {rightIcon && (
              <AtomicIcon
                name={rightIcon}
                size="sm"
                color="textSecondary"
                style={{ marginLeft: 8 }}
              />
            )}
          </View>
        )}

        {description && (
          <AtomicText
            type="bodyMedium"
            color="textSecondary"
            style={[cardStyles.description, descriptionStyle]}
          >
            {description}
          </AtomicText>
        )}

        {children}
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => [
          containerStyle,
          pressed && !disabled && { opacity: 0.9, transform: [{ scale: 0.98 }] },
        ]}
        testID={testID}
      >
        {renderContent()}
      </Pressable>
    );
  }

  return (
    <View style={containerStyle} testID={testID}>
      {renderContent()}
    </View>
  );
};
