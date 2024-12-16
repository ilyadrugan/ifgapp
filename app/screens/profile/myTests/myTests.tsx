import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { CardContainer } from '../../../core/components/card/cardContainer';
import gs from '../../../core/styles/global';
import { IfgText } from '../../../core/components/text/ifg-text';
import colors from '../../../core/colors/colors';
import { Button } from '../../../core/components/button/button';
import Time from '../../../../assets/icons/time.svg';
import ArrowRigthBlack from '../../../../assets/icons/arrow-right-black.svg';


const CardTest: FC<{date: string, time: string, title: string}> = ({date, time, title}) => {
    return <CardContainer style={{borderRadius: 22, gap: 0}}>
        <View style={gs.flexRow}>
            <Button disabled style={s.dateContainer}>
            <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption3, gs.medium]}>{date}</IfgText>
            </Button>
            <View style={gs.ml12} />
            <Button disabled style={s.timeContainer}>
                <Time />
                <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption3, gs.medium]} >
                {time}
                </IfgText>
            </Button>
        </View>
        <View style={{marginTop: 10}} />
        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.bold]}>{title}</IfgText>
        <View style={{marginTop: 21}} />
        <Button style={s.buttonResult}>
            <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%'}}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.medium]}>Результаты</IfgText>
            <ArrowRigthBlack />
            </View>
        </Button>
    </CardContainer>;
};

export const MyTests: FC = () =>{
    return [0, 1, 2].map((val, index)=><>
    <CardTest key={index.toString()} date={'22 декабря'} time="10:00" title="II ifg-тестирование" />
    <View style={gs.mt16} />
    </>);
};

const s = StyleSheet.create({
    dateContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.GREEN_COLOR,
        height: 24,
        borderRadius: 6,
        paddingHorizontal: 8.5,
    },
    timeContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
        height: 22,
        borderRadius: 6,
        paddingHorizontal: 6,
        gap: 4,
    },
    buttonResult: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'auto',
        padding: 20,
        borderWidth: 1,
        borderColor: colors.GREEN_COLOR,
        borderRadius: 16,
    },
  });
