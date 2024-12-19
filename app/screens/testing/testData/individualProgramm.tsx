import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../../../core/colors/colors';
import { CardContainer } from '../../../core/components/card/cardContainer';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';

const individualProgramm = [
    {
        number: '01',
        color: '#54B676',
        title: '4 направления',
        text: 'В вашем плане 4 направления: сон, физическая активность, питание и антистресс-практики. Начинайте выполнять рекомендации по каждому. Старайтесь делать не менее 80 % плана',
    },
    {
        number: '02',
        color: '#FFAC44',
        title: '30 дней',
        text: 'Выполняйте вашу программу минимум 30 дней и оцените самочувствие',
    },
    {
        number: '03',
        color: '#C3E154',
        title: 'Календарь',
        text: 'Отмечайте каждый свой маленький шаг в специальных ячейках календаря. Так вы будете видеть важность каждого шага и замечать успехи!',
    },
    {
        number: '04',
        color: '#FE99C4',
        title: 'Тестирование',
        text: 'После этого пройдите повторное тестирование для оценки прогресса иформирования новой программы.',
    },
];

export const IndividualProgrammData = () =>{
    return  individualProgramm.map(item=>
        <View key={item.number.toString()}><CardContainer >
            <View style={[gs.alignCenter, gs.flexRow]}>
                <View style={{width: 40, height: 40, borderRadius: 40, backgroundColor: item.color, justifyContent: 'center', alignItems: 'center'}}>
                    <IfgText color={colors.WHITE_COLOR} style={gs.fontCaption}>{item.number}</IfgText>
                </View>
                <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.bold, gs.ml8]}>{item.title}</IfgText>
            </View>
            <CardContainer style={{borderRadius: 12, borderColor: '#E9E9E9', borderWidth: 0.5}}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2]}>{item.text}</IfgText>
            </CardContainer>

        </CardContainer>
        <View style={gs.mt16} />
        </View>);
};

