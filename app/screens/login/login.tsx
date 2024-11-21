import { ImageBackground, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import colors from '../../core/colors/colors';
import { Input } from '../../core/components/input/input';
import { Button } from '../../core/components/button/button';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

export const Login = () => {
    const navigation = useNavigation<any>();
    const toRegistraition = () => navigation.replace('Registration');
    return (  <>
     {/* <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}> */}
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
            <Input
                fullWidth
                placeholder="Электронная почта"
                keyboardType="email-address"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
            />
            <Input
                fullWidth
                placeholder="Пароль"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                secureTextEntry={true}
            />
            <Button style={s.buttonLogin}
                onPress={()=>navigation.replace('Main')}
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
    {/* </KeyboardAvoidingView> */}
    </>
    );
  };
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
