import React, { FC, useEffect, useState } from 'react';
import { CardContainer } from '../../../core/components/card/cardContainer';
import colors from '../../../core/colors/colors';
import { ArticleHeader } from '../components/articleHeader';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { RingFoodComponent } from './components/ringFood';
import { ButtonNext } from '../../../core/components/button/button';
import { useNavigation } from '@react-navigation/native';
import foodStore from '../../../../store/state/foodStore/foodStore';
import { observer } from 'mobx-react';
import { formatDateToYYYYMMDD } from '../../../core/utils/formatDateTime';
// import { RingFoodComponent } from './components/RingFood';

export const FoodTrackerWidget: FC = observer(() => {
    const navigation = useNavigation<any>();

    useEffect(()=>{
        foodStore.getMyFoodGoal(formatDateToYYYYMMDD(new Date()));
    }, []);

    return foodStore.myTodayGoal && <CardContainer>
        <ArticleHeader title="Дневник питания" hashTagColor={colors.GREEN_COLOR} hashTagText="#Питание"
             />
        <IfgText style={[gs.fontCaptionSmall]}>{foodStore.haveGoal ? 'Каждый приём пищи — это вклад в ваш результат. Заполняйте дневник питания, чтобы оставаться на курсе и отслеживать прогресс.' : 'Чтобы дневник питания работал на вас, выберите свою цель — она поможет строить рацион осознанно и эффективно.'}</IfgText>
        <CardContainer style={s.commonContainer}>
                <View style={{flexDirection: 'column',gap: 0}}>
                    <IfgText style={[gs.h1, gs.bold, {fontSize: 36}]}>
                        {foodStore.myTodayGoal.calories.goal - foodStore.myTodayGoal.calories.current >= 0 ? foodStore.myTodayGoal.calories.goal - foodStore.myTodayGoal.calories.current : 0}
                    </IfgText>
                    <IfgText color="#747474" style={[gs.fontCaption, {fontSize: 16, bottom: 10}]}>
                        Ещё калорий
                    </IfgText>
                </View>
                <RingFoodComponent dimension="кал" big goal={foodStore.myTodayGoal.calories.goal} color="#5CC280" label="K" value={foodStore.myTodayGoal.calories.current}/>
        </CardContainer>
        <View style={[{flexDirection: 'row', gap: 8,justifyContent: 'space-between'}]}>
            <CardContainer style={s.miniContainer}>
                <IfgText style={[gs.bold, {fontSize: 20}]}>{foodStore.myTodayGoal.proteins.goal - foodStore.myTodayGoal.proteins.current >= 0 ? foodStore.myTodayGoal.proteins.goal - foodStore.myTodayGoal.proteins.current : 0}гр</IfgText>
                <IfgText style={[gs.regular, {fontSize: 14}]}>Ещё белков</IfgText>
                <View />
                <RingFoodComponent dimension="г" goal={foodStore.myTodayGoal.proteins.goal} color="#FFAC44" label="Б" value={foodStore.myTodayGoal.proteins.current}/>
            </CardContainer>
            <CardContainer style={s.miniContainer}>
                <IfgText style={[gs.bold, {fontSize: 20}]}>{foodStore.myTodayGoal.fats.goal - foodStore.myTodayGoal.fats.current >= 0 ? foodStore.myTodayGoal.fats.goal - foodStore.myTodayGoal.fats.current : 0}гр</IfgText>
                <IfgText style={[gs.regular, {fontSize: 14}]}>Ещё жиров</IfgText>
                <View />
                <RingFoodComponent dimension="г" goal={foodStore.myTodayGoal.fats.goal} color="#C3E154" label="Ж" value={foodStore.myTodayGoal.fats.current}/>
            </CardContainer>
            <CardContainer style={s.miniContainer}>
                <IfgText style={[gs.bold, {fontSize: 20}]}>{foodStore.myTodayGoal.carbohydrates.goal - foodStore.myTodayGoal.carbohydrates.current >= 0 ? foodStore.myTodayGoal.carbohydrates.goal - foodStore.myTodayGoal.carbohydrates.current : 0}гр</IfgText>
                <IfgText style={[gs.regular, {fontSize: 14}]}>Ещё углеводов</IfgText>
                <View />
                <RingFoodComponent dimension="г" goal={foodStore.myTodayGoal.carbohydrates.goal} color="#FE99C4" label="У" value={foodStore.myTodayGoal.carbohydrates.current}/>
            </CardContainer>
        </View>
        <ButtonNext
            onPress={()=>navigation.navigate('FoodTrackerScreen')}
            title={foodStore.haveGoal ? 'Открыть' : 'Задать цель'}
            />
    </CardContainer>;
});


const s = StyleSheet.create({
    commonContainer: {
        backgroundColor: colors.BACKGROUND_COLOR,
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderRadius: 8,
        gap: 0,
        flexDirection: 'row',
        alignItems:'center',
    },
    miniContainer: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_COLOR,
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 8,
        gap: 4,

        // marginHorizontal: 4,
    },
});
