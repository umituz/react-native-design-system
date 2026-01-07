/**
 * ContentWrapper Component
 * Conditionally wraps content with KeyboardAvoidingView
 */

import React from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { AtomicKeyboardAvoidingView } from '../../../atoms';

export interface ContentWrapperProps {
  readonly children: React.ReactNode;
  readonly keyboardAvoiding?: boolean;
  readonly style?: ViewStyle;
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  keyboardAvoiding = false,
  style,
}) => {
  if (keyboardAvoiding) {
    return (
      <AtomicKeyboardAvoidingView style={style}>
        {children}
      </AtomicKeyboardAvoidingView>
    );
  }

  return <View style={style}>{children}</View>;
};
