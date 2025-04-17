import React, { FC } from 'react';
import { CardContainer } from '../../../core/components/card/cardContainer';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import { StyleSheet, Image, View } from 'react-native';
import colors from '../../../core/colors/colors';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../../../core/components/input/input';
import { ButtonNext } from '../../../core/components/button/button';
import { errorToast } from '../../../core/components/toast/toast';
import presentsStore from '../../../../store/state/presentsStore/presentsStore';
import { observer } from 'mobx-react';

export const FeedBack: FC<{present_id?: number, event_id?: number}> = observer(({present_id, event_id}) => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm<{feedback: string}>();
    const onSubmit = handleSubmit(async (data) => {
        console.log(data.feedback.trim().length);
        if (data.feedback.trim().length < 3) {
            errorToast('Слишком короткий отзыв');
        }
        else {
            await presentsStore.sendSuggestion(present_id?{
                message: data.feedback.trim(),
                present_id: present_id,
            }:{
                message: data.feedback.trim(),
                event_id: event_id
            });
        }
      });
    return <CardContainer style={s.card}>
    <View style={{padding:16, gap: 12}}>
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
        <ButtonNext isLoading={presentsStore.isLoadingSuggestion} onPress={onSubmit} textStyle={[gs.fontBodyMedium]} style={{height: 78}} title={'Оставить отзыв'} />
    </View>
    <Image
        resizeMode="contain"
        style={{width: 'auto', height: 190 }}
        source={{uri: 'https://ifeelgood.life/storage/library/9omV1lkJ7B7fPdbe0.14%D0%9C%D0%B1/full/45RDvQ5NWPCGAosD.png'}}
    />
</CardContainer>;
});

const s = StyleSheet.create({
    card: {
        backgroundColor: colors.BLUE_COLOR,
        overflow: 'hidden',
        padding: 0,
    },
});
