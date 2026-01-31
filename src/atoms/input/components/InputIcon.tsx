import React from 'react';
import { Pressable } from 'react-native';
import { AtomicIcon } from '../../icon';

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
  const style = position === 'leading' ? styles.leadingIcon : styles.trailingIcon;

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={style} testID={testID}>
        <AtomicIcon name={name as any} customSize={size} customColor={color} />
      </Pressable>
    );
  }

  return (
    <AtomicIcon 
      name={name as any} 
      customSize={size} 
      customColor={color} 
      style={style}
      testID={testID}
    />
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
