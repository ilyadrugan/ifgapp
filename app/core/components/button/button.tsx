import React, { FC, ReactNode } from 'react';
import { StyleProp, StyleSheet, TouchableHighlight, TouchableOpacity, ViewStyle } from 'react-native';


export const Button: FC<{
    children?: ReactNode,
    disabled?: boolean,
    onPress?: () => void,
    style?: StyleProp<ViewStyle>,
    fullWidth?: boolean
    outlined?: boolean
  }> = (
    {
      children,
      onPress,
      style,
      disabled,
      fullWidth,
      outlined,
    }) => {
    return <>
    <TouchableOpacity
      style={[
        s.button,
        style,
        fullWidth && s.fullWidth,
        outlined && s.outline,
      ]}
      disabled={disabled}
      onPress={onPress}
    >

          {children ? children : null }

    </TouchableOpacity>
    </>;
};

const s = StyleSheet.create({
    button: {
      height: 56,
      justifyContent: 'center',
      borderRadius: 8,
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    activityIndicator: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    fullWidth: {
      width: '100%',
    },
    outline: {
      backgroundColor: 'transparent',
    },
  });
