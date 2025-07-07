import { Modal, StyleSheet, Pressable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { CardContainer } from '../../../../core/components/card/cardContainer';
import { Button } from '../../../../core/components/button/button';
import { IfgText } from '../../../../core/components/text/ifg-text';
import colors from '../../../../core/colors/colors';
import gs from '../../../../core/styles/global';
import React, { FC, useEffect } from 'react';
import { InputFlat } from '../../../../core/components/input/input';
import { Controller, useForm } from 'react-hook-form';

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

export const ModalAddGoal: FC<ModalProps> = ({modalOpen, setModalOpen}) => {
    const {
            control,
            handleSubmit,
            setValue,
            formState: { errors },
          } = useForm<NutrientsForm>();

    useEffect(()=>{
        control._reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
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
                        <Button onPress={()=>setModalOpen(false)} style={s.addGoalButton}>
                                <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption, gs.medium]}>{'Сохранить'}</IfgText>
                        </Button>
                    </View>
                    </TouchableWithoutFeedback>
                    </Pressable>
    </Modal>;
};

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
