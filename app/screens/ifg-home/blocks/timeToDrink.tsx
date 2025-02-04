import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { CardContainer } from '../../../core/components/card/cardContainer';
import React, { FC, useEffect, useMemo, useState } from 'react';
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
import { observer, useStaticRendering } from 'mobx-react';
import dailyActivityStore from '../../../../store/state/activityGraphStore/activityGraphStore';
import ifgScoreStore from '../../../../store/state/ifgScoreStore/ifgScoreStore';
import { useFocusEffect } from '@react-navigation/native';

const width = Dimensions.get('screen').width;
export const TimeToDrinkBlock: FC<{ isNew?: boolean }> = observer(({ isNew }) => {
    const { dailyTodayActivityData, addDailyActivity, addWatter } = dailyActivityStore;
    const [cupsData, setCupsData] = useState<CupsType[]>([0, 1, 2, 3, 4, 5, 6, 7].map((item) => ({
        id: item,
        status:
            item < (dailyTodayActivityData?.watter )
                ? CupStatus.Filled
                : item === (dailyTodayActivityData?.watter)
                ? CupStatus.Plused
                : CupStatus.Empty,
    })));
    const [isLoading, setIsLoading] = useState(false);
    const [scoreGotted, setScoreGotted] = useState<boolean>(dailyTodayActivityData?.isDrinkEight || false);

    useFocusEffect(
      React.useCallback(() => {
        console.log('useFocusEffect');
        if (isLoading) {return;}
        setScoreGotted(dailyTodayActivityData?.isDrinkEight || false);
        setCupsData([0, 1, 2, 3, 4, 5, 6, 7].map((item) => ({
            id: item,
            status:
                item < (dailyTodayActivityData?.watter)
                    ? CupStatus.Filled
                    : item === (dailyTodayActivityData?.watter)
                    ? CupStatus.Plused
                    : CupStatus.Empty,
        })));
      }, [])
    );
    useEffect(() => {
        console.log('dailyTodayActivityData.watter', dailyTodayActivityData?.watter);
        setScoreGotted(dailyTodayActivityData?.isDrinkEight);
        setCupsData([0, 1, 2, 3, 4, 5, 6, 7].map((item) => ({
            id: item,
            status:
                item < dailyTodayActivityData?.watter
                    ? CupStatus.Filled
                    : item === dailyTodayActivityData?.watter
                    ? CupStatus.Plused
                    : CupStatus.Empty,
        })));
    }, [dailyTodayActivityData, isLoading]);

    // Обработчик нажатия на стакан
    const onCupTap = async (id: number, status: CupStatus) => {
        setIsLoading(true);
        if (status === CupStatus.Plused) {
            console.log('addWatter', dailyTodayActivityData.watter + 1);
            addWatter(dailyTodayActivityData.watter + 1);
            await addWatterToActivityData(dailyTodayActivityData.watter + 1);
            setIsLoading(false);
        }
    };
    const addWatterToActivityData = async (watter: number) => {
        if (dailyTodayActivityData.watter === 0) {
            await dailyActivityStore.addDailyActivity('food', dailyTodayActivityData.food + 1);
            await ifgScoreStore.addScore(1);
        }
       await dailyActivityStore.addDailyActivity('watter', watter);
    };
    const addScoreForWatter = () => {
        setScoreGotted((prev)=>!prev);
        dailyActivityStore.addDailyActivity('watter', cupsData.filter(cup=>cup.status === CupStatus.Filled).length);
        dailyActivityStore.addDailyActivity('food', dailyTodayActivityData.food + 2);
        dailyActivityStore.addDailyActivity('isDrinkEight', true);
        ifgScoreStore.addScore(2);
    };
    return (
        <CardContainer style={gs.mt16}>
            <ArticleHeader isCicleBadge={isNew && !scoreGotted} hashTagColor={colors.GREEN_COLOR} hashTagText="#Питание" time="10:00" />
            <IfgText style={[gs.fontCaption, gs.bold]}>Пришло время освежиться</IfgText>
            <IfgText style={[gs.fontCaptionSmall]}>
                Ваш организм подал сигнал тревоги: ему нужна вода! Не откладывайте его просьбу на потом, пополните запасы жидкости!
            </IfgText>
            <SeparatorHorizontal />
            <View style={[gs.flexRow, { justifyContent: 'space-between' }]}>
                <View>
                    <IfgText style={[gs.fontCaption2, gs.bold]}>Сегодня</IfgText>
                    <IfgText style={[gs.fontCaptionSmall, gs.mt4]}>{(dailyTodayActivityData?.watter || 0)} из 8</IfgText>
                </View>
                <IfgText style={[gs.fontCaption, gs.bold]}>
                    {`${(dailyTodayActivityData?.watter || 0) * 0.25} л`.replace('.', ',')}
                </IfgText>
            </View>
            {/* Кружки */}
            <View style={s.cups}>
                {cupsData.map((cup) => (
                    <TouchableOpacity
                        key={cup.id.toString()}
                        onPress={() => onCupTap(cup.id, cup.status)}
                        disabled={cup.status !== CupStatus.Plused}
                        style={[
                            s.cupContainer,
                            cup.status === CupStatus.Empty && s.cupEmptyContainer,
                            cup.status === CupStatus.Filled && s.cupFilledContainer,
                            cup.status === CupStatus.Plused && s.cupPlusedContainer,
                        ]}>
                        {cup.status === CupStatus.Empty && <CupEmpty />}
                        {cup.status === CupStatus.Filled && <CupFilled />}
                        {cup.status === CupStatus.Plused && <CupPlus />}
                    </TouchableOpacity>
                ))}
            </View>
            {!scoreGotted && (
                <ButtonNext
                    onPress={addScoreForWatter}
                    disabled={dailyTodayActivityData?.watter !== 8}
                    title="Сделано"
                    oliveTitle="+ 3 балла"
                />
            )}
        </CardContainer>
    );
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
