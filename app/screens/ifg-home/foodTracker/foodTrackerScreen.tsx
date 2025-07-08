import React, { FC, useEffect, useState } from 'react';
import { CardContainer } from '../../../core/components/card/cardContainer';
import colors from '../../../core/colors/colors';
import { ArticleHeader } from '../components/articleHeader';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import { ActivityIndicator, FlatList, Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { RingFoodComponent } from './components/ringFood';
import { Button, ButtonNext } from '../../../core/components/button/button';
import { useNavigation } from '@react-navigation/native';
// import { RingFoodComponent } from './components/RingFood';
import ArrowBack from '../../../../assets/icons/arrow-back.svg';
import PlusWhite from '../../../../assets/icons/plus-white.svg';
import EditIcon from '../../../../assets/icons/edit.svg';
import DeleteIcon from '../../../../assets/icons/trash.svg';
import Left from '../../../../assets/icons/left.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ModalAddGoal } from './components/modalAddGoal';
import foodStore from '../../../../store/state/foodStore/foodStore';
import { observer } from 'mobx-react';
import { FoodMealModel } from '../../../../store/state/foodStore/models/models';
import { formatDateToYYYYMMDD, formatTimeWithMoment } from '../../../core/utils/formatDateTime';

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

const getDisplayDate = (date: Date): string => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
   const formatted = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const formattedArr = formatted.split(' ');
  const result = `${formattedArr[0]} ${formattedArr[1].charAt(0).toUpperCase() + formattedArr[1].slice(1)} ${formattedArr[2]}`;
  if (target.getTime() === today.getTime()) {return 'Сегодня, ' + result;}
  if (target.getTime() === yesterday.getTime()) {return 'Вчера, ' + result;}

  return result; // 15 февр. 2025
};



