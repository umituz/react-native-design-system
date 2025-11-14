export function combineStyles(...styles) {
    return styles.reduce((acc, style) => (style ? { ...acc, ...style } : acc), {});
}
export function conditionalStyle(condition, trueStyle, falseStyle) {
    return condition ? trueStyle : falseStyle;
}
export function responsiveStyle(small, medium, large) {
    return small;
}
