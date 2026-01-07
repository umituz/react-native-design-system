import React from 'react';
import { View, Pressable } from 'react-native';
import { AtomicIcon } from '../../AtomicIcon';

interface InputIconProps {
  name: string;
  size: number;
  color: string;
  position: 'leading' | 'trailing';
  onPress?: () => void;
  testID?: string;
}

export const InputIcon: React.FC<InputIconProps> = ({
  name,
  size,
  color,
  position,
  onPress,
  testID,
}) => {
  const positionStyle = position === 'leading' ? styles.leadingIcon : styles.trailingIcon;
  const Wrapper = onPress ? Pressable : View;
  const wrapperProps = onPress ? { onPress, testID } : {};

  return (
    <Wrapper style={positionStyle} {...wrapperProps}>
      <AtomicIcon name={name} customSize={size} customColor={color} />
    </Wrapper>
  );
};

const styles = {
  leadingIcon: {
    position: 'absolute' as const,
    left: 12,
    zIndex: 1,
  },
  trailingIcon: {
    position: 'absolute' as const,
    right: 12,
    zIndex: 1,
  },
};
