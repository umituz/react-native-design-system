export function createVariants(config) {
    return function (props = {}) {
        let result = { ...config.base };
        if (config.defaultVariants) {
            for (const [variantKey, defaultValue] of Object.entries(config.defaultVariants)) {
                if (config.variants?.[variantKey] && defaultValue) {
                    const variantStyle = config.variants[variantKey][defaultValue];
                    if (variantStyle)
                        result = { ...result, ...variantStyle };
                }
            }
        }
        for (const [variantKey, variantValue] of Object.entries(props)) {
            if (config.variants?.[variantKey] && variantValue) {
                const variantStyle = config.variants[variantKey][variantValue];
                if (variantStyle)
                    result = { ...result, ...variantStyle };
            }
        }
        return result;
    };
}
