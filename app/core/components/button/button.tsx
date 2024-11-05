import React, { FC, ReactNode } from 'react';
import { StyleProp, StyleSheet, TouchableHighlight, ViewStyle } from 'react-native';


export const Button: FC<{
    children?: ReactNode,
    disabled?: boolean,
    onPress?: () => void,
    style?: StyleProp<ViewStyle>,
    fullWidth?: boolean
  }> = (
    {
      children,
      onPress,
      style,
      disabled,
      fullWidth,
    }) => {
    return <>
    <TouchableHighlight
      style={[
        s.button,
        style,
        fullWidth && s.fullWidth,
      ]}
      disabled={disabled}
      onPress={onPress}
    >

          {children ? children : null }

    </TouchableHighlight>
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
    text: {
      color: 'white',
      fontFamily: 'tilda-sans_semibold',
      fontSize: 16,
      textAlign: 'center',
    },
    caption: {
      color: 'white',
    },
    secondLine: {
      textAlign: 'center',
      marginTop: -4,
    },
    fullWidth: {
      width: '100%',
    },
  });
