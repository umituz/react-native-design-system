import { createVariants } from './core';
export function createAdvancedVariants(config) {
    const baseVariantFn = createVariants(config);
    return function (props = {}) {
        let result = baseVariantFn(props);
        if (config.compoundVariants) {
            for (const compound of config.compoundVariants) {
                const conditionsMet = Object.entries(compound.conditions).every(([key, value]) => props[key] === value);
                if (conditionsMet)
                    result = { ...result, ...compound.style };
            }
        }
        return result;
    };
}
