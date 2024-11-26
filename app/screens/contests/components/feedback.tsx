import React from 'react';
import { CardContainer } from '../../../core/components/card/cardContainer';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import { StyleSheet, Image } from 'react-native';
import colors from '../../../core/colors/colors';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../../../core/components/input/input';
import { ButtonNext } from '../../../core/components/button/button';

export const FeedBack = () => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm<{feedback: string}>();
    return <CardContainer style={s.card}>
        <IfgText style={[gs.fontCaption, gs.bold]}>Написать лайфхак</IfgText>
        <IfgText style={gs.fontCaption2}>Вы знаете, как сделать наш портал лучше? Мы открыты для советов и честных отзывов, напишите, что мы можем изменить и улучшить в проекте!</IfgText>
        <Controller control={control} name={'feedback'}
            render={({ field: { onChange, onBlur, value } }) => (
                <Input
                fullWidth
                value={value}
                onChange={onChange}
                placeholder="Ваше сообщение"
                style={[gs.fontCaption, {color: colors.BLACK_COLOR, backgroundColor: colors.WHITE_COLOR}]}
                // error={authStore.loginByUserPassword.loginInputError}
            />
        )}/>
        <ButtonNext textStyle={[gs.fontBodyMedium]} style={{height: 78}} title={'Оставить отзыв'} />
        <Image
            resizeMode="cover"
            style={{width: 'auto', height: 180, right: -16}}
            source={require('../../../../assets/backgrounds/feedback.png')}
        />
    </CardContainer>;
};

const s = StyleSheet.create({
    card: {
        backgroundColor: colors.BLUE_COLOR,
        overflow: 'hidden',
        paddingBottom: 0,
        borderBottomRightRadius: 0,
    },
});
