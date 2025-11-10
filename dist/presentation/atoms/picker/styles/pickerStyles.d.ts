import { ViewStyle, TextStyle } from 'react-native';
import { type DesignTokens } from '@umituz/react-native-theme';
/**
 * Picker container styles with iOS HIG compliance
 *
 * All picker sizes meet Apple's minimum touch target requirement of 44pt.
 * @see https://developer.apple.com/design/human-interface-guidelines/layout
 */
export declare const getPickerContainerStyles: (tokens: DesignTokens) => {
    base: {
        flexDirection: "row";
        alignItems: "center";
        justifyContent: "space-between";
        borderWidth: number;
        borderColor: string;
        backgroundColor: string;
    };
    size: {
        sm: {
            height: 44;
            paddingHorizontal: number;
            borderRadius: number;
        };
        md: {
            height: number;
            paddingHorizontal: number;
            borderRadius: number;
        };
        lg: {
            height: number;
            paddingHorizontal: number;
            borderRadius: number;
        };
    };
    state: {
        error: {
            borderColor: string;
            borderWidth: number;
        };
        disabled: {
            backgroundColor: string;
            opacity: number;
        };
    };
};
export declare const getPickerLabelStyles: (tokens: DesignTokens) => {
    base: TextStyle;
    size: {
        sm: TextStyle;
        md: TextStyle;
        lg: TextStyle;
    };
};
export declare const getPickerPlaceholderStyles: (tokens: DesignTokens) => {
    base: TextStyle;
    size: {
        sm: TextStyle;
        md: TextStyle;
        lg: TextStyle;
    };
};
export declare const getPickerValueStyles: (tokens: DesignTokens) => {
    base: TextStyle;
    size: {
        sm: TextStyle;
        md: TextStyle;
        lg: TextStyle;
    };
};
export declare const getPickerErrorStyles: (tokens: DesignTokens) => TextStyle;
export declare const getModalOverlayStyles: (tokens: DesignTokens) => ViewStyle;
export declare const getModalContainerStyles: (tokens: DesignTokens, maxHeight: number) => ViewStyle;
export declare const getModalHeaderStyles: (tokens: DesignTokens) => ViewStyle;
export declare const getModalTitleStyles: (tokens: DesignTokens) => TextStyle;
export declare const getSearchContainerStyles: (tokens: DesignTokens) => ViewStyle;
export declare const getSearchInputStyles: (tokens: DesignTokens) => TextStyle;
export declare const getOptionContainerStyles: (tokens: DesignTokens, isSelected: boolean, isDisabled: boolean) => ViewStyle;
export declare const getOptionTextStyles: (tokens: DesignTokens, isSelected: boolean) => TextStyle;
export declare const getOptionDescriptionStyles: (tokens: DesignTokens) => TextStyle;
export declare const getEmptyStateStyles: (tokens: DesignTokens) => ViewStyle;
export declare const getEmptyStateTextStyles: (tokens: DesignTokens) => TextStyle;
export declare const getChipContainerStyles: (tokens: DesignTokens) => ViewStyle;
export declare const getChipStyles: (tokens: DesignTokens) => ViewStyle;
export declare const getChipTextStyles: (tokens: DesignTokens) => TextStyle;
