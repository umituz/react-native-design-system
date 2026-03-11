import React from 'react';
import { Image as RNImage, type StyleProp, type ImageStyle } from 'react-native';

// Lazy-load expo-image (optional peer dep) — falls back to React Native Image
let ExpoImage: React.ComponentType<any> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ExpoImage = require('expo-image').Image;
} catch {
  // expo-image not installed — using React Native Image fallback
}

export type AtomicImageProps = {
  source?: any;
  style?: StyleProp<ImageStyle>;
  rounded?: boolean;
  contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  cachePolicy?: 'none' | 'disk' | 'memory' | 'memory-disk';
  [key: string]: any;
};

const RESIZE_MODE_MAP: Record<string, 'cover' | 'contain' | 'stretch' | 'center'> = {
  cover: 'cover',
  contain: 'contain',
  fill: 'stretch',
  none: 'center',
  'scale-down': 'contain',
};

const ROUNDED_STYLE = { borderRadius: 9999 };

export const AtomicImage: React.FC<AtomicImageProps> = ({
  style,
  rounded,
  contentFit = 'cover',
  cachePolicy,
  ...props
}) => {
  const roundedStyle = rounded ? ROUNDED_STYLE : undefined;

  if (ExpoImage) {
    return (
      <ExpoImage
        style={[style, roundedStyle]}
        contentFit={contentFit}
        cachePolicy={cachePolicy}
        accessibilityRole="image"
        {...props}
      />
    );
  }

  return (
    <RNImage
      style={[style as StyleProp<ImageStyle>, roundedStyle]}
      resizeMode={RESIZE_MODE_MAP[contentFit] ?? 'cover'}
      accessibilityRole="image"
      {...props}
    />
  );
};
