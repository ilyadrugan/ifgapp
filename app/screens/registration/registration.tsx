import { ActivityIndicator, Dimensions, ImageBackground, Keyboard, KeyboardAvoidingView, Linking, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import colors from '../../core/colors/colors';
import { Input } from '../../core/components/input/input';
import { AnimatedGradientButton, Button } from '../../core/components/button/button';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import Apple from '../../../assets/icons/apple.svg';
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from '../../core/components/checkbox/checkbox';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { TabInterface, Tabs } from './components/tabs';
import { SubscribeReg } from './components/subscribeReg/subscribeReg';
import { API_URL } from '../../core/hosts';
import { maskDateChange } from '../../core/utils/textFormatters';
import { Controller, useForm } from 'react-hook-form';
import { RegisterFormModel, RegisterFormState } from '../../../store/state/authStore/models/models';
import authStore from '../../../store/state/authStore/authStore';
import AnimatedArrow from '../../core/components/animatedArrow/animatedArrow';
import {isValidEmail} from '../../core/utils/isValidEmail';
import { observer } from 'mobx-react';
import { isValidPhoneNumber } from '../../core/utils/isValidPhoneNumber';
const height = Dimensions.get('screen').height;
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
export const Registration = observer(() => {
    const [personalChecked, setPersonalChecked] = useState(true);
    const [infoChecked, setInfoChecked] = useState(true);
    const [activeTab, setActiveTab] = useState(2);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phone, setPhone] = useState('');
    const navigation = useNavigation<any>();
    const scrollViewRef = useRef(null);

    const scrollToBottom = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: false });
      }
    };
    const toLogin = () => {
        authStore.clearMessageError();
        navigation.replace('Login');
    };
    const onChecked = (type: string) => {
        switch (type) {
            case 'personal': setPersonalChecked((prev)=> !prev);
                break;
            case 'info': setInfoChecked((prev)=> !prev);
                break;
        }
    };
    const onTabClick = (id: number) => {
        authStore.clearAllRegisterByNumDocInputError();
        authStore.clearAllRegisterByPromocodeInputError();
        setActiveTab(id);
    };
    useEffect(() => {
        onTabClick(2);
        scrollToBottom();
    }, []);

    const maskDateChange = (text) => {
        // Удаляем все символы, кроме цифр
        const numericText = text.replace(/[^0-9]/g, '');

        // Форматируем дату в ДД.ММ.ГГГГ
        let formattedText = numericText;
        if (numericText.length > 2) {
          formattedText = `${numericText.slice(0, 2)}.${numericText.slice(2)}`;
        }
        if (numericText.length > 4) {
          formattedText = `${numericText.slice(0, 2)}.${numericText.slice(2, 4)}.${numericText.slice(4)}`;
        }

        // Ограничиваем длину ввода (ДД.ММ.ГГГГ = 10 символов)
        if (formattedText.length > 10) {
          formattedText = formattedText.slice(0, 10);
        }

        setDateOfBirth(formattedText);
      };

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
      } = useForm<RegisterFormModel>();

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        if (activeTab === 1) {
            authStore.clearAllRegisterByPromocodeInputError();
            if (!data.last_name) {authStore.fillRegisterByPromocodeInputError('last_name','Заполните поле');}
            if (!data.name) {authStore.fillRegisterByPromocodeInputError('name','Заполните поле');}
            if (!phone) {authStore.fillRegisterByPromocodeInputError('phone','Заполните поле');}
            else if (!isValidPhoneNumber(phone)){
                authStore.fillRegisterByPromocodeInputError('phone','Неверный формат номера телефона');
            }if (!data.email) {authStore.fillRegisterByPromocodeInputError('email','Заполните поле');}
            else if (!isValidEmail(data.email)){
                authStore.fillRegisterByPromocodeInputError('email','Некорректный Email');
            }
            if (!data.password) {authStore.fillRegisterByPromocodeInputError('password','Заполните поле');}
            if (!data.password_confirmation) {authStore.fillRegisterByPromocodeInputError('password_confirmation','Заполните поле');}
            if (!data.promocode) {authStore.fillRegisterByPromocodeInputError('promocode','Заполните поле');}
            const password_equal = data.password_confirmation === data.password;
            if (!password_equal) {
                authStore.fillRegisterByPromocodeInputError('password_confirmation','Пароли не совпадают');
            }
            else if (isValidEmail(data.email) && data.last_name && data.name && isValidPhoneNumber(phone) && data.email && data.password && data.password_confirmation && data.promocode) {
                const model: RegisterFormModel = {
                    email: data.email,
                    password: data.password,
                    promocode: data.promocode,
                    phone: phone,
                    name: data.name,
                    last_name: data.last_name,
                };
                console.log(model);
                if (!personalChecked || !infoChecked) {return;}
                await authStore.register(model, ()=>navigation.navigate('SuccessfulReg'));
            }
        }
        else if (activeTab === 0) {
            console.log(data);
            authStore.clearAllRegisterByNumDocInputError();
            if (!dateOfBirth) {authStore.fillRegisterByNumDocInputError('birthday','Заполните поле');}
            if (!data.email) {authStore.fillRegisterByNumDocInputError('email','Заполните поле');}
            else if (!isValidEmail(data.email)){
                authStore.fillRegisterByNumDocInputError('email','Некорректный Email');
            }
            if (!data.password) {authStore.fillRegisterByNumDocInputError('password','Заполните поле');}
            if (!data.password_confirmation) {authStore.fillRegisterByNumDocInputError('password_confirmation','Заполните поле');}
            if (!data.num_doc) {authStore.fillRegisterByNumDocInputError('num_doc','Заполните поле');}
            const password_equal = data.password_confirmation === data.password;
            if (!password_equal) {
                authStore.fillRegisterByNumDocInputError('password_confirmation','Пароли не совпадают');
            }
            else if (isValidEmail(data.email) && dateOfBirth && data.email && data.password && data.password_confirmation && data.num_doc) {
                const model: RegisterFormModel = {
                    birthday: dateOfBirth,
                    email: data.email,
                    password: data.password,
                    num_doc: data.num_doc,
                };
                console.log(model);
                if (!personalChecked || !infoChecked) {return;}
                await authStore.register(model, ()=>navigation.navigate('SuccessfulReg'));
            }
        }
      });
      return (  <>
     <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={gs.flex1}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView ref={scrollViewRef}>
    <ImageBackground
        source={require('../../../assets/backgrounds/imageLong.png')}
        style={s.container}>
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
            {activeTab === 0 && <>
                <Controller control={control} name={'num_doc'}
                 render={({ field: { onChange, onBlur, value } }) => (
                <Input
                fullWidth
                keyboardType="numeric"
                value={value}
                onChange={onChange}
                placeholder="Номер договора"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                onFocus={()=>authStore.clearRegisterByNumDocInputError('num_doc')}
                error={authStore.registerByNumDoc.num_docInputError}
            />
        )}/>
                <Input
                    maxLength={10}
                    fullWidth
                    value={dateOfBirth}
                    onChange={maskDateChange}
                    placeholder="Дата рождения"
                    style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                    error={authStore.registerByNumDoc.birthdayInputError}
                    onFocus={()=>authStore.clearRegisterByPromocodeInputError('birthday')}
                />

            </>}
            {activeTab === 1 && <>
                <Controller control={control} name={'last_name'}
                 render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                    value={value}
                    onChange={onChange}
                    fullWidth
                    placeholder="Фамилия"
                    style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                    onFocus={()=>authStore.clearRegisterByPromocodeInputError('last_name')}
                    error={authStore.registerByPromocode.last_nameInputError}
                />)}
                />

                <Controller control={control} name={'name'}
                 render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                    value={value}
                    onChange={onChange}
                    fullWidth
                    placeholder="Имя"
                    style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                    onFocus={()=>authStore.clearRegisterByPromocodeInputError('name')}
                    error={authStore.registerByPromocode.nameInputError}
                />)}
                />
            </>
            }

            {activeTab === 1 &&

             <Input
                fullWidth
                value={phone}
                onChange={handlePhoneChange}
                placeholder="Телефон"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                error={authStore.registerByPromocode.phoneInputError}
                onFocus={()=>authStore.clearRegisterByPromocodeInputError('phone')}

            />
            }
            <Controller control={control} name={'email'}
                 render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                fullWidth
                value={value}
                onChange={onChange}
                placeholder="Электронная почта"
                keyboardType="email-address"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                error={activeTab === 0 ? authStore.registerByNumDoc.emailInputError : authStore.registerByPromocode.emailInputError }
                onFocus={()=>authStore.clearRegisterByPromocodeInputError('email')}
            />
               )}
                />
            <Controller control={control} name={'password'}
                 render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                fullWidth
                value={value}
                onChange={onChange}
                placeholder="Пароль"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                secureTextEntry={true}
                error={activeTab === 0 ? authStore.registerByNumDoc.passwordInputError : authStore.registerByPromocode.passwordInputError }
                onFocus={()=>authStore.clearRegisterByPromocodeInputError('password')}

            />
               )}
                />
            <Controller control={control} name={'password_confirmation'}
                 render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                fullWidth
                value={value}
                onChange={onChange}
                placeholder="Повторите пароль"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                secureTextEntry={true}
                error={activeTab === 0 ? authStore.registerByNumDoc.password_confirmationInputError : authStore.registerByPromocode.password_confirmationInputError }
                onFocus={()=>authStore.clearRegisterByPromocodeInputError('password_confirmation')}

            />
               )}
                />
            {activeTab === 1 &&
                <Controller control={control} name={'promocode'}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                       fullWidth
                       value={value}
                       onChange={onChange}
                       placeholder="Промокод"
                       style={[gs.fontCaption, s.promocodeForm]}
                       error={authStore.registerByPromocode.promocodeInputError}
                       onFocus={()=>authStore.clearRegisterByPromocodeInputError('promocode')}
                       />
                )}
                />
            }
            <View style={s.acceptContainer}>
                <View style={s.acceptsBlock}>
                    <CheckBox onPress={()=>onChecked('personal')} checked={personalChecked}/>
                    <IfgText color={colors.SECONDARY_COLOR} style={[gs.ml12, gs.fontCaption2]}>
                    Согласие на обработку <IfgText onPress={()=> Linking.openURL('https://ifeelgood.life/Согласие_на_обработку_персональных_данных.pdf')} color={colors.GREEN_COLOR} style={[gs.underline,gs.fontCaption2, gs.bold]}>персональных данных</IfgText>
                    </IfgText>
                </View>
                {!personalChecked &&
                <IfgText color={colors.RED_COLOR} style={gs.fontCaptionSmallSmall}>
                {'Вы должны дать согласие на обработку персональных данных'}</IfgText>}
            </View>
            <View style={s.acceptContainer}>
                <View style={s.acceptsBlock}>
                    <CheckBox  onPress={()=>onChecked('info')} checked={infoChecked}/>
                    <IfgText color={colors.SECONDARY_COLOR} style={[gs.ml12, gs.fontCaption2]}>
                    Согласен на информационную рассылку
                    </IfgText>
                </View>
                {!infoChecked &&
                <IfgText color={colors.RED_COLOR} style={gs.fontCaptionSmallSmall}>
                {'Вы должны согласится на информационную рассылку'}</IfgText>}
            </View>
            <AnimatedGradientButton style={s.buttonLogin}
                disabled={authStore.isLoading}
                // onPress={()=>navigation.replace('SuccessfulReg')}
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
                    <IfgText color={colors.WHITE_COLOR} style={[gs.fontBody1, { fontSize: 21}]}>Зарегистрироваться</IfgText>
                    {authStore.isLoading ? <ActivityIndicator /> : <AnimatedArrow />}

                    </View>
                    <View />
                </View>

            </AnimatedGradientButton>
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
        // width: '100%',
        alignItems: 'center',
      },
      acceptContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%',
      },

  });
