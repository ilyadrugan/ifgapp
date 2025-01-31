import { observer } from 'mobx-react';
import React, { FC, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import tariffsStore from '../../../../../store/state/tariffsStore/tariffsStore';
import colors from '../../../../core/colors/colors';
import { IfgText } from '../../../../core/components/text/ifg-text';
import gs from '../../../../core/styles/global';
import { Controller, useForm } from 'react-hook-form';
import { RegisterFormModel } from '../../../../../store/state/authStore/models/models';
import { Input } from '../../../../core/components/input/input';
import authStore from '../../../../../store/state/authStore/authStore';
import { isValidEmail } from '../../../../core/utils/isValidEmail';
import { useNavigation } from '@react-navigation/native';
import { AnimatedGradientButton } from '../../../../core/components/button/button';
import AnimatedArrow from '../../../../core/components/animatedArrow/animatedArrow';

export const SubscribeInputs:
    FC<{
        onNext: ()=> void,
        tarrif_id: number
    }> = observer(({onNext, tarrif_id}) => {
    const navigation = useNavigation<any>();

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<RegisterFormModel>();
    useEffect(() => {
        control._reset();
    }, [control]);

    const onSubmit = handleSubmit(async (data) => {
            console.log(data);
            authStore.clearAllRegisterByPromocodeInputError();
            if (!data.email) {authStore.fillRegisterByPromocodeInputError('email','Заполните поле');}
            else if (!isValidEmail(data.email)){
                authStore.fillRegisterByPromocodeInputError('email','Некорректный Email');
            }
            if (!data.password) {authStore.fillRegisterByPromocodeInputError('password','Заполните поле');}
            if (!data.password_confirmation) {authStore.fillRegisterByPromocodeInputError('password_confirmation','Заполните поле');}
            const password_equal = data.password_confirmation === data.password;
            if (!password_equal) {
                authStore.fillRegisterByPromocodeInputError('password_confirmation','Пароли не совпадают');
            }
            else if (isValidEmail(data.email) && data.email && data.password && data.password_confirmation) {
                const model: RegisterFormModel = {
                    email: data.email,
                    password: data.password,
                    sale: true,
                    tariff_id: tarrif_id,
                };
                console.log(model);
                tariffsStore.setChoosedTariff(tariffsStore.tariffs.find((tariff)=> tariff.id === tarrif_id));
                // navigation.navigate('SubscribeEmailConfirm');
                await authStore.register(model, ()=>navigation.navigate('SubscribeEmailConfirm'));
            }


      });
    return <View style={s.container}>
            <Controller control={control} name={'email'}
                 render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                fullWidth
                value={value}
                onChange={onChange}
                placeholder="Электронная почта"
                keyboardType="email-address"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                error={authStore.registerByPromocode.emailInputError }
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
                error={authStore.registerByPromocode.passwordInputError }
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
                error={authStore.registerByPromocode.password_confirmationInputError }
                onFocus={()=>authStore.clearRegisterByPromocodeInputError('password_confirmation')}

            />
               )}
                />
            {/* <View style={gs.mt16} /> */}
            <AnimatedGradientButton
                disabled={authStore.isLoading}
                style={s.buttonLogin}
                onPress={onSubmit}
                >
                <View style={s.buttonContent}>
                    <View style={s.buttonContentRow}>
                    <IfgText color={colors.WHITE_COLOR} style={gs.fontBodyMedium}>Подписаться</IfgText>
                    {authStore.isLoading ? <ActivityIndicator /> : <AnimatedArrow />}

                    </View>
                    <View />
                </View>

            </AnimatedGradientButton>
    </View>;
});

const s = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection:'column',
        alignItems: 'center',
        gap: 18,
      },
    buttonLogin: {
        backgroundColor: colors.GREEN_COLOR,
        borderRadius: 16,
        paddingHorizontal: 24,
        height: 78,
      },
      buttonContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      buttonContentRow: {
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
  });
