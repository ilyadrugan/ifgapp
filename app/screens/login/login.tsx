import { ImageBackground, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import colors from '../../core/colors/colors';
import { Input } from '../../core/components/input/input';
import { Button } from '../../core/components/button/button';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import authStore from '../../../store/state/authStore/authStore';
import { LoginByUserPasswordModel } from '../../../store/state/authStore/models/models';
import { observer } from 'mobx-react';

export const Login = observer(() => {
    const navigation = useNavigation<any>();
    const toRegistraition = () => navigation.replace('Registration');

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
        if (!data.password) {authStore.fillPasswordError('Заполните поле');}
        if (data.email && data.password) {authStore.login(data, ()=>navigation.replace('Main'));}
      });

      const clearLogin = () => {
        setValue('email', '');
      };

      const clearPassword = () => {
        setValue('password', '');
      };

    return (
     <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <ImageBackground
        source={require('../../../assets/backgrounds/imageShort.png')}
        style={[s.container]}  >
        <IfgText color={colors.WHITE_COLOR} style={[gs.h1Intro,  {textAlign: 'center', marginTop: 44}]}>
              Начните прямо сейчас
        </IfgText>
        <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption2,  {textAlign: 'center', marginTop: 32, maxWidth: 322}]}>
            Еще не зарегистрированы? Перейдите на <IfgText color={colors.WHITE_COLOR} onPress={toRegistraition} style={[gs.semiBold, gs.underline]}>страницу регистрации</IfgText> для доступа в личный кабинет платформы
        </IfgText>
        <View style={gs.mt32}/>
        <View style={s.formCard}>
        <Controller control={control} name={'email'}
            render={({ field: { onChange, onBlur, value } }) => (
                <Input
                onFocus={authStore.clearEmailError}
                fullWidth
                value={value}
                onChange={onChange}
                placeholder="Электронная почта"
                keyboardType="email-address"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                error={authStore.loginByUserPassword.loginInputError}
            />
        )}/>
        <Controller control={control} name={'password'}
            render={({ field: { onChange, onBlur, value } }) => (
            <Input
                onFocus={authStore.clearPasswordError}
                fullWidth
                value={value}
                onChange={onChange}
                placeholder="Пароль"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                secureTextEntry={true}
                error={authStore.loginByUserPassword.passwordInputError}
            />
            )}/>
          {authStore.errorMessage && <IfgText color={colors.RED_COLOR} style={gs.fontCaptionSmallSmall}>
          {authStore.errorMessage || 'Что-то пошло не так'}</IfgText>}
            <Button style={s.buttonLogin}
            disabled={authStore.isLoading}
                onPress={onSubmit}
                >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    }}>
                    <View style={{
                        width:'100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <IfgText color={colors.WHITE_COLOR} style={[gs.fontBody1, { fontSize: 21}]}>Войти</IfgText>
                        <ArrowRight />
                    </View>
                    <View />
                </View>

            </Button>
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
            <View style={{flexDirection:'row', justifyContent: 'center', gap: 16}}>
                <IfgText onPress={toRegistraition} color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.underline]}>Регистрация</IfgText>
                <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.underline]}>Забыли пароль?</IfgText>
            </View>
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
        height: '100%',
        flexDirection:'column',
        alignItems: 'center',
      },
      formCard: {
        borderRadius: 22,
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
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
  });
