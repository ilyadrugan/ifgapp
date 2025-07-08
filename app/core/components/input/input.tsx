import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Animated, FlatList, KeyboardTypeOptions, Platform, Pressable, StyleProp, StyleSheet, TextInput, TextStyle, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import colors from '../../colors/colors';
import React from 'react';
import { IfgText } from '../text/ifg-text';
import gs from '../../styles/global';
import Search from '../../../../assets/icons/search.svg';
import EyeHide from '../../../../assets/icons/eye-password-hide.svg';
import EyeOpen from '../../../../assets/icons/eye-password-open.svg';
import Chevron from '../../../../assets/icons/chevron.svg';
import DateTimePicker from '@react-native-community/datetimepicker';


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
      allowFontScaling={false}
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
        allowFontScaling={false}
        value={value}
        style={[s.input2, {color: colors.PLACEHOLDER_COLOR}]}
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

export const TextInputWithIconEye: FC<{
  onChange?: (text: string) => void,
  onFocus?: () => void,
  onBlur?: () => void,
  onIcon?: () => void,
  style?: StyleProp<ViewStyle | TextStyle>,
  fullWidth?: boolean,
  children?: ReactNode,
  placeholder?: string,
  placeholderTextColor?: string,
  keyboardType?:KeyboardTypeOptions | undefined,
  secureTextEntry?: boolean
  value?: string,
  error?: string,
}> = (
  {
    onChange,
    onFocus,
    onBlur,
    style,
    placeholder,
    placeholderTextColor,
    value,
    keyboardType,
    secureTextEntry,
    error,
    fullWidth,
    onIcon,
  }) => {
    const [isHide, setHide] = useState(true);
  return (
    <View style={s.container}>
   <View style={[s.inputWrapper, fullWidth && s.fullWidth, error && s.error]}>
  <TextInput
    allowFontScaling={false}
    value={value}
    style={[s.input3, gs.fontCaption]}
    placeholder={placeholder}
    placeholderTextColor={placeholderTextColor || colors.PLACEHOLDER_COLOR}
    onFocus={onFocus}
    onChangeText={onChange}
    onBlur={onBlur}
    secureTextEntry={isHide}
    keyboardType={keyboardType}
  />
  <TouchableOpacity onPress={() => setHide(prev => !prev)} style={s.iconHide}>
    {isHide ? <EyeHide /> : <EyeOpen />}
  </TouchableOpacity>
</View>
{error && <IfgText color={colors.RED_COLOR} style={gs.fontCaptionSmallSmall}>
    {error || 'Что-то пошло не так'}</IfgText>}</View>
  );
};

export const InputFlatOld: FC<{
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
      allowFontScaling={false}
     />
    {children ? children : null }
      </View>

    {error && <IfgText color={colors.RED_COLOR} style={gs.fontCaptionSmallSmall}>
    {error || 'Что-то пошло не так'}</IfgText>}
    </View>;
};
const parseTime = (str: string): Date => {
  const [h, m] = str.split(':');
  const date = new Date();
  date.setHours(Number(h));
  date.setMinutes(Number(m));
  return date;
};

export const InputFlat: FC<{
  editable?: boolean;
  onChange?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: StyleProp<ViewStyle | TextStyle>;
  fullWidth?: boolean;
  children?: ReactNode;
  maxLength?: number;
  placeholder?: string;
  placeholderTextColor?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  value?: string;
  defaultValue?: string;
  error?: string;
  required?: boolean;
  tail?: string;
  withIconButton?: boolean
}> = ({
  onChange,
  onFocus,
  onBlur,
  style,
  editable = true,
  fullWidth,
  children,
  maxLength,
  placeholder = '',
  placeholderTextColor,
  keyboardType,
  secureTextEntry,
  value,
  defaultValue,
  error,
  tail,
  withIconButton,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (event?.type === 'set' && selectedDate) {
      const hours = selectedDate.getHours().toString().padStart(2, '0');
      const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;
      onChange?.(formattedTime);
    }
  };

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: value || isFocused ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  useEffect(()=> {

  }, [isFocused]);

  const labelStyle = {
    position: 'absolute' as const,
    ...gs.fontCaption2,
    left: 16,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 6], // Отступ сверху для placeholder
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#A0A0A0', '#A0A0A0'],
    }),
  };

  return (
    <View style={[s.container, style && style]}>
      <View style={[s.inputWrapper, fullWidth && s.fullWidth, error && s.error,{backgroundColor: colors.WHITE_COLOR}, {height: 56, borderRadius: 12}, style && style]}>
        <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
        <TextInput
          style={[s.inputText, style]}
          editable={editable}
          onChangeText={onChange}
          maxLength={maxLength}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          value={value}
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setIsFocused(false);
            onBlur && onBlur();
          }}
          defaultValue={defaultValue}
          placeholder=""
          allowFontScaling={false}
        />
        {withIconButton && <TouchableOpacity onPress={() => setShowTimePicker(true)} style={s.iconButton}>
          <Chevron/>
        </TouchableOpacity>}

        {showTimePicker && (
          <DateTimePicker
            value={value ? parseTime(value) : new Date()}
            mode="time"
            is24Hour
            display={Platform.OS === 'ios' ? 'spinner' : 'spinner'}
            onChange={handleTimeChange}
          />
        )}
        {/* {!!value && !!tail && (
          <View style={s.tailWrapper}>
            <IfgText style={s.tailText}>{tail}</IfgText>
          </View>
        )} */}
        {children}
      </View>
      {error && (
        <IfgText color={colors.RED_COLOR} style={gs.fontCaptionSmallSmall}>
          {error}
        </IfgText>
      )}
    </View>
  );
};

interface DropdownInputProps {
  placeholder?: string;
  options: string[];
  value?: string;
  onSelect: (val: string) => void;
  error?: string;
}

export const DropdownInput: FC<DropdownInputProps> = ({
  placeholder = '',
  options,
  value,
  onSelect,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: value || isFocused ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute' as const,
    ...gs.fontCaption2,
    left: 16,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 6],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#A0A0A0', '#A0A0A0'],
    }),
  };

  return (
    <View style={s.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setIsOpen(prev => !prev);
          setIsFocused(true);
        }}
        style={[
          s.inputWrapper,
          { height: 56, borderRadius: 12, borderBottomLeftRadius: isOpen ? 0 : 12,
    borderBottomRightRadius: isOpen ? 0 : 12, backgroundColor: colors.WHITE_COLOR },
          error && s.error,
        ]}
      >
        <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
        <View style={s.valueWrapper}>
          <IfgText style={s.inputText}>{value || ''}</IfgText>
          {/* <Text style={s.arrow}>▾</Text> */}
        </View>
      <TouchableOpacity onPress={() => {setIsOpen((prev)=>!prev); setIsFocused((prev)=>!prev);}} style={s.iconButton}>
          <View style={{transform: [{rotate: isOpen ? '180deg' : '0deg'}] }}>
            <Chevron/>
          </View>
      </TouchableOpacity>
      </TouchableOpacity>

      {isOpen && (
        <View style={s.dropdown}>
          <FlatList
            data={options}
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={s.option}
                onPress={() => {
                  onSelect(item);
                  setIsOpen(false);
                  setIsFocused(false);
                }}
              >
                <IfgText style={gs.fontCaption2}>{item}</IfgText>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {error && (
        <IfgText color={colors.RED_COLOR} style={gs.fontCaptionSmallSmall}>
          {error}
        </IfgText>
      )}
    </View>
  );
};

const s = StyleSheet.create({
  valueWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
   dropdown: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.BORDER_COLOR,
    maxHeight: 150,
    zIndex: 999,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
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
     inputWrapper: {
      position: 'relative',
      borderWidth: 1,
      borderColor: colors.BORDER_COLOR,
      borderRadius: 16,
      justifyContent: 'center',
      height: 78,
    },
    input3: {
      paddingLeft: 24,
      paddingRight: 48, // Оставляем место под иконку
      color: colors.PLACEHOLDER_COLOR,
      height: '100%',
    },
    input2: {
      flex: 1, // Расширяет TextInput, чтобы занимать все доступное пространство
      ...gs.fontCaption2,
    },
    icon: {
      marginLeft: 6, // Отступ между TextInput и иконкой
      marginRight: 4,
    },
    iconHide: {
        position: 'absolute',
        right: 16,
        top: '50%',
        transform: [{ translateY: -12 }], // центрирование по вертикали
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
      },
    inputText: {
      paddingLeft: 16,
      paddingTop: 16,
      paddingRight: 16,
      paddingBottom: 8,
      height: '100%',
      fontSize: 16,
      color: '#000',
   },
   tailWrapper: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -8 }],
  },
  iconButton: {
    position: 'absolute',
    right: 0,
    // top: 16,
    zIndex: 1,
    alignItems: 'center',
    justifyContent:'center',
    padding: 16,
  },
  });
