
import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export interface InfoCardProps {
  title: string;
  content: string;
  style?: StyleProp<ViewStyle>;
}
