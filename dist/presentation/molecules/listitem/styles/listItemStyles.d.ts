import { ViewStyle } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-theme';
type DesignTokens = ReturnType<typeof useAppDesignTokens>;
export declare const getListItemStyles: (tokens: DesignTokens) => {
    container: ViewStyle;
    disabled: ViewStyle;
    iconContainer: ViewStyle;
    content: ViewStyle;
    subtitle: ViewStyle;
};
export {};
