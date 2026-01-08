import React from 'react';
import { Image as ExpoImage, ImageProps as ExpoImageProps } from 'expo-image';
import { StyleSheet, ViewStyle } from 'react-native';

export type AtomicImageProps = ExpoImageProps & {
  rounded?: boolean;
};

export const AtomicImage: React.FC<AtomicImageProps> = ({
  style,
  rounded,
  contentFit = 'cover',
  transition = 300,
  ...props
}) => {

  
  return (
    <ExpoImage
      style={[
        style,
        rounded && { borderRadius: 9999 }
      ]}
      contentFit={contentFit}
      transition={transition}
      {...props}
    />
  );
};
