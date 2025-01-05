import { FC, ReactNode } from 'react';
import { KeyboardTypeOptions, StyleProp, StyleSheet, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import colors from '../../colors/colors';
import React from 'react';
import { IfgText } from '../text/ifg-text';
import gs from '../../styles/global';


export const Input: FC<{
    editable?: boolean,
    onChange?: (text: string) => void,
    onFocus?: () => void,
    style?: StyleProp<ViewStyle | TextStyle>,
    fullWidth?: boolean,
    children?: ReactNode,
    maxLength?: number,
    placeholder?: string,
    keyboardType?:KeyboardTypeOptions | undefined,
    secureTextEntry?: boolean
    value?: string,
    defaultValue?: string,
    error?: string,
    required?: boolean,
  }> = (
    {
      onChange,
      onFocus,
      style,
      editable,
      fullWidth,
      children,
      maxLength,
      placeholder,
      keyboardType,
      secureTextEntry,
      value,
      defaultValue,
      error,
    }) => {
    return <View style={s.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
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
      value={value}
      onFocus={onFocus}
      defaultValue={defaultValue}
     />
    {children ? children : null }
      </View>

    {error && <IfgText color={colors.RED_COLOR} style={gs.fontCaptionSmallSmall}>
    {error || 'Что-то пошло не так'}</IfgText>}
    </View>;
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
    container: {
      width: '100%',
      justifyContent: 'center',
    },
    fullWidth: {
      width: '100%',
    },
    required: {
      borderColor: colors.RED_COLOR,
    },
  });
