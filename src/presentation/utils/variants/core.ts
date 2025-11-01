import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

type Style = ViewStyle | TextStyle | ImageStyle;

export type VariantConfig<T extends Record<string, any>> = {
  base?: Style;
  variants?: T;
  defaultVariants?: { [K in keyof T]?: keyof T[K] };
};

export type VariantProps<T extends Record<string, any>> = {
  [K in keyof T]?: keyof T[K];
};

export function createVariants<T extends Record<string, any>>(config: VariantConfig<T>) {
  return function (props: VariantProps<T> = {}): Style {
    let result: Style = { ...config.base };

    if (config.defaultVariants) {
      for (const [variantKey, defaultValue] of Object.entries(config.defaultVariants)) {
        if (config.variants?.[variantKey] && defaultValue) {
          const variantStyle = config.variants[variantKey][defaultValue as string];
          if (variantStyle) result = { ...result, ...variantStyle };
        }
      }
    }

    for (const [variantKey, variantValue] of Object.entries(props)) {
      if (config.variants?.[variantKey] && variantValue) {
        const variantStyle = config.variants[variantKey][variantValue as string];
        if (variantStyle) result = { ...result, ...variantStyle };
      }
    }

    return result;
  };
}

export type { Style };
