import { ViewStyle } from 'react-native';
/**
 * ListItem component props
 *
 * leftIcon/rightIcon: Any MaterialIcons name
 * @see https://fonts.google.com/icons
 */
export interface ListItemProps {
    title: string;
    subtitle?: string;
    leftIcon?: string;
    rightIcon?: string;
    onPress?: () => void;
    disabled?: boolean;
    style?: ViewStyle;
}
