import { Style, VariantConfig, VariantProps } from './core';
export type CompoundVariant<T extends Record<string, any>> = {
    conditions: Partial<VariantProps<T>>;
    style: Style;
};
export type AdvancedVariantConfig<T extends Record<string, any>> = VariantConfig<T> & {
    compoundVariants?: CompoundVariant<T>[];
};
export declare function createAdvancedVariants<T extends Record<string, any>>(config: AdvancedVariantConfig<T>): (props?: VariantProps<T>) => Style;
//# sourceMappingURL=compound.d.ts.map