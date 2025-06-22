import { ActivityIndicator, Dimensions, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import colors from '../../core/colors/colors';
import { Input, TextInputWithIconEye } from '../../core/components/input/input';
import { AnimatedGradientButton, Button } from '../../core/components/button/button';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import authStore from '../../../store/state/authStore/authStore';
import { LoginByUserPasswordModel } from '../../../store/state/authStore/models/models';
import { observer } from 'mobx-react';
import AnimatedArrow from '../../core/components/animatedArrow/animatedArrow';
import {isValidEmail} from '../../core/utils/isValidEmail';
import { GoogleSignInButton } from '../../core/components/google-signin/google-signin';
import { TextInputMask } from 'react-native-masked-text';
import { isTablet } from '../../hooks/useDimensions';
const height = Dimensions.get('screen').height;

export const Login = observer(() => {
    const [phone, setPhone] = useState<string>('');
    const navigation = useNavigation<any>();
    const toRegistraition = () =>{
      authStore.clearMessageError();
      navigation.replace('Registration');
    };
    const [forgotPassword, setForgotPassword] = useState(false);
    const handlePhoneChange = (text) => {
        const cleaned = text.replace(/\D/g, '');

        let formatted = cleaned;

        if (cleaned.length > 0) {
          formatted = `+${cleaned.slice(0, 1)}`;
        }
        if (cleaned.length > 1) {
          formatted += ` (${cleaned.slice(1, 4)}`;
        }
        if (cleaned.length > 4) {
          formatted += `) ${cleaned.slice(4, 7)}`;
        }
        if (cleaned.length > 7) {
          formatted += `-${cleaned.slice(7, 9)}`;
        }
        if (cleaned.length > 9) {
          formatted += `-${cleaned.slice(9, 11)}`;
        }

        setPhone(formatted);
      };
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm<LoginByUserPasswordModel>();

      useEffect(()=>{
        control._reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [authStore.access_token]);
      useFocusEffect(
        React.useCallback(() => {
          if (authStore.isAuthenticated) {
            navigation.replace('Main');
          }
        }, [authStore.isAuthenticated])
      );
      const onSubmit = handleSubmit(async (data) => {
        console.log(data);

        if (!data.email) {authStore.fillEmailError('Заполните поле');}
        // else if (!isValidEmail(data.email)){
        //   authStore.fillEmailError('Некорректный Email');
        // }
        if (forgotPassword) {
          if (!isValidEmail(data.email)) {return;}
          await authStore.forgotPassword(data.email);
          return;
        }
        if (!data.password) {authStore.fillPasswordError('Заполните поле');}
        if (data.email && data.password) {authStore.login(data, ()=>navigation.replace('Main'));}
      });

      const clearLogin = () => {
        setValue('email', '');
      };

      const clearPassword = () => {
        setValue('password', '');
      };
  // const [valueEP, setValueEP] = useState('');
  // const [isPhone, setIsPhone] = useState(false);

  // const detectInputType = (text: string) => {
  //   const onlyDigits = text.replace(/\D/g, '');
  //   const looksLikePhone = onlyDigits.length >= 6 && /^[\d+\-\s()]+$/.test(text);
  //   const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);

  //   if (looksLikeEmail) {
  //     setIsPhone(false);
  //   } else if (looksLikePhone) {
  //     setIsPhone(true);
  //   } else {
  //     // Можно не менять isPhone, пока не уверены
  //     setIsPhone(false);
  //   }

  //   setValueEP(text);
  // };
const [isHide, setHide] = useState(true);
    return (
     <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <ImageBackground
        source={require('../../../assets/backgrounds/imageShort.png')}
        style={[s.container]}  >
        <IfgText color={colors.WHITE_COLOR} style={[gs.h1Intro,  {textAlign: 'center', marginTop: 44}]}>
             {forgotPassword ? 'Восстановить пароль' : 'Начните прямо сейчас'}
        </IfgText>
        {forgotPassword ?
        <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption2,  {textAlign: 'center', marginTop: 31, maxWidth: 322}]}>
       После заполнения формы мы отправим специальную ссылку на указанный электронный адрес, перейдя по которой вы сможете задать новый пароль
        </IfgText>
        :
        <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption2,  {textAlign: 'center', marginTop: 32, maxWidth: 322}]}>
            Еще не зарегистрированы? Перейдите на <IfgText color={colors.WHITE_COLOR} onPress={toRegistraition} style={[gs.semiBold, gs.underline]}>страницу регистрации</IfgText> для доступа в личный кабинет платформы
        </IfgText>}
        <View style={gs.mt32}/>
        <View style={s.formCard}>
        <Controller control={control} name={'email'}
            render={({ field: { onChange, onBlur, value } }) => (
                <Input
                onFocus={authStore.clearEmailError}
                fullWidth
                value={value}
                onChange={(event)=>{
                  authStore.clearEmailError();
                  onChange(event);}}
                placeholder="E-mail или телефон"
                keyboardType="email-address"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                error={authStore.loginByUserPassword.loginInputError}
            />
        )}/>
        {/* {isPhone ? (
                <TextInputMask
                  type={'custom'}
                  options={{
                    mask: '+7 (999) 999-99-99',
                  }}
                  value={valueEP}
                  onChangeText={detectInputType}
                  keyboardType="email-address"
                  style={[s.input, gs.fontCaption, {color: colors.BLACK_COLOR}]}
                  placeholder="E-mail или телефон"
                  onFocus={authStore.clearEmailError}
                  placeholderTextColor={colors.PLACEHOLDER_COLOR}
                />
              ) : (
                <TextInput
                  value={valueEP}
                  onChangeText={detectInputType}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={[s.input, gs.fontCaption, {color: colors.BLACK_COLOR}]}
                  placeholder="E-mail или телефон"
                  onFocus={authStore.clearEmailError}
                  placeholderTextColor={colors.PLACEHOLDER_COLOR}
                />
              )} */}
        {!forgotPassword && <Controller control={control} name={'password'}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInputWithIconEye
                onFocus={authStore.clearPasswordError}
                value={value}
                onChange={onChange}
                placeholder="Пароль"
                style={[s.input, gs.fontCaption, {color: colors.BLACK_COLOR}]}
                error={authStore.loginByUserPassword.passwordInputError}
                fullWidth
                onIcon={()=>setHide((prev)=>!prev)}
                secureTextEntry={isHide}
            />
            )}/>}
          {/* {authStore.errorMessage && <IfgText color={colors.RED_COLOR} style={gs.fontCaptionSmallSmall}>
          {authStore.errorMessage || 'Что-то пошло не так'}</IfgText>} */}
            <AnimatedGradientButton style={s.buttonLogin}
                disabled={authStore.isLoading}
                onPress={onSubmit}
                >
                <View style={gs.buttonContent}>
                <View style={gs.buttonContentRow}>
                    <IfgText color={colors.WHITE_COLOR} style={[gs.fontBody1, { fontSize: 21}]}>{forgotPassword ? 'Отправить' : 'Войти'}</IfgText>
                        {authStore.isLoading ? <ActivityIndicator color={colors.WHITE_COLOR}/> : <AnimatedArrow />}
                    </View>
                    <View />
                </View>

            </AnimatedGradientButton>
            {/* <GoogleSignInButton /> */}
            {/* <Button fullWidth style={[s.buttonLogin, {backgroundColor: colors.BLACK_COLOR}]}
                // onPress={}
                >
                    <View style={s.appleButton}>
                        <View style={{bottom: 2}}>
                            <Apple />
                        </View>
                        <IfgText style={[gs.fontBody1, { fontSize: 21, textAlign: 'center'}]}>Войти с Apple</IfgText>
                    </View>
            </Button> */}
            {forgotPassword ?
            <View style={{flexDirection:'row', justifyContent: 'center'}}>
                <IfgText onPress={()=>setForgotPassword((prev)=>!prev)} color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.underline]}>Войти в личный кабинет</IfgText>
            </View>
            :
            <View style={{flexDirection:'row', justifyContent: 'center', gap: 16}}>
                <IfgText onPress={toRegistraition} color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.underline]}>Регистрация</IfgText>
                <IfgText onPress={()=>setForgotPassword((prev)=>!prev)} color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.underline]}>Забыли пароль?</IfgText>
            </View>}
        </View>
    </ImageBackground>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
  });
const s = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        minHeight: height,
        flexDirection:'column',
        alignItems: 'center',
      },
      formCard: {
        borderRadius: 22,
        flexDirection: 'column',
        alignItems: 'center',
        width: isTablet?'60%':'90%',
        backgroundColor: colors.WHITE_COLOR,
        paddingVertical:20,
        paddingHorizontal: 18,
        gap: 18,
      },
      buttonLogin: {
        backgroundColor: colors.GREEN_COLOR,
        borderRadius: 16,
        paddingHorizontal: 24,
        height: 78,
      },
      appleButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf:'center',
        gap: 5,
      },
      input: {
            height: 78,
            justifyContent: 'center',
            borderRadius: 16,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.BORDER_COLOR,
            padding: 24,
            width: '100%',
          },
  });
