import { ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import colors from '../../core/colors/colors';
import { Input } from '../../core/components/input/input';
import { Button } from '../../core/components/button/button';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import Apple from '../../../assets/icons/apple.svg';
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from '../../core/components/checkbox/checkbox';
import { useEffect, useState } from 'react';
import React from 'react';
import { TabInterface, Tabs } from './components/tabs';
import { SubscribeReg } from './components/subscribeReg/subscribeReg';
const tabss: TabInterface[] = [
    {
        id: 0,
        name: 'По договору',
    },
    {
        id: 1,
        name: 'По промокоду',
    },
    {
        id: 2,
        name: 'По подписке',
    },
];
export const Registration = () => {
    const [personalChecked, setPersonalChecked] = useState(true);
    const [infoChecked, setInfoChecked] = useState(false);
    const [activeTab, setActiveTab] = useState(1);

    const navigation = useNavigation<any>();

    const toLogin = () => navigation.replace('Login');
    const onChecked = (type: string) => {
        switch (type) {
            case 'personal': setPersonalChecked(!personalChecked);
                break;
            case 'info': setInfoChecked(!infoChecked);
                break;
        }
    };
    const onTabClick = (id: number) => {

        setActiveTab(id);
    };
    useEffect(() => {
        onTabClick(1);
    }, []);


    return (  <>
     <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={gs.flex1}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView>
    <ImageBackground
        source={require('../../../assets/backgrounds/imageLong.png')}
        style={[s.container]}>
        <IfgText color={colors.WHITE_COLOR} style={[gs.h1Intro,  {textAlign: 'center', marginTop: 44}]}>
              Регистрация
        </IfgText>
        <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption2,  {textAlign: 'center', marginTop: 32, maxWidth: 322}]}>
            Зарегистрируйтесь, чтобы сохранить результаты тестирования и начать следовать рекомендациям!
        </IfgText>
        <View style={gs.mt32}/>
        <Tabs activeTab={activeTab} onTabClicked={onTabClick} tabs={tabss} />
        <View style={gs.mt32}/>
       {(activeTab === 1 || activeTab === 0) &&
       <View style={s.formCard}>
            {activeTab === 0 && <Input
                fullWidth
                placeholder="Номер договора"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
            />}
            {activeTab === 1 && <><Input
                fullWidth
                placeholder="Фамилия"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
            />
            <Input
                fullWidth
                placeholder="Имя"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
            />
            </>
            }
            <Input
                fullWidth
                placeholder="Дата рождения"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
            />
            {activeTab === 1 && <Input
                fullWidth
                placeholder="Телефон"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
            />}
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
            <Input
                fullWidth
                placeholder="Повторите пароль"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                secureTextEntry={true}
            />
            {activeTab === 1 && <Input
                fullWidth
                placeholder="Промокод"
                style={[gs.fontCaption, s.promocodeForm]}
            />}
            <View style={s.acceptsBlock}>
                <CheckBox onPress={()=>onChecked('personal')} checked={personalChecked}/>
                <IfgText color={colors.SECONDARY_COLOR} style={[gs.ml12, gs.fontCaption2]}>
                Согласие на обработку <IfgText color={colors.GREEN_COLOR} style={[gs.underline,gs.fontCaption2, gs.bold]}>персональных данных</IfgText>
                </IfgText>
            </View>
            <View style={[s.acceptsBlock]}>
                <CheckBox  onPress={()=>onChecked('info')} checked={infoChecked}/>
                <IfgText color={colors.SECONDARY_COLOR} style={[gs.ml12, gs.fontCaption2]}>
                Согласен на информационную рассылку
                </IfgText>
            </View>
            <Button style={s.buttonLogin}
                onPress={()=>navigation.replace('SuccessfulReg')}
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
                    <IfgText color={colors.WHITE_COLOR} style={[gs.fontBody1, { fontSize: 21}]}>Зарегистрироваться</IfgText>
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
                        <IfgText color={colors.WHITE_COLOR} style={[gs.fontBody1, { fontSize: 21, textAlign: 'center'}]}>Войти с Apple</IfgText>
                    </View>
            </Button> */}

            <View style={{flexDirection:'column', alignItems: 'center' }}>
                <IfgText color={colors.PLACEHOLDER_COLOR} style={gs.fontCaption2}>Уже зарегистрированы?</IfgText>
                <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, {textAlign: 'center'}]}>
                Перейдите на <IfgText onPress={toLogin} color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.underline]}>страницу входа</IfgText> в личный кабинет
                </IfgText>
            </View>
        </View>}
        {activeTab === 2 &&
       <View style={[s.formCard, {backgroundColor: colors.WHITE_DIRTY_COLOR}]}>
            <SubscribeReg />
        </View>}
        </ImageBackground>

        </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </>
    );
  };
const s = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        // height: '100%',
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
        marginBottom: 56,
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
      promocodeForm: {
        color: colors.BLACK_COLOR,
        backgroundColor: colors.GREEN_LIGHT_LIGHT_GREEN,
        borderColor: colors.GREEN_LIGHT_COLOR,
        borderStyle: 'dashed',
      },
      acceptsBlock: {
        flexDirection :'row',
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'center',
      },

  });
