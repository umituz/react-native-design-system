import 'react-native';

declare module 'react-native' {
  import { FC } from 'react';
  import { ViewProps as RNViewProps, TextProps as RNTextProps } from 'react-native';

  export const View: FC<RNViewProps>;
  export const Text: FC<RNTextProps>;
  export const ScrollView: FC<any>;
  export const FlatList: FC<any>;
  export const TouchableOpacity: FC<any>;
  export const TouchableHighlight: FC<any>;
  export const Pressable: FC<any>;
  export const TextInput: FC<any>;
  export const Image: FC<any>;
  export const ActivityIndicator: FC<any>;
  export const Modal: FC<any>;
  export const Switch: FC<any>;
  export const KeyboardAvoidingView: FC<any>;
  export const RefreshControl: FC<any>;
}
