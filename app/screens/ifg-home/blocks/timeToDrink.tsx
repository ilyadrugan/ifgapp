import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { CardContainer } from '../../../core/components/card/cardContainer';
import React, { FC, useState } from 'react';
import gs from '../../../core/styles/global';
import colors from '../../../core/colors/colors';
import { IfgText } from '../../../core/components/text/ifg-text';
import CupFilled from '../../../../assets/icons/cup-filled.svg';
import CupPlus from '../../../../assets/icons/cup-plus.svg';
import CupEmpty from '../../../../assets/icons/cup-empty.svg';
import SeparatorHorizontal from '../../../../assets/icons/separator-horizontal.svg';
import { CupsData, CupStatus, CupsType } from './data/data-cups';
import { ButtonNext } from '../../../core/components/button/button';
import { ArticleHeader } from '../components/articleHeader';
import { observer } from 'mobx-react';
import dailyActivityStore from '../../../../store/state/activityGraphStore/activityGraphStore';
import ifgScoreStore from '../../../../store/state/ifgScoreStore/ifgScoreStore';

const width = Dimensions.get('screen').width;

export const TimeToDrinkBlock: FC<{isNew?: boolean, watterCount?: number}> = observer(({isNew}) => {
    // console.log('watterCount',watterCount );
    const [cupsData, setCupsData] = useState<CupsType[]>(dailyActivityStore.dailyTodayActivityData?.watter ? [0,1,2,3,4,5,6,7].map((item)=>
    {
        if (item < dailyActivityStore.dailyTodayActivityData.watter) {return {id: item, status: CupStatus.Filled} as CupsType;}
        if (item === dailyActivityStore.dailyTodayActivityData.watter) {return {id: item, status: CupStatus.Plused} as CupsType;}
        else {return {id: item, status: CupStatus.Empty} as CupsType;}
    }
    ) : CupsData);
    const [scoreGotted, setScoreGotted] = useState<boolean>(dailyActivityStore.dailyTodayActivityData.isDrinkEight);

    const onCupTap = (id: number, status: CupStatus) =>{
        const copyData = [...cupsData];
        switch (status){
            case CupStatus.Plused:
                copyData[id].status = CupStatus.Filled;
                if (id !== cupsData.length - 1)
                    {copyData[id + 1].status = CupStatus.Plused;}
                break;
            case CupStatus.Filled:
                const plusedCupIndex = cupsData.findIndex((cup: CupsType)=>cup.status === CupStatus.Plused);
                if (plusedCupIndex < 0) {
                    copyData[cupsData.length - 1].status = CupStatus.Plused;
                }
                else {
                    copyData[plusedCupIndex].status = CupStatus.Empty;
                    copyData[plusedCupIndex - 1].status = CupStatus.Plused;
                }
                break;
        }
        setCupsData(copyData);
        addToDailyActivity(copyData);
    };

    const addToDailyActivity = async (cups: CupsType[]) => {
        if (dailyActivityStore.dailyActivityData.watter === 0) {
            dailyActivityStore.addDailyActivity('food', dailyActivityStore.dailyTodayActivityData.food + 1);
            ifgScoreStore.addScore(1);
        }
       await dailyActivityStore.addDailyActivity('watter', cups.filter(cup=>cup.status === CupStatus.Filled).length);
    };

    const addScoreForWatter = () => {
        setScoreGotted((prev)=>!prev);
        dailyActivityStore.addDailyActivity('watter', cupsData.filter(cup=>cup.status === CupStatus.Filled).length);
        dailyActivityStore.addDailyActivity('food', dailyActivityStore.dailyTodayActivityData.food + 2);
        dailyActivityStore.addDailyActivity('isDrinkEight', true);
        ifgScoreStore.addScore(2);};

    return <>
    <CardContainer style={gs.mt16}>
        <ArticleHeader
            isCicleBadge={isNew}
            hashTagColor={colors.GREEN_COLOR}
            hashTagText="#Питание"
            time="10:00"
            />
        <IfgText style={[gs.fontCaption, gs.bold]}>
            Пришло время освежиться
        </IfgText>
        <IfgText style={[gs.fontCaptionSmall]}>
        Ваш организм подал сигнал тревоги: ему нужна вода! Не откладывайте его просьбу на потом, пополните запасы жидкости!
        </IfgText>
        <SeparatorHorizontal />
        <View style={[gs.flexRow, {justifyContent: 'space-between' }]}>
            <View>
                <IfgText style={[gs.fontCaption2, gs.bold]}>Сегодня</IfgText>
                <IfgText style={[gs.fontCaptionSmall,  gs.mt4]}>{cupsData.filter((cup: CupsType)=>cup.status === CupStatus.Filled).length} из 8</IfgText>
            </View>
            <IfgText style={[gs.fontCaption, gs.bold]}>{`${cupsData.filter((cup: CupsType)=>cup.status === CupStatus.Filled).length * 0.25} л`.replace('.', ',')}</IfgText>
        </View>
        {/* Cups */}
        <View style={s.cups}>
            {cupsData.map((cup: CupsType)=>
            <TouchableOpacity key={cup.id.toString()} onPress={()=>onCupTap(cup.id, cup.status)} disabled={cup.status !== CupStatus.Plused} style={[
                    s.cupContainer,
                    cup.status === CupStatus.Empty && s.cupEmptyContainer,
                    cup.status === CupStatus.Filled && s.cupFilledContainer,
                    cup.status === CupStatus.Plused && s.cupPlusedContainer,
                ]}>
                    {cup.status === CupStatus.Empty && <CupEmpty />}
                    {cup.status === CupStatus.Filled && <CupFilled />}
                    {cup.status === CupStatus.Plused && <CupPlus />}

            </TouchableOpacity>
            )}
        </View>
       {(!scoreGotted) && <ButtonNext onPress={addScoreForWatter} disabled={cupsData.filter((cup: CupsType)=>cup.status === CupStatus.Filled).length !== 8} title="Сделано" oliveTitle="+ 3 балла" />}
    </CardContainer>

    </>;
});


const s = StyleSheet.create({
    circle:{
        width: 6,
        height: 6,
        backgroundColor: '#FA5D5D',
        borderRadius: 4,
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
    cups: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 14,
        justifyContent: 'space-between',
        flexShrink: 1,
    },
    cupContainer: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: (width - 64) * 0.2,
        height: (width - 64) * 0.2,
    },
    cupFilledContainer: {
        backgroundColor: '#DFF5E7',
    },
    cupEmptyContainer: {
        borderWidth: 1,
        borderColor: '#EAEAEA',
        backgroundColor: '#ffffff',
    },
    cupPlusedContainer: {
        borderWidth: 1,
        borderColor: '#EAEAEA',
        backgroundColor: '#F7F7F7',
    },
    buttonNext: {
        backgroundColor: colors.GREEN_COLOR,
        borderRadius: 16,
        paddingHorizontal: 24,
        height: 60,
      },
    });
