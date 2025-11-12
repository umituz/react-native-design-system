import React from 'react';
import { Text } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-theme';
import { getTextColor } from '@umituz/react-native-typography';
export const AtomicText = ({ children, type = 'bodyMedium', color, numberOfLines, ellipsizeMode, textAlign, style, testID, }) => {
    const tokens = useAppDesignTokens();
    // Get typography style from tokens
    const typographyStyle = tokens.typography[type];
    // Get color from tokens or use custom color using utility function
    const resolvedColor = getTextColor(color, tokens);
    const textStyle = [
        typographyStyle,
        {
            color: resolvedColor,
            ...(textAlign && { textAlign }),
        },
        style,
    ];
    return (<Text numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode} style={textStyle} testID={testID}>
      {children}
    </Text>);
};
