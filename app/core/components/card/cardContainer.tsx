import React from 'react';
import { FC, ReactNode } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import colors from '../../colors/colors';

export const HashtagContainer: FC<{
  children?: ReactNode,
  style?: StyleProp<ViewStyle>,
  bgcolor?: string
}> = ({children, style, bgcolor }) => {

  return <>
  <View
    style={[
      s.hashtagContainer,
      style,
      bgcolor && {backgroundColor: bgcolor},
    ]}
  >
    {children}
  </View>
  </>;
};

export const CardContainer: FC<{
    children?: ReactNode,
    style?: StyleProp<ViewStyle>,
    onPress?: () => void
}> = ({children, style, onPress}) => {



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
    hashtagContainer: {
      flexDirection: 'row',
      backgroundColor: colors.WHITE_COLOR,
      paddingHorizontal: 8,
      paddingVertical: 5,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems:'center',
    },
  });
