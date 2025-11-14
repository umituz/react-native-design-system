import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
type Style = ViewStyle | TextStyle | ImageStyle;
export type VariantConfig<T extends Record<string, any>> = {
    base?: Style;
    variants?: T;
    defaultVariants?: {
        [K in keyof T]?: keyof T[K];
    };
};
export type VariantProps<T extends Record<string, any>> = {
    [K in keyof T]?: keyof T[K];
};
export declare function createVariants<T extends Record<string, any>>(config: VariantConfig<T>): (props?: VariantProps<T>) => Style;
export type { Style };
//# sourceMappingURL=core.d.ts.map