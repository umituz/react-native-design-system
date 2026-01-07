/**
 * AtomicButton Component
 * Refactored: Extracted configs, styles, and types
 */

import React from 'react';
import { StyleProp, ViewStyle, TextStyle, TouchableOpacity, View } from 'react-native';
import { AtomicText } from '../AtomicText';
import { AtomicIcon } from '../AtomicIcon';
import { AtomicSpinner } from '../AtomicSpinner';
import { useAppDesignTokens } from '../../theme';
import { getButtonSizeConfig } from './configs/buttonSizeConfig';
import { getVariantStyles } from './styles/buttonVariantStyles';
import { buttonStyles } from './styles/buttonStyles';
import type { AtomicButtonProps } from './types';

export const AtomicButton: React.FC<AtomicButtonProps> = React.memo(({
  title,
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
  activeOpacity = 0.8,
  testID,
}) => {
  const tokens = useAppDesignTokens();

  const handlePress = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };

  const isDisabled = disabled || loading;
  const config = getButtonSizeConfig(size, tokens);
  const variantStyles = getVariantStyles(variant, tokens);
  const iconColor = variantStyles.text.color;

  const containerStyle: StyleProp<ViewStyle> = [
    buttonStyles.button,
    {
      paddingVertical: config.paddingVertical,
      paddingHorizontal: config.paddingHorizontal,
      minHeight: config.minHeight,
      borderRadius: tokens.borders.radius.md,
    },
    variantStyles.container,
    fullWidth ? buttonStyles.fullWidth : undefined,
    isDisabled ? buttonStyles.disabled : undefined,
    style,
  ];

  const buttonTextStyle: StyleProp<TextStyle> = [
    {
      fontSize: config.fontSize,
      fontWeight: '600',
    },
    variantStyles.text,
    isDisabled ? buttonStyles.disabledText : undefined,
    textStyle,
  ];

  const buttonText = title || children;
  const showIcon = icon;

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={handlePress}
      activeOpacity={activeOpacity}
      disabled={isDisabled}
      testID={testID}
    >
      <View style={[buttonStyles.content, iconPosition === 'right' && buttonStyles.rowReverse]}>
        {loading ? (
          <AtomicSpinner
            size="sm"
            color={iconColor as string}
            style={iconPosition === 'right' ? buttonStyles.iconRight : buttonStyles.iconLeft}
          />
        ) : showIcon ? (
          <AtomicIcon
            name={icon}
            customSize={config.iconSize}
            customColor={iconColor as string | undefined}
            style={iconPosition === 'right' ? buttonStyles.iconRight : buttonStyles.iconLeft}
          />
        ) : null}

        <AtomicText style={buttonTextStyle}>
          {buttonText}
        </AtomicText>
      </View>
    </TouchableOpacity>
  );
});

AtomicButton.displayName = 'AtomicButton';

// Re-export types for convenience
export type { AtomicButtonProps, ButtonVariant, ButtonSize } from './types';
