import React, { Ref } from 'react';
import { FC, ReactNode } from 'react';
import { StyleProp, StyleSheet, TouchableHighlight, View, ViewStyle } from 'react-native';
import colors from '../../colors/colors';



export const CardContainer: FC<{
    children?: ReactNode,
    style?: StyleProp<ViewStyle>,
    ref?: React.Ref<string>
}> = ({children, style, ref }) => {



    return <>
    <View
      style={[
        s.container,
        style,
      ]}
    >
      {children}
    </View>
    </>;
};

const s = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: colors.WHITE_COLOR,
      padding: 16,
      gap: 12,
      borderRadius: 26,
    },
  });
