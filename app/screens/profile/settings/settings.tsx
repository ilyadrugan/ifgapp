import { CardContainer } from '../../../core/components/card/cardContainer';
import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import colors from '../../../core/colors/colors';
import { Input } from '../../../core/components/input/input';
import { AnimatedGradientButton, Button } from '../../../core/components/button/button';
import ArrowRight from '../../../../assets/icons/arrow-right.svg';
import { Controller, useForm } from 'react-hook-form';
import userStore from '../../../../store/state/userStore/userStore';
import { UserChangeInfoModel } from '../../../../store/state/userStore/models/models';
import { observer } from 'mobx-react';
import authStore from '../../../../store/state/authStore/authStore';
import { useNavigation } from '@react-navigation/native';
import AnimatedArrow from '../../../core/components/animatedArrow/animatedArrow';

export const Settings: FC<{onRefresh: ()=>void}> = observer(({onRefresh}) =>{
    const [phone, setPhone] = useState('');
    const navigation = useNavigation<any>();
    const [onDeleting, setOnDeleting] = useState(false);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm<UserChangeInfoModel>();
    //   const handlePhoneChange = (text) => {
    //     const cleaned = text.replace(/\D/g, '');

    //     let formatted = cleaned;

    //     if (cleaned.length > 0) {
    //       formatted = `+${cleaned.slice(0, 1)}`;
    //     }
    //     if (cleaned.length > 1) {
    //       formatted += ` (${cleaned.slice(1, 4)}`;
    //     }
    //     if (cleaned.length > 4) {
    //       formatted += `) ${cleaned.slice(4, 7)}`;
    //     }
    //     if (cleaned.length > 7) {
    //       formatted += `-${cleaned.slice(7, 9)}`;
    //     }
    //     if (cleaned.length > 9) {
    //       formatted += `-${cleaned.slice(9, 11)}`;
    //     }

    //     setPhone(formatted);
    //   };
    useEffect(() => {
    //  handlePhoneChange(userStore.userInfo?.phone || '');
     setValue('email', userStore.userInfo?.email || '');
     setValue('phone', userStore.userInfo?.phone || '');
     setValue('name', userStore.userInfo?.name || '');
     setValue('last_name', userStore.userInfo?.last_name || '');
    }, []);
    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
            if (!data.last_name) {userStore.fillChangeInputError('last_name','Заполните поле');}
            if (!data.name) {userStore.fillChangeInputError('name','Заполните поле');}
            if (!data.phone) {userStore.fillChangeInputError('phone','Заполните поле');}
            if (!data.email) {userStore.fillChangeInputError('email','Заполните поле');}
            // const password_equal = data.password_confirmation === data.password
            // if (!password_equal) {
            //     authStore.fillRegisterByPromocodeInputError('password_confirmation','Пароли не совпадают');
            // }
            else if (data.last_name && data.name && data.phone && data.email) {
                const model: UserChangeInfoModel = {
                    ...data,
                    // phone: phone.replace(/[^0-9]/g, ''),
                };
                console.log('model', model);
                userStore.changeProfile(model);
                onRefresh();
            }
      });
      const onDelete = () => {
        if (onDeleting) {
            authStore.delete(()=>navigation.replace('Login'));
        }
        else {
            setOnDeleting((prev)=>!prev);
        }
      };
    return <>
    {!onDeleting && <CardContainer style={{gap: 18}}>
        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>
        Личные данные
        </IfgText>
        <Controller control={control} name={'last_name'}
            render={({ field: { onChange, onBlur, value } }) => (
                <Input
                fullWidth
                placeholder="Фамилия"
                defaultValue={userStore.userInfo?.last_name}
                value={value}
                onChange={onChange}
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                error={userStore.userChangeInfoState.last_nameInputError}
            />
        )}/>

        <Controller control={control} name={'name'}
            render={({ field: { onChange, onBlur, value } }) => (
                <Input
                fullWidth
                placeholder="Имя"
                defaultValue={userStore.userInfo?.name}
                value={value}
                onChange={onChange}
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                error={userStore.userChangeInfoState.nameInputError}
            />
        )}/>
        {/* <Input
                fullWidth
                placeholder="Дата рождения"
                keyboardType="numeric"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
            /> */}
        <Controller control={control} name={'phone'}
            render={({ field: { onChange, onBlur, value } }) => (
                <Input
                fullWidth
                placeholder="Телефон"
                defaultValue={userStore.userInfo?.phone}
                value={value}
                onChange={onChange}
                keyboardType="phone-pad"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                error={userStore.userChangeInfoState.phoneInputError}
            />
        )}/>
        {/* <Input
                fullWidth
                defaultValue={userStore.userInfo?.phone}
                value={phone}
                onChange={handlePhoneChange}
                placeholder="Телефон"
                keyboardType="phone-pad"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                error={userStore.userChangeInfoState.phoneInputError}
            /> */}
        <Input
                fullWidth
                placeholder="Электронная почта"
                keyboardType="email-address"
                value={userStore.userInfo?.email}
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
            />
        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>
        Сменить пароль
        </IfgText>

            <Input
                fullWidth
                placeholder="Старый пароль"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                secureTextEntry={true}
            />
            <Input
                fullWidth
                placeholder="Новый пароль"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                secureTextEntry={true}
            />
            <Input
                fullWidth
                placeholder="Повторите пароль"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
                secureTextEntry={true}
            />
            <AnimatedGradientButton style={s.button}
                disabled={userStore.isLoading}
                onPress={onSubmit}
                >
                 <View style={s.buttonContainer}>
                 <View style={s.buttonContent}>
                    <IfgText color={colors.WHITE_COLOR} style={[gs.fontBody1, { fontSize: 21}]}>Сохранить</IfgText>
                        {userStore.isLoading ? <ActivityIndicator /> : <AnimatedArrow />}
                    </View>
                    <View />
                </View>

            </AnimatedGradientButton>
    </CardContainer>}

    {!onDeleting && <CardContainer style={gs.mt16}>
        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>Удаление профиля</IfgText>
        <Button style={[s.button, {backgroundColor: '#FA5D5D'}]}
                onPress={onDelete}
                >
                <View style={s.buttonContainer}>
                    <View style={s.buttonContent}>
                    <IfgText color={colors.WHITE_COLOR} style={[gs.fontBody1, { fontSize: 21}]}>Удалить свой профиль?</IfgText>
                    <ArrowRight />
                    </View>
                    <View />
                </View>

            </Button>
    </CardContainer>}
    {onDeleting && <CardContainer>
        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>Вы уверены что готовы удалить свой профиль?</IfgText>
        <View style={[gs.mt8, gs.flexRow, gs.alignCenter, {gap: 18}]}>
            <Button onPress={onDelete} style={{alignItems: 'center',backgroundColor: '#FA5D5D', borderRadius: 16, height: 78, flex: 1}} >
              <IfgText style={gs.fontCaptionMedium} color={colors.WHITE_COLOR}>Да</IfgText>
            </Button>
            <Button onPress={()=>setOnDeleting((prev)=>!prev)} style={{alignItems: 'center',backgroundColor: colors.GREEN_COLOR, borderRadius: 16,  flex: 1, height:78}}>
              <IfgText color={colors.WHITE_COLOR} style={gs.fontCaptionMedium}>Нет</IfgText>
            </Button>
          </View>
    </CardContainer>}

    </>;
});

const s = StyleSheet.create({
    dateContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.GREEN_COLOR,
        height: 24,
        borderRadius: 6,
        paddingHorizontal: 8.5,
    },
    timeContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
        height: 22,
        borderRadius: 6,
        paddingHorizontal: 6,
        gap: 4,
    },
    button: {
        backgroundColor: colors.GREEN_COLOR,
        borderRadius: 16,
        paddingHorizontal: 24,
        height: 78,
      },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    buttonContent: {
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
  });
