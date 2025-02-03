import { FC, ReactNode } from 'react';
import { KeyboardTypeOptions, StyleProp, StyleSheet, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import colors from '../../colors/colors';
import React from 'react';
import { IfgText } from '../text/ifg-text';
import gs from '../../styles/global';
import Search from '../../../../assets/icons/search.svg';


export const Input: FC<{
    editable?: boolean,
    onChange?: (text: string) => void,
    onFocus?: () => void,
    style?: StyleProp<ViewStyle | TextStyle>,
    fullWidth?: boolean,
    children?: ReactNode,
    maxLength?: number,
    placeholder?: string,
    placeholderTextColor?: string,
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
      placeholderTextColor,
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
        error && s.error,
      ]}
      editable={editable}
      onChangeText={onChange}
      maxLength={maxLength}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor || colors.PLACEHOLDER_COLOR}
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

export const TextInputWithIcon: FC<{
  onChange?: (text: string) => void,
  onFocus?: () => void,
  onBlur?: () => void,
  style?: StyleProp<ViewStyle | TextStyle>,
  placeholder?: string,
  placeholderTextColor?: string,
  value?: string,
}> = (
  {
    onChange,
    onFocus,
    onBlur,
    style,
    placeholder,
    placeholderTextColor,
    value,
  }) => {
  return (
    <View style={[s.inputContainer, style]}>
      <TextInput
        value={value}
        style={s.input2}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || colors.PLACEHOLDER_COLOR}
        onFocus={onFocus}
        onChangeText={onChange}
        onBlur={onBlur}
      />
      <View style={s.icon} >
        <Search />
      </View>
    </View>
  );
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
    error: {
      borderColor: colors.RED_COLOR,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E4E4E4',
      borderRadius: 12,
      paddingHorizontal: 10,
      height: 56,
      backgroundColor: 'rgba(255,255,255, 0.35)',
    },
    input2: {
      flex: 1, // Расширяет TextInput, чтобы занимать все доступное пространство
      ...gs.fontCaption2,
    },
    icon: {
      marginLeft: 6, // Отступ между TextInput и иконкой
      marginRight: 4,
    },
  });
