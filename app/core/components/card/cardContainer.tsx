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
  activeOpacity?: number
}

export const CardContainer: FC<CardContainerProps> = ({children, style, onPress, disabled, activeOpacity, ...props}) => {
    return  <TouchableOpacity
      {...props}
      style={[s.container, style]}
      activeOpacity={activeOpacity || 0.8} // 0 — слишком резкое исчезновение, лучше 0.8
      onPress={onPress}
      disabled={disabled ?? !onPress} // Более лаконичная запись
    >
      {children}
    </TouchableOpacity>;
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
