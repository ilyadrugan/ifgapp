import React, { FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { CardContainer } from '../../../core/components/card/cardContainer';
import gs from '../../../core/styles/global';
import { IfgText } from '../../../core/components/text/ifg-text';
import colors from '../../../core/colors/colors';
import { Button } from '../../../core/components/button/button';
import Time from '../../../../assets/icons/time.svg';
import ArrowRigthBlack from '../../../../assets/icons/arrow-right-black.svg';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import testingStore from '../../../../store/state/testingStore/testingStore';
import { formatDateWithMoment, formatTimeWithMoment } from '../../../core/utils/formatDateTime';
import { ActivitiValueModel } from '../../../../store/state/testingStore/models/models';


const CardTest: FC<{dateTime: string, title: string, activities: ActivitiValueModel}> = ({dateTime, title, activities}) => {
    const navigation = useNavigation<any>();
    return <CardContainer style={{borderRadius: 22, gap: 0}}>
        <View style={gs.flexRow}>
            <Button disabled style={s.dateContainer}>
            <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption3, gs.medium]}>{formatDateWithMoment(dateTime, '+03:00')}</IfgText>
            </Button>
            <View style={gs.ml12} />
            <Button disabled style={s.timeContainer}>
                <Time />
                <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption3, gs.medium]} >
                {formatTimeWithMoment(dateTime, '+03:00')}
                </IfgText>
            </Button>
        </View>
        <View style={{marginTop: 10}} />
        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.bold]}>{'Ifg-тестирование'}</IfgText>
        <View style={{marginTop: 21}} />
        <Button onPress={()=>navigation.navigate('ResultTest', {activiti_value_json: activities })} style={s.buttonResult}>
            <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%'}}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.medium]}>Результаты</IfgText>
            <ArrowRigthBlack />
            </View>
        </Button>
    </CardContainer>;
};

export const MyTests: FC = observer(() =>{

    useEffect(() => {
      testingStore.getAllMyTest();
    },[]);

    return <>

    {testingStore.testsList.map((val, index)=><>
    <CardTest activities={val.activiti_value_json} key={index.toString()} dateTime={val.created_at} title={val.name} />
    <View style={gs.mt16} />
    </>)}
        <View style={{height: 70}}/>
    </>;
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
