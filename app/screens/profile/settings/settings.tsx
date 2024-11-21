import { CardContainer } from '../../../core/components/card/cardContainer';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import colors from '../../../core/colors/colors';
import { Input } from '../../../core/components/input/input';
import { Button } from '../../../core/components/button/button';
import ArrowRight from '../../../../assets/icons/arrow-right.svg';

export const Settings: FC = () =>{
    return <CardContainer style={{gap: 18}}>
        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>
        Личные данные
        </IfgText>
        <Input
                fullWidth
                placeholder="Фамилия"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
            />
        <Input
                fullWidth
                placeholder="Имя"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
            />
        <Input
                fullWidth
                placeholder="Дата рождения"
                keyboardType="numeric"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
            />
        <Input
                fullWidth
                placeholder="Телефон"
                keyboardType="phone-pad"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR}]}
            />
        <Input
                fullWidth
                placeholder="Электронная почта"
                keyboardType="email-address"
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
            <Button style={s.button}
                // onPress={()=>navigation.replace('Main')}
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
                    <IfgText color={colors.WHITE_COLOR} style={[gs.fontBody1, { fontSize: 21}]}>Сохранить</IfgText>
                        <ArrowRight />
                    </View>
                    <View />
                </View>

            </Button>
    </CardContainer>;
};

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

  });
