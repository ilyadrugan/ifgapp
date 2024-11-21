import LinearGradient from 'react-native-linear-gradient';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import React, { FC } from 'react';

export const ShadowGradient:FC<{opacity: number, style?: StyleProp<ViewStyle>,}> = ({opacity = 0.75, style}) =>
    <LinearGradient
        colors={['transparent', `rgba(0, 0, 0, ${opacity})` ]}
        style={[style, s.shadowGradient]}
        />;


const s = StyleSheet.create({
  shadowGradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 160,
      zIndex: 99,
      elevation: 10,
      marginHorizontal: -16,
    },
    });
