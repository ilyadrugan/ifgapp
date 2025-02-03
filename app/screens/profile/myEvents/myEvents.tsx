import React, { FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { CardContainer } from '../../../core/components/card/cardContainer';
import gs from '../../../core/styles/global';
import { IfgText } from '../../../core/components/text/ifg-text';
import colors from '../../../core/colors/colors';
import { Button } from '../../../core/components/button/button';
import Time from '../../../../assets/icons/time.svg';
import ArrowRigthBlack from '../../../../assets/icons/arrow-right-black.svg';
import articlesStore from '../../../../store/state/articlesStore/articlesStore';
import { stripHtmlTags } from '../../../core/utils/stripHtmlTags';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { formatDateWithMoment, formatTimeWithMoment } from '../../../core/utils/formatDateTime';




export const MyEvents: FC = observer(() =>{
    const navigation = useNavigation<any>();

    useEffect(() => {

        articlesStore.interViewsUserList.length === 0 && articlesStore.getUserEvents();
        console.log(articlesStore.interViewsUserList);
    }, []);
    const CardEvent: FC<{
        date: string,
        time: string,
        name: string,
        specialistAbout: string,
        description: string,
        id: number
        }> =
    ({
        date,
        time,
        name,
        specialistAbout,
        description,
        id,
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
            <IfgText numberOfLines={3} color={colors.SECONDARY_COLOR} style={[gs.fontCaptionSmallMedium, gs.regular]}>{specialistAbout}</IfgText>
            <View style={{marginTop: 10}} />
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaptionSmall]}>{description}</IfgText>
            <View style={{marginTop: 10}} />

            <Button onPress={()=>{
                navigation.navigate('InterviewView', {interviewId: id});
            }} style={s.buttonResult}>
                <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%'}}>
                <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.medium]}>Подробнее</IfgText>
                <ArrowRigthBlack />
                </View>
            </Button>
        </CardContainer>;
    };
    return articlesStore.interViewsUserList.map((val, index)=>{
        console.log('valinterViewsUserList', val);
    return <>
    <CardEvent
        id={val.id}
        key={index.toString()}
        date={formatDateWithMoment(val.publication_date, '+03:00')}
        time={formatTimeWithMoment(val.publication_date, '+03:00')}
        name={stripHtmlTags(val.thumb_title)}
        specialistAbout={stripHtmlTags(val.title)}
        description="Онкологические заболевания: что нужно знать и как предупредить?"
    />
    <View style={gs.mt16} />
    </>;});
});

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
