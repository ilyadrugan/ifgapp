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

    const {myCurrentGoal, haveGoal, isLoading} = foodStore;
    useEffect(() => {
      console.log('myCurrentGoal', myCurrentGoal);
    }, []);

    return myCurrentGoal && <CardContainer>
        <ArticleHeader title="Дневник питания" hashTagColor={colors.GREEN_COLOR} hashTagText="#Питание"
             />
        <IfgText style={[gs.fontCaptionSmall]}>{haveGoal ? 'Каждый приём пищи — это вклад в ваш результат. Заполняйте дневник питания, чтобы оставаться на курсе и отслеживать прогресс.' : 'Чтобы дневник питания работал на вас, выберите свою цель — она поможет строить рацион осознанно и эффективно.'}</IfgText>
        <CardContainer style={s.commonContainer}>
                <View style={{flexDirection: 'column',gap: 0}}>
                    <IfgText style={[gs.h1, gs.bold, {fontSize: 36}]}>
                        {myCurrentGoal.calories.goal - myCurrentGoal.calories.current >= 0 ? myCurrentGoal.calories.goal - myCurrentGoal.calories.current : 0}
                    </IfgText>
                    <IfgText color="#747474" style={[gs.fontCaption, {fontSize: 16, bottom: 10}]}>
                        Ещё калорий
                    </IfgText>
                </View>
                <RingFoodComponent dimension="кал" big goal={myCurrentGoal.calories.goal} color="#5CC280" label="K" value={myCurrentGoal.calories.current}/>
        </CardContainer>
        <View style={[{flexDirection: 'row', gap: 8,justifyContent: 'space-between'}]}>
            <CardContainer style={s.miniContainer}>
                <IfgText style={[gs.bold, {fontSize: 20}]}>{myCurrentGoal.proteins.goal - myCurrentGoal.proteins.current >= 0 ? myCurrentGoal.proteins.goal - myCurrentGoal.proteins.current : 0}гр</IfgText>
                <IfgText style={[gs.regular, {fontSize: 14}]}>Ещё белков</IfgText>
                <View />
                <RingFoodComponent dimension="г" goal={myCurrentGoal.proteins.goal} color="#FFAC44" label="Б" value={myCurrentGoal.proteins.current}/>
            </CardContainer>
            <CardContainer style={s.miniContainer}>
                <IfgText style={[gs.bold, {fontSize: 20}]}>{myCurrentGoal.fats.goal - myCurrentGoal.fats.current >= 0 ? myCurrentGoal.fats.goal - myCurrentGoal.fats.current : 0}гр</IfgText>
                <IfgText style={[gs.regular, {fontSize: 14}]}>Ещё жиров</IfgText>
                <View />
                <RingFoodComponent dimension="г" goal={myCurrentGoal.fats.goal} color="#C3E154" label="Ж" value={myCurrentGoal.fats.current}/>
            </CardContainer>
            <CardContainer style={s.miniContainer}>
                <IfgText style={[gs.bold, {fontSize: 20}]}>{myCurrentGoal.carbohydrates.goal - myCurrentGoal.carbohydrates.current >= 0 ? myCurrentGoal.carbohydrates.goal - myCurrentGoal.carbohydrates.current : 0}гр</IfgText>
                <IfgText style={[gs.regular, {fontSize: 14}]}>Ещё углеводов</IfgText>
                <View />
                <RingFoodComponent dimension="г" goal={myCurrentGoal.carbohydrates.goal} color="#FE99C4" label="У" value={myCurrentGoal.carbohydrates.current}/>
            </CardContainer>
        </View>
        <ButtonNext
            onPress={()=>navigation.navigate('FoodTrackerScreen')}
            title={haveGoal ? 'Открыть' : 'Задать цель'}
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
