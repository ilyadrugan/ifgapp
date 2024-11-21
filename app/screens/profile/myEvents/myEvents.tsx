import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { CardContainer } from '../../../core/components/card/cardContainer';
import gs from '../../../core/styles/global';
import { IfgText } from '../../../core/components/text/ifg-text';
import colors from '../../../core/colors/colors';
import { Button } from '../../../core/components/button/button';
import Time from '../../../../assets/icons/time.svg';
import ArrowRigthBlack from '../../../../assets/icons/arrow-right-black.svg';


const CardEvent: FC<{
    date: string,
    time: string,
    name: string,
    specialistAbout: string,
    description: string
    }> =
({
    date,
    time,
    name,
    specialistAbout,
    description,
}) => {
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
        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.bold]}>{name}</IfgText>
        <View style={{marginTop: 2}} />
        <IfgText color={colors.SECONDARY_COLOR} style={[gs.fontCaptionSmallMedium, gs.regular]}>{specialistAbout}</IfgText>
        <View style={{marginTop: 10}} />
        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaptionSmall]}>{description}</IfgText>
        <View style={{marginTop: 10}} />

        <Button style={s.buttonResult}>
            <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%'}}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.medium]}>Подробнее</IfgText>
            <ArrowRigthBlack />
            </View>
        </Button>
    </CardContainer>;
};

export const MyEvents: FC = () =>{
    return [0, 1, 2].map((val, index)=><>
    <CardEvent
        date={'22 декабря'}
        time="10:00"
        name="Анна Архицкая"
        specialistAbout="онколог, маммолог, заведующая центра онкологической помощи Тихвин"
        description="Онкологические заболевания: что нужно знать и как предупредить?"
    />
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
