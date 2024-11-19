import { FC, ReactNode } from 'react';
import { KeyboardTypeOptions, StyleProp, StyleSheet, TextInput, TextStyle, ViewStyle } from 'react-native';
import colors from '../../colors/colors';
import React from 'react';


export const Input: FC<{
    editable?: boolean,
    onChange?: () => void,
    style?: StyleProp<ViewStyle | TextStyle>,
    fullWidth?: boolean,
    children?: ReactNode,
    maxLength?: number,
    placeholder?: string,
    keyboardType?:KeyboardTypeOptions | undefined,
    secureTextEntry?: boolean
  }> = (
    {
        onChange,
      style,
      editable,
      fullWidth,
      children,
      maxLength,
      placeholder,
      keyboardType,
      secureTextEntry,
    }) => {
    return <>

    <TextInput
      style={[
        s.input,
        style,
        fullWidth && s.fullWidth,
      ]}
      editable={editable}
      onChangeText={onChange}
      maxLength={maxLength}
      placeholder={placeholder}
      placeholderTextColor={colors.PLACEHOLDER_COLOR}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      
    >

          {children ? children : null }

    </TextInput>
    </>;
};


const s = StyleSheet.create({
    input: {
      height: 78,
      justifyContent: 'center',
      borderRadius: 16,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.BORDER_COLOR,
      padding: 24,
    },

    fullWidth: {
      width: '100%',
    },
  });
