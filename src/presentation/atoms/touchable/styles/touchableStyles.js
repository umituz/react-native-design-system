/**
 * Get opacity value based on feedback strength
 */
export const getOpacityValue = (strength) => {
    switch (strength) {
        case 'subtle':
            return 0.8;
        case 'normal':
            return 0.6;
        case 'strong':
            return 0.4;
        default:
            return 0.6;
    }
};
/**
 * Get base touchable container style
 * Ensures minimum touch target size (iOS HIG: 48x48)
 */
export const getTouchableContainerStyle = () => ({
    minWidth: 48,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
});
/**
 * Get disabled touchable style
 */
export const getDisabledStyle = () => ({
    opacity: 0.5,
});
/**
 * Convert number to HitSlop object
 * If hitSlop is a number, apply it to all sides
 */
export const normalizeHitSlop = (hitSlop) => {
    if (hitSlop === undefined)
        return undefined;
    if (typeof hitSlop === 'number') {
        return {
            top: hitSlop,
            bottom: hitSlop,
            left: hitSlop,
            right: hitSlop,
        };
    }
    return {
        top: hitSlop.top || 0,
        bottom: hitSlop.bottom || 0,
        left: hitSlop.left || 0,
        right: hitSlop.right || 0,
    };
};
