import { Style, VariantConfig, VariantProps, createVariants } from './core';

export type CompoundVariant<T extends Record<string, any>> = {
  conditions: Partial<VariantProps<T>>;
  style: Style;
};

export type AdvancedVariantConfig<T extends Record<string, any>> = VariantConfig<T> & {
  compoundVariants?: CompoundVariant<T>[];
};

export function createAdvancedVariants<T extends Record<string, any>>(config: AdvancedVariantConfig<T>) {
  const baseVariantFn = createVariants(config);

  return function (props: VariantProps<T> = {}): Style {
    let result = baseVariantFn(props);

    if (config.compoundVariants) {
      for (const compound of config.compoundVariants) {
        const conditionsMet = Object.entries(compound.conditions).every(
          ([key, value]) => props[key as keyof T] === value
        );
        if (conditionsMet) result = { ...result, ...compound.style };
      }
    }

    return result;
  };
}
