import React, { FC } from 'react';
import { CardContainer } from '../../../core/components/card/cardContainer';
import colors from '../../../core/colors/colors';
import { ArticleHeader } from '../components/articleHeader';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { RingFoodComponent } from './components/ringFood';
import { Button, ButtonNext } from '../../../core/components/button/button';
import { useNavigation } from '@react-navigation/native';
// import { RingFoodComponent } from './components/RingFood';

export const FoodTrackerWidget: FC = () => {
    const navigation = useNavigation<any>();
    return <CardContainer>
        <ArticleHeader title="Дневник питания" hashTagColor={colors.GREEN_COLOR} hashTagText="#Питание"
             />
        <IfgText style={[gs.fontCaptionSmall]}>{'Чтобы дневник питания работал на вас, выберите свою цель — она поможет строить рацион осознанно и эффективно.'}</IfgText>
        <CardContainer style={s.commonContainer}>
                <View style={{flexDirection: 'column',gap: 0}}>
                    <IfgText style={[gs.h1, gs.bold, {fontSize: 36}]}>
                        10
                    </IfgText>
                    <IfgText color="#747474" style={[gs.fontCaption, {fontSize: 16, bottom: 10}]}>
                        Ещё калорий
                    </IfgText>
                </View>
                <RingFoodComponent dimension="кал" big goal={1200} color="#5CC280" label="K" value={230}/>
                {/* <CircularProgress value={240} maxValue={2200} /> */}
        </CardContainer>
        <View style={[{flexDirection: 'row', gap: 8,justifyContent: 'space-between'}]}>
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
        <ButtonNext
            onPress={()=>navigation.navigate('FoodTrackerScreen')}
            title="Задать цель"
            />
    </CardContainer>;
};


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
