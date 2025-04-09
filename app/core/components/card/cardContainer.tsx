import React from 'react';
import { FC, ReactNode } from 'react';
import { Animated, StyleProp, StyleSheet, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native';
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

export const AnimatedHashtagContainer: FC<{
  children?: ReactNode,
  style?: StyleProp<ViewStyle>,
  bgcolor?: string
}> = ({children, style, bgcolor }) => {

  return <>
  <Animated.View
    style={[
      s.hashtagContainer,
      style,
      bgcolor && {backgroundColor: bgcolor},
    ]}
  >
    {children}
  </Animated.View>
  </>;
};

export interface CardContainerProps extends ViewProps {
  children?: ReactNode,
  style?: StyleProp<ViewStyle>,
  onPress?: () => void | null,
  disabled?: boolean
}

export const CardContainer: FC<CardContainerProps> = ({children, style, onPress, disabled, ...props}) => {
    return <View {...props}>
    <TouchableOpacity
      style={[
        s.container,
        style,
      ]}
      onPress={onPress}
      disabled={disabled ? true : onPress ? false : true }
    >
      {children}
    </TouchableOpacity>
    </View>;
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