export const FoodTrackerScreen: FC = observer(() => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [modalAddGoal, setModalAddGoal] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();
    const onBack = () => navigation.goBack();

    useEffect(() => {
    //  console.log('isloadgin', foodStore.isLoading);
    foodStore.loadFood();
    }, []);


    const goPrevDay = async () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() - 1);
        setSelectedDate(newDate);
        await getFoodDataByDate(formatDateToYYYYMMDD(newDate));
    };

    const goNextDay = async () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + 1);
        setSelectedDate(newDate);
        await getFoodDataByDate(formatDateToYYYYMMDD(newDate));

    };

    const getFoodDataByDate = async (date: string) => {
        await foodStore.getMyFoodGoal(date);
        await foodStore.getMyMeals(date);
    };



    const isToday = (() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const sel = new Date(selectedDate);
        sel.setHours(0, 0, 0, 0);
        return sel.getTime() === today.getTime();
    })();
    const renderHiddenItem = ({ item }) => (
        <View style={s.hiddenButtons}>
            <TouchableOpacity style={[s.hiddenBtn, { flex:1,backgroundColor: '#FFA726', alignItems: 'flex-end', paddingRight: 16 }]}>
            <EditIcon />
            </TouchableOpacity>
            <TouchableOpacity style={[s.hiddenBtn, { backgroundColor: '#EF5350' }]}>
            <DeleteIcon />
            </TouchableOpacity>
        </View>
        );
    const renderMeal:FC<{item: FoodMealModel, index: number}> = ({item, index}) => {
        return <CardContainer key={index.toString()} style={s.mealContainer}>
            <IfgText style={gs.bold}>{foodStore.products.find((product)=>product.id === item.food_id)?.name}</IfgText>
            <IfgText color="#747474" style={[gs.fontCaptionSmallMedium, gs.regular]}>{item.type}, {item.amount} г, {formatTimeWithMoment(item.eat_at, '+00:00')}</IfgText>
            <View style={[gs.flexRow, gs.mt4]}>
                <View style={[gs.flexRow, {minWidth: 60}]}>
                    <View style={[s.squareNutrient, {backgroundColor: '#54B6764D'}]}>
                        <IfgText style={s.nutrientText}>К</IfgText>
                    </View>
                    <IfgText style={[s.nutrientText, gs.semiBold, gs.ml4]}>{item.calories}кал</IfgText>
                </View>
                <View style={[gs.flexRow, gs.ml12, {minWidth: 40}]}>
                    <View style={[s.squareNutrient, {backgroundColor: '#FFAC444D'}]}>
                        <IfgText style={s.nutrientText}>Б</IfgText>
                    </View>
                    <IfgText style={[s.nutrientText, gs.semiBold, gs.ml4]}>{item.proteins}гр</IfgText>
                </View>
                <View style={[gs.flexRow, gs.ml12, {minWidth: 40}]}>
                    <View style={[s.squareNutrient, {backgroundColor: '#C3E1544D'}]}>
                        <IfgText style={s.nutrientText}>Ж</IfgText>
                    </View>
                    <IfgText style={[s.nutrientText, gs.semiBold, gs.ml4]}>{item.fats}гр</IfgText>
                </View>
                <View style={[gs.flexRow, gs.ml12]}>
                    <View style={[s.squareNutrient, {backgroundColor: '#FE99C44D'}]}>
                        <IfgText style={s.nutrientText}>У</IfgText>
                    </View>
                    <IfgText style={[s.nutrientText, gs.semiBold, gs.ml4]}>{item.carbohydrates}гр</IfgText>
                </View>
            </View>
        </CardContainer>;
    };

    return <><ScrollView style={s.container}>


    <View style={{marginHorizontal: -16}}>
       <SwipeListView
            data={!foodStore.isLoading ? foodStore.myMeals : []}
            renderItem={renderMeal}
            renderHiddenItem={renderHiddenItem}
            ListHeaderComponent={<View style={{marginHorizontal:16}}>
                <Button style={[s.buttonBack, {marginTop: Platform.OS === 'ios' ? insets.top - 16 : insets.top + 16}]} onPress={onBack}>
            <>
                <ArrowBack />
                <IfgText color={colors.GRAY_COLOR3} style={gs.fontBody2}>Назад</IfgText>
                </>
        </Button>
    <IfgText style={[gs.h2, gs.bold, {marginTop: Platform.OS === 'ios' ? insets.top - 16 : 16}]} >{'Трекер питания'}</IfgText>
    <View style={[gs.flexRow, {justifyContent: 'space-between', alignItems: 'center', marginTop: 24}]}>
        <View style={[gs.flexRow, {alignItems: 'center'}]}>
            <TouchableOpacity onPress={goPrevDay} style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30}}>
                <Left />
            </TouchableOpacity>
            <IfgText style={[gs.fontCaption3, gs.bold, gs.ml4]}>{getDisplayDate(selectedDate)}</IfgText>
            {!isToday && (
            <TouchableOpacity
                onPress={goNextDay}
                style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30 }}
                >
                <View style={{ transform: [{ rotate: '180deg' }], marginLeft: 4}}>
                    <Left />
                </View>
            </TouchableOpacity>
            )}
        </View>
        {foodStore.haveGoal && <Button onPress={()=>setModalAddGoal(true)} style={s.buttonGoal}>
            <IfgText color={colors.WHITE_COLOR}>Задать цель</IfgText>
        </Button>}
    </View>
    {foodStore.isLoading ? <ActivityIndicator style={gs.mt16} size={'large'} /> : <>
    <CardContainer style={s.commonContainer}>
                <View style={{flexDirection: 'column',gap: 0}}>
                    <IfgText style={[gs.h1, gs.bold, {fontSize: 36}]}>
                        {foodStore.myCurrentGoal.calories.goal - foodStore.myCurrentGoal.calories.current >= 0 ? foodStore.myCurrentGoal.calories.goal - foodStore.myCurrentGoal.calories.current : 0}
                    </IfgText>
                    <IfgText color="#747474" style={[gs.fontCaption, {fontSize: 16, bottom: 10}]}>
                        Ещё калорий
                    </IfgText>
                </View>
                <RingFoodComponent dimension="кал" big goal={foodStore.myCurrentGoal.calories.goal} color="#5CC280" label="K" value={foodStore.myCurrentGoal.calories.current}/>
    </CardContainer>
    <View style={[{flexDirection: 'row', gap: 8,justifyContent: 'space-between', marginTop: 12}]}>
            <CardContainer style={s.miniContainer}>
                <IfgText style={[gs.bold, {fontSize: 20}]}>{foodStore.myCurrentGoal.proteins.goal - foodStore.myCurrentGoal.proteins.current >= 0 ? foodStore.myCurrentGoal.proteins.goal - foodStore.myCurrentGoal.proteins.current : 0}гр</IfgText>
                <IfgText style={[gs.regular, {fontSize: 14}]}>Ещё белков</IfgText>
                <View />
                <RingFoodComponent dimension="г" goal={foodStore.myCurrentGoal.proteins.goal} color="#FFAC44" label="Б" value={foodStore.myCurrentGoal.proteins.current}/>
            </CardContainer>
            <CardContainer style={s.miniContainer}>
                <IfgText style={[gs.bold, {fontSize: 20}]}>{foodStore.myCurrentGoal.fats.goal - foodStore.myCurrentGoal.fats.current >= 0 ? foodStore.myCurrentGoal.fats.goal - foodStore.myCurrentGoal.fats.current : 0}гр</IfgText>
                <IfgText style={[gs.regular, {fontSize: 14}]}>Ещё жиров</IfgText>
                <View />
                <RingFoodComponent dimension="г" goal={foodStore.myCurrentGoal.fats.goal} color="#C3E154" label="Ж" value={foodStore.myCurrentGoal.fats.current}/>
            </CardContainer>
            <CardContainer style={s.miniContainer}>
                <IfgText style={[gs.bold, {fontSize: 20}]}>{foodStore.myCurrentGoal.carbohydrates.goal - foodStore.myCurrentGoal.carbohydrates.current >= 0 ? foodStore.myCurrentGoal.carbohydrates.goal - foodStore.myCurrentGoal.carbohydrates.current : 0}гр</IfgText>
                <IfgText style={[gs.regular, {fontSize: 14}]}>Ещё углеводов</IfgText>
                <View />
                <RingFoodComponent dimension="г" goal={foodStore.myCurrentGoal.carbohydrates.goal} color="#FE99C4" label="У" value={foodStore.myCurrentGoal.carbohydrates.current}/>
            </CardContainer>
    </View>
    <View style={gs.mt24}/>
    <Button onPress={()=>{
        foodStore.haveGoal ? navigation.navigate('FoodTrackerAddEditScreen') : setModalAddGoal(prev=>!prev);
        }} style={s.addGoalButton}>
        <View style={[gs.flexRow, gs.alignCenter, {gap:4}]}>
            <PlusWhite />
            <IfgText color={colors.WHITE_COLOR} style={gs.fontCaption}>{foodStore.haveGoal ? 'Добавить' : 'Задать цель'}</IfgText>
        </View>
    </Button>
    {foodStore.myMeals.length > 0  && <IfgText style={[gs.fontBodyMedium, gs.bold, gs.mt24]}>Рацион</IfgText>}
    {!foodStore.haveGoal && <View style={[gs.flexRow, gs.alignCenter, gs.mt12, {gap:4, justifyContent: 'center'}]}>
            <IfgText color={'#747474'} style={gs.fontCaption}>Сначала необходимо задать цель</IfgText>
    </View>}
    <View style={gs.mt12}/>
    </>}
            </View>}
            ItemSeparatorComponent={<View style={gs.mt12} />}
            rightOpenValue={-110} // ширина двух кнопок
            disableRightSwipe
            keyExtractor={(item, index) => index.toString()}
            />
    </View>


    <View style={{height: 70}}/>
    <ModalAddGoal modalOpen={modalAddGoal} setModalOpen={setModalAddGoal}/>

    </ScrollView>
    </>;
});


const s = StyleSheet.create({
    container: {
        flex: 1,
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
