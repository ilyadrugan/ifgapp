import React, { FC, useEffect, useMemo, useState } from 'react';
import { CardContainer } from '../../../core/components/card/cardContainer';
import colors from '../../../core/colors/colors';
import { ArticleHeader } from '../components/articleHeader';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import { FlatList, Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { RingFoodComponent } from './components/ringFood';
import { Button, ButtonNext } from '../../../core/components/button/button';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { RingFoodComponent } from './components/RingFood';
import ArrowBack from '../../../../assets/icons/arrow-back.svg';
import PlusWhite from '../../../../assets/icons/plus-white.svg';
import EditIcon from '../../../../assets/icons/edit.svg';
import DeleteIcon from '../../../../assets/icons/trash.svg';
import Left from '../../../../assets/icons/left.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ModalAddGoal } from './components/modalAddGoal';
import { Controller, useForm } from 'react-hook-form';
import { DropdownInput, InputFlat } from '../../../core/components/input/input';
import DateTimePicker from '@react-native-community/datetimepicker';
import foodStore from '../../../../store/state/foodStore/foodStore';
import { observer } from 'mobx-react';
import { createMealApi } from '../../../../store/state/foodStore/foodStore.api';
import { FoodMealModel, FoodModel } from '../../../../store/state/foodStore/models/models';
import { errorToast, successToast } from '../../../core/components/toast/toast';
import { formatDateToYYYYMMDD, formatTimeWithMoment } from '../../../core/utils/formatDateTime';
import { convertMealTypeToENG, convertMealTypeToRu } from './utils/utils';

interface MealType {
    food: string;
    calories: string;
    proteins: string;
    carbohydrates: string;
    amount: string;
    fats: string;
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'Завтрак' | 'Обед' | 'Ужин' | 'Перекус';
    eat_at: string;
}


export const FoodTrackerAddEditScreen: FC = observer(() => {
    const [showResults, setShowResults] = useState(false);
    const [choosedFood, setChoosedFood] = useState<FoodModel | null>();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const params = useRoute().params;
    const insets = useSafeAreaInsets();

    const navigation = useNavigation<any>();

    const {
            control,
            handleSubmit,
            setValue,
            formState: { errors },
          } = useForm<MealType>();

    useEffect(()=>{
        console.log('params', params);
        if (params?.meal) {
            setValuesByParams(params?.meal);
        }
        if (params?.date) {
            setSelectedDate(params?.date);
        }
    }, [params]);

    const onBack = () => {
        control._reset();
        navigation.goBack();
    };


    function updateNutrientsByAmount(amountStr: string, choosedFood: FoodModel | null, setValue: Function) {
        if (!choosedFood) {return;}

        const amount = parseFloat(amountStr);
        if (isNaN(amount)) {return;}

        const ratio = amount / 100;

        const format = (value: number, suffix: string) => `${Math.round(value * ratio)} ${suffix}`;

        setValue('calories', format(choosedFood.calories, 'кал'));
        setValue('proteins', format(choosedFood.proteins, 'г'));
        setValue('fats', format(choosedFood.fats, 'г'));
        setValue('carbohydrates', format(choosedFood.carbohydrates, 'г'));
    }
    const setValuesByParams = (meal: FoodMealModel) => {
        if (!meal) {return;}
        const food = foodStore.products.find((product)=>product.id === meal.food_id);
        if (!food) {return;}
        setChoosedFood(foodStore.products.find((product)=>product.id === meal.food_id));
        setValue('food', food?.name || '');
        setValue('type', convertMealTypeToRu(meal.type));
        setValue('eat_at', formatTimeWithMoment(meal.eat_at, '+00:00'));
        setValue('amount', meal.amount.toString());
        updateNutrientsByAmount(meal.amount.toString(), food, setValue);
    };
    const onSubmit = handleSubmit(async (data) => {
        if (!choosedFood) {
            errorToast('Выберите блюдо из списка');
            return;
        }

        if (
            !data.amount ||
            !data.calories ||
            !data.proteins ||
            !data.fats ||
            !data.carbohydrates ||
            !data.type ||
            !data.eat_at
        ) {
            errorToast('Заполните все поля');
            return;
        }

        try {
            const parseNumber = (str: string): number => {
            const cleaned = str.replace(/[^\d.,]/g, '').replace(',', '.');
            const num = parseFloat(cleaned);
            return isNaN(num) ? 0 : num;
            };
            const [hours, minutes] = data.eat_at.split(':');
            const eatDate = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                parseInt(hours, 10),
                parseInt(minutes, 10)
            );
            const eatAtISO = eatDate.toISOString();
            const model: FoodMealModel = {
                food_id: choosedFood.id,
                amount: parseNumber(data.amount),
                calories: parseNumber(data.calories),
                proteins: parseNumber(data.proteins),
                fats: parseNumber(data.fats),
                carbohydrates: parseNumber(data.carbohydrates),
                type: convertMealTypeToENG(data.type),
                eat_at: eatAtISO,
            };

            console.log('Final model to save:', params?.meal, model);

            if (params?.meal) {
                await foodStore.updateMyMeal(params.meal.id, model);
            }
            else {
                await foodStore.createMyMeal(model);
            }
            successToast('Запись успешно сохранена');
            await foodStore.getMyMeals(formatDateToYYYYMMDD(selectedDate));
            await foodStore.getMyFoodGoal(formatDateToYYYYMMDD(selectedDate));
            onBack();
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
            errorToast('Ошибка при сохранении записи');
        }
    });


    return <><ScrollView keyboardShouldPersistTaps="handled" style={s.container}>

    <Button style={[s.buttonBack, {marginTop: Platform.OS === 'ios' ? insets.top - 16 : insets.top + 16}]} onPress={onBack}>
            <>
                <ArrowBack />
                <IfgText color={colors.GRAY_COLOR3} style={gs.fontBody2}>Назад</IfgText>
                </>
        </Button>
    <IfgText style={[gs.h2, gs.bold, {marginTop: Platform.OS === 'ios' ? insets.top - 16 : 16, minHeight: 60}]} >{params?.meal ? choosedFood?.name : 'Новая запись'}</IfgText>
          <View style={gs.mt24} />
            <Controller control={control} name={'food'}
                render={({ field: { onChange, onBlur, value } }) => {

                        const filtered = useMemo(() => {
                            if (!value?.trim()) {return [];}
                            return foodStore.products.filter(p =>
                                p.name.toLowerCase().includes(value.toLowerCase())
                            );
                        }, [value, foodStore.products]);

                        return (
                        <View>
                            <InputFlat
                            placeholder="Название"
                            value={value} // Используем только значение из формы
                            onChange={(text) => {
                                onChange(text); // Обновляем значение в форме
                                setShowResults(true); // Показываем дропдаун
                            }}
                            style={{borderBottomLeftRadius: showResults ? 0 : 12,
    borderBottomRightRadius: showResults ? 0 : 12}}
                            onBlur={() => setTimeout(() => setShowResults(false), 200)}
                            />

                            {showResults && filtered.length > 0 && (
                            <View style={{ position: 'absolute',
                                    top: 56,
                                    left: 0,
                                    right: 0,
                                    backgroundColor: 'white',
                                    borderBottomLeftRadius: 12,
                                    borderBottomRightRadius: 12,
                                    borderWidth: 1,
                                    borderTopWidth: 0,
                                    borderColor: colors.BORDER_COLOR,
                                    maxHeight: 150,
                                    zIndex: 999}}>
                                <FlatList
                                keyboardShouldPersistTaps="handled"
                                data={filtered}

                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                    onPress={() => {
                                        console.log(item);
                                        onChange(item.name); // Устанавливаем в форму значение!
                                        setShowResults(false);
                                        setChoosedFood(item);
                                        setValue('amount', '100 грамм');
                                        setValue('calories', item.calories + ' кал');
                                        setValue('proteins', item.proteins + ' г');
                                        setValue('fats', item.fats + ' г');
                                        setValue('carbohydrates', item.carbohydrates + ' г');
                                    }}
                                    style={{
                                        padding: 12,
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#eee',
                                    }}
                                    >
                                    <IfgText style={{ fontSize: 16 }}>{item.name}</IfgText>
                                    </TouchableOpacity>
                                )}
                                />
                            </View>
                            )}
                        </View>
                    );}}/>
        <View style={gs.mt12} />
            <Controller control={control} name={'type'}
                render={({ field: { onChange, onBlur, value } }) => (
                <DropdownInput
                    placeholder="Приём пищи"
                    value={value}
                    options={['Завтрак', 'Обед', 'Ужин', 'Перекус']}
                    onSelect={onChange}
                />
            )}/>
        <View style={gs.mt12} />
            <Controller control={control} name={'eat_at'}
                render={({ field: { onChange, onBlur, value } }) =>{
                        const handleTimeChange = (text: string) => {
                        // Удаляем все нечисловые символы
                        const digits = text.replace(/\D/g, '');

                        let masked = digits;
                        if (digits.length >= 3) {
                            masked = `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
                        }

                        onChange(masked);
                    };
                    return (
                <>
                <InputFlat
                    keyboardType="number-pad"
                    style={gs.flex1}
                    placeholder="Время приёма"
                    value={value}
                        onChange={handleTimeChange}
                    onBlur={onBlur}
                    withIconButton
                    // tail=" кал"
                    // maxLength={6}
                />
                </>
            );}}/>
        <View style={gs.mt12} />
            <Controller control={control} name={'amount'}
                render={({ field: { onChange, onBlur, value } }) => (
                <InputFlat
                    keyboardType="number-pad"
                    style={gs.flex1}
                    placeholder="Грамм"
                    value={value}
                    onChange={onChange}
                    // tail=" кал"
                    // maxLength={6}
                    onFocus={()=>{
                        if (value)
                        {
                            setValue('amount', value.split(' ')[0]);

                        }
                    }}
                    onBlur={()=>{
                        if (value)
                        {
                            updateNutrientsByAmount(value, choosedFood || null, setValue);
                            setValue('amount', value + ' грамм');
                        }
                    }}
                />
            )}/>
        <View style={gs.mt12} />
            <Controller control={control} name={'calories'}
                render={({ field: { onChange, onBlur, value } }) => (
                <InputFlat
                    keyboardType="number-pad"
                    style={[gs.flex1]}
                    placeholder="Калорий"
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
        <View style={[gs.flexRow, {gap: 10, marginTop:12}]}>
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
        <Button onPress={onSubmit} style={s.addGoalButton}>
                <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption, gs.medium]}>{'Сохранить'}</IfgText>
        </Button>
    <View style={{height: 70}}/>

    </ScrollView>
    </>;
});


const s = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 16,
    },
    buttonBack: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            backgroundColor: 'transparent',
            borderColor: colors.BORDER_COLOR2,
            borderWidth: 1,
            borderRadius: 8,
            width: 84,
            height: 26,
    },
    buttonGoal: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 30,
        backgroundColor: colors.GREEN_COLOR,
    },
    addGoalButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        height: 60,
        backgroundColor: colors.GREEN_COLOR,
    },
    commonContainer: {
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderRadius: 8,
        gap: 0,
        flexDirection: 'row',
        alignItems:'center',
        marginTop: 12,
    },
    miniContainer: {
        flex: 1,
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 8,
        gap: 4,

    },
    mealContainer: {
        padding: 10,
        gap: 0,
        borderRadius: 8,
        // backgroundColor: 'transparent',
        // marginLeft: 16,
        // marginRight: 16,
        alignSelf: 'center',
        width: '94%',
    },
    squareNutrient: {
        width: 16,
        height: 16,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nutrientText: {
        color: '#000000',
        fontSize: 13,
        lineHeight: 16,
    },
   hiddenButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'flex-end',
    flex: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
    marginRight: 16,
     width: '90%',
  },
  hiddenBtn: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
  },
  mealContainer2: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
});
