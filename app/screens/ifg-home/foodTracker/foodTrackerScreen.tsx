import React, { FC, useState } from 'react';
import { CardContainer } from '../../../core/components/card/cardContainer';
import colors from '../../../core/colors/colors';
import { ArticleHeader } from '../components/articleHeader';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import { FlatList, Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
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

export const FoodTrackerScreen: FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [haveGoal, setHaveGoal] = useState(true);
    const insets = useSafeAreaInsets();

    const navigation = useNavigation<any>();
    const onBack = () => navigation.goBack();

    const goPrevDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() - 1);
        setSelectedDate(newDate);
    };

    const goNextDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + 1);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        setSelectedDate(newDate);
        // if (newDate <= today) {
        // setSelectedDate(newDate);
        // }
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
    const renderMeal = ({item, index}) => {
        return <CardContainer key={index.toString()} style={s.mealContainer}>
            <IfgText style={gs.bold}>Боул с киноа и тофу</IfgText>
            <IfgText color="#747474" style={[gs.fontCaptionSmallMedium, gs.regular]}>Перекус, 240 г, 20:17</IfgText>
            <View style={[gs.flexRow, gs.mt4]}>
                <View style={gs.flexRow}>
                    <View style={[s.squareNutrient, {backgroundColor: '#54B6764D'}]}>
                        <IfgText style={s.nutrientText}>К</IfgText>
                    </View>
                    <IfgText style={[s.nutrientText, gs.semiBold, gs.ml4]}>{153}кал</IfgText>
                </View>
                <View style={[gs.flexRow, gs.ml12]}>
                    <View style={[s.squareNutrient, {backgroundColor: '#FFAC444D'}]}>
                        <IfgText style={s.nutrientText}>Б</IfgText>
                    </View>
                    <IfgText style={[s.nutrientText, gs.semiBold, gs.ml4]}>{22}гр</IfgText>
                </View>
                <View style={[gs.flexRow, gs.ml12]}>
                    <View style={[s.squareNutrient, {backgroundColor: '#C3E1544D'}]}>
                        <IfgText style={s.nutrientText}>Ж</IfgText>
                    </View>
                    <IfgText style={[s.nutrientText, gs.semiBold, gs.ml4]}>{9}гр</IfgText>
                </View>
                <View style={[gs.flexRow, gs.ml12]}>
                    <View style={[s.squareNutrient, {backgroundColor: '#FE99C44D'}]}>
                        <IfgText style={s.nutrientText}>У</IfgText>
                    </View>
                    <IfgText style={[s.nutrientText, gs.semiBold, gs.ml4]}>{12}гр</IfgText>
                </View>
            </View>
        </CardContainer>;
    };

    return <ScrollView style={s.container}>

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
        {haveGoal && <Button style={s.buttonGoal}>
            <IfgText color={colors.WHITE_COLOR}>Задать цель</IfgText>
        </Button>}
    </View>
    <CardContainer style={s.commonContainer}>
                <View style={{flexDirection: 'column',gap: 0}}>
                    <IfgText style={[gs.h1, gs.bold, {fontSize: 36}]}>
                        850
                    </IfgText>
                    <IfgText color="#747474" style={[gs.fontCaption, {fontSize: 16, bottom: 10}]}>
                        Ещё калорий
                    </IfgText>
                </View>
                <RingFoodComponent dimension="кал" big goal={1200} color="#5CC280" label="K" value={230}/>
                {/* <CircularProgress value={240} maxValue={2200} /> */}
    </CardContainer>
    <View style={[{flexDirection: 'row', gap: 8,justifyContent: 'space-between', marginTop: 12}]}>
            <CardContainer style={s.miniContainer}>
                <IfgText style={[gs.bold, {fontSize: 20}]}>0гр</IfgText>
                <IfgText style={[gs.regular, {fontSize: 14}]}>Ещё белков</IfgText>
                <View />
                <RingFoodComponent dimension="г" goal={1200} color="#FFAC44" label="Б" value={230}/>
            </CardContainer>
            <CardContainer style={s.miniContainer}>
                <IfgText style={[gs.bold, {fontSize: 20}]}>0гр</IfgText>
                <IfgText style={[gs.regular, {fontSize: 14}]}>Ещё жиров</IfgText>
                <View />
                <RingFoodComponent dimension="г" goal={1200} color="#C3E154" label="Ж" value={230}/>
            </CardContainer>
            <CardContainer style={s.miniContainer}>
                <IfgText style={[gs.bold, {fontSize: 20}]}>0гр</IfgText>
                <IfgText style={[gs.regular, {fontSize: 14}]}>Ещё углеводов</IfgText>
                <View />
                <RingFoodComponent dimension="г" goal={200} color="#FE99C4" label="У" value={230}/>
            </CardContainer>
    </View>
    <View style={gs.mt24}/>
    <Button style={s.addGoalButton}>
        <View style={[gs.flexRow, gs.alignCenter, {gap:4}]}>
            <PlusWhite />
            <IfgText color={colors.WHITE_COLOR} style={gs.fontCaption}>{haveGoal ? 'Добавить' : 'Задать цель'}</IfgText>
        </View>
    </Button>
    <IfgText style={[gs.fontBodyMedium, gs.bold, gs.mt24]}>Рацион</IfgText>
    {!haveGoal && <View style={[gs.flexRow, gs.alignCenter, gs.mt12, {gap:4, justifyContent: 'center'}]}>
            <IfgText color={'#747474'} style={gs.fontCaption}>Сначала необходимо задать цель</IfgText>
    </View>}
    <View style={gs.mt12}/>
    {haveGoal &&
    // <FlatList
    //     data={[0,1]}
    //     renderItem={renderMeal}
    //     />
    <SwipeListView
    data={[0,1]}
    renderItem={renderMeal}
    renderHiddenItem={renderHiddenItem}
    ItemSeparatorComponent={<View style={gs.mt12} />}
    rightOpenValue={-100} // ширина двух кнопок
    disableRightSwipe
    keyExtractor={(item, index) => index.toString()}
    />
    }
    <View style={{height: 70}}/>
    </ScrollView>;
};


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
    alignSelf: 'center',
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
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
