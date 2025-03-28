import LinearGradient from 'react-native-linear-gradient';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import React, { FC } from 'react';

export const ShadowGradient:FC<{opacity: number, style?: StyleProp<ViewStyle>,onTop?: boolean}> = ({opacity = 0.75, style, onTop}) =>
    <LinearGradient
        colors={['transparent', `rgba(0, 0, 0, ${opacity})` ]}
        style={[s.shadowGradient, onTop ? {top: 0} : { bottom: 0} ]}
        />;


const s = StyleSheet.create({
  shadowGradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 99,
      height: 60,
      elevation: 10,
      marginHorizontal: -16,
    },
    });
