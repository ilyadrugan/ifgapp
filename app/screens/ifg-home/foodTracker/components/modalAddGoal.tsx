import { Modal, StyleSheet, Pressable, TouchableOpacity, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native';
import { CardContainer } from '../../../../core/components/card/cardContainer';
import { Button } from '../../../../core/components/button/button';
import { IfgText } from '../../../../core/components/text/ifg-text';
import colors from '../../../../core/colors/colors';
import gs from '../../../../core/styles/global';
import React, { FC, useEffect, useState } from 'react';
import { InputFlat } from '../../../../core/components/input/input';
import { Controller, useForm } from 'react-hook-form';
import { observer } from 'mobx-react';
import foodStore from '../../../../../store/state/foodStore/foodStore';
import { errorToast } from '../../../../core/components/toast/toast';
import { GoalModel } from '../../../../../store/state/foodStore/models/models';

interface ModalProps {
    modalOpen: boolean,
    setModalOpen: (val: boolean) =>void
}
interface MealType {
    food: string;
    calories: number;
    proteins: number;
    carbohydrates: number;
    amount: number;
    fats: number;
    type: string;
    eat_at: string;
}

interface NutrientsForm {
    calories: string;
    proteins: string;
    carbohydrates: string;
    fats: string;
}

export const ModalAddGoal: FC<ModalProps> = observer(({modalOpen, setModalOpen}) => {
    const {
            control,
            handleSubmit,
            setValue,
            formState: { errors },
          } = useForm<NutrientsForm>();

    const [isLoading, setIsLoading] = useState(false);
    const {haveGoal, myCurrentGoal, createMyFoodGoal} = foodStore;

    useEffect(()=>{
        control._reset();
        if (haveGoal) {
            setValue('calories', myCurrentGoal.calories.goal.toString() + ' кал');
            setValue('proteins', myCurrentGoal.proteins.goal.toString() + ' г');
            setValue('fats', myCurrentGoal.fats.goal.toString() + ' г');
            setValue('carbohydrates', myCurrentGoal.carbohydrates.goal.toString() + ' г');
        }
        else {
            setValue('calories', '2200 кал');
            setValue('proteins', '90 г');
            setValue('fats', '80 г');
            setValue('carbohydrates', '300 г');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const onSubmit = handleSubmit(async (data) => {
        console.log(data);

        if (data.calories && data.proteins && data.fats && data.carbohydrates) {
            const model: GoalModel = {
                calories: Number(data.calories.split(' ')[0]),
                proteins: Number(data.proteins.split(' ')[0]),
                fats: Number(data.fats.split(' ')[0]),
                carbohydrates: Number(data.carbohydrates.split(' ')[0]),
            };
            console.log(model);
            await createMyFoodGoal(model);
            setModalOpen(false);
        }
        else {
            errorToast('Заполните все поля цели');
        }
      });

    return <Modal
            visible={modalOpen}
            transparent
            animationType="fade"
            onRequestClose={()=>setModalOpen(false)}>
                <Pressable style={s.overlay} onPress={()=>setModalOpen(false)}>
                    <TouchableWithoutFeedback>
                    <View style={s.card}>
                        <IfgText style={[gs.fontBody1, gs.bold]}>Задать цель</IfgText>
                        <IfgText color="#747474" style={[gs.fontCaptionSmallMedium, gs.regular, gs.mt4]}>Укажите сколько калорий, белков, жиров и углеводов вы планируете употреблять каждый день, а мы поможем не потеряться в расчётах</IfgText>
                        <View style={gs.mt36} />
                            <Controller control={control} name={'calories'}
                                render={({ field: { onChange, onBlur, value } }) => (
                                <InputFlat
                                    keyboardType="number-pad"
                                    style={gs.flex1}
                                    placeholder="Калории"
                                    value={value}
                                    onChange={onChange}
                                    // tail=" кал"
                                    // maxLength={6}
                                    onFocus={()=>{
                                        if (value)
                                        {setValue('calories', value.split(' ')[0]);}
                                    }}
                                    onBlur={()=>{
                                        if (value)
                                        {setValue('calories', value + ' кал');}
                                    }}
                                />
                            )}/>
                        <View style={gs.mt36} />

                        <View style={[gs.flexRow, {gap: 10}]}>
                            <Controller control={control} name={'proteins'}
                                render={({ field: { onChange, onBlur, value } }) => (
                                <InputFlat
                                    keyboardType="number-pad"
                                    style={gs.flex1}
                                    placeholder="Белков"
                                    value={value}
                                    onChange={onChange}
                                    // maxLength={10}
                                    onFocus={()=>{
                                        if (value)
                                        {setValue('proteins', value.split(' ')[0]);}
                                    }}
                                    onBlur={()=>{
                                        if (value)
                                        {setValue('proteins', value + ' г');}
                                    }}
                                />
                            )}/>
                            <Controller control={control} name={'fats'}
                                render={({ field: { onChange, onBlur, value } }) => (
                                <InputFlat
                                    keyboardType="number-pad"
                                    style={gs.flex1}
                                    placeholder="Жиров"
                                    value={value}
                                    onChange={onChange}
                                    // maxLength={10}
                                    onFocus={()=>{
                                        if (value)
                                        {setValue('fats', value.split(' ')[0]);}
                                    }}
                                    onBlur={()=>{
                                        if (value)
                                        {setValue('fats', value + ' г');}
                                    }}
                                />
                            )}/>
                            <Controller control={control} name={'carbohydrates'}
                                render={({ field: { onChange, onBlur, value } }) => (
                                <InputFlat
                                    keyboardType="number-pad"
                                    style={gs.flex1}
                                    placeholder="Углеводов"
                                    value={value}
                                    onChange={onChange}
                                    // maxLength={4}
                                    onFocus={()=>{
                                        if (value)
                                        {setValue('carbohydrates', value.split(' ')[0]);}
                                    }}
                                    onBlur={()=>{
                                        if (value)
                                        {setValue('carbohydrates', value + ' г');}
                                    }}
                                />
                            )}/>
                        </View>
                        <View style={gs.mt12} />
                        <Button disabled={isLoading} onPress={onSubmit} style={s.addGoalButton}>
                               {isLoading ? <ActivityIndicator /> : <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption, gs.medium]}>{'Сохранить'}</IfgText>}
                        </Button>
                    </View>
                    </TouchableWithoutFeedback>
                    </Pressable>
    </Modal>;
});

const s = StyleSheet.create({
     overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    addGoalButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        height: 60,
        backgroundColor: colors.GREEN_COLOR,
    },
    card: {
        width: '100%',
        backgroundColor: colors.WHITE_COLOR,
        borderRadius: 24,
        padding: 16,
        maxHeight: 312,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 50,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#FAFAFA',
    },
});
