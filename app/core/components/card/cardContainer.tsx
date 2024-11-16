import React, { Ref } from 'react';
import { FC, ReactNode } from 'react';
import { StyleProp, StyleSheet, TouchableHighlight, TouchableOpacity, View, ViewStyle } from 'react-native';
import colors from '../../colors/colors';



export const CardContainer: FC<{
    children?: ReactNode,
    style?: StyleProp<ViewStyle>,
    ref?: React.Ref<string>
    onPress?: () => void
}> = ({children, style, ref , onPress}) => {



    return <>
    <TouchableOpacity
      style={[
        s.container,
        style,
      ]}
      disabled={onPress ? false : true}
    >
      {children}
    </TouchableOpacity>
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
