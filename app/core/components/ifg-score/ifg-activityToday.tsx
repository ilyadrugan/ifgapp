import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { ColumnarProgressBar } from '../../../screens/ifg-home/components/progressBar';
import gs from '../../styles/global';
import { IfgText } from '../text/ifg-text';
import Separator from '../../../../assets/icons/separator.svg';
import colors from '../../colors/colors';
import dailyActivityStore from '../../../../store/state/activityGraphStore/activityGraphStore';
import { observer } from 'mobx-react';
import healthStore from '../../../../store/state/healthStore/healthStore';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { hexToRgba } from '../../utils/hexToRGBA';

export const IFGActivityToday:FC  = observer(() => {
    //new Date('2024-12-12T00:00:00')
    // const {healthData} = useHealthData();
    useEffect(() => {
        // console.log('dailyActivityStore.dailyActivitySettings', dailySettings);
        // console.log('dailyActivityStore.dailyActivities', dailyActivities);
        console.log('healthStore.healthDataToday', healthStore.healthDataToday);
    }, []);
    const ValueShimmerCard = (color: string) => <ShimmerPlaceholder
        shimmerColors={[hexToRgba(color, 0.2), hexToRgba(color, 0.8)]}
        style={[{width: 30,  height: 20,  borderRadius: 6 }, gs.mr12]}
        />;
    return <>
    <IfgText style={[gs.fontCaption2, gs.bold]}>Активность</IfgText>
    <View  style={[gs.flexRow, gs.alignCenter, {gap: 2, justifyContent: 'space-between'}]}>
        <View style={[gs.flexRow, {gap: 2}]}>
        {/* {Object.keys(ActivityStats).map((name, index)=>
            <ColumnarProgressBar
            key={index.toString()}
            height={ActivityStats[name].value / ActivityStats[name].standart_value * 100}
            color={ActivityStats[name].color}/>
        )} */}
        <ColumnarProgressBar
            height={healthStore.healthDataToday.steps / (dailyActivityStore.dailyActivitySettings.steps) * 100}
            color={colors.GREEN_COLOR}/>
        <ColumnarProgressBar
            height={healthStore.healthDataToday.calories / (dailyActivityStore.dailyActivitySettings.calories) * 100}
            color={colors.OLIVE_COLOR}/>
         <ColumnarProgressBar
            height={healthStore.healthDataToday.floors || 0 / (dailyActivityStore.dailyActivitySettings.floor_spans) * 100}
            color={colors.ORANGE_COLOR}/>
        </View>
        <View style={[gs.flexRow]}>
        <View style={gs.flexRow} >

            <View style={{gap: 6}}>
                <IfgText style={[gs.fontCaptionSmall, gs.medium]}>{'Шаги'}</IfgText>
                 {healthStore.isLoading ? ValueShimmerCard(colors.GREEN_COLOR) :
                <IfgText color={healthStore.isLoading ? '#54B6734c' : colors.GREEN_COLOR} style={[gs.fontCaptionMedium, gs.bold]}>
                {Math.round(healthStore.healthDataToday.steps)}
                </IfgText>}
            </View>

            <View style={gs.ml12} />
            <Separator />
        </View>
        <View style={gs.flexRow} >

            <View style={[gs.ml12, {gap: 6}]}>
                <IfgText style={[gs.fontCaptionSmall, gs.medium]}>{'Калории'}</IfgText>
                {healthStore.isLoading ? ValueShimmerCard(colors.OLIVE_COLOR) :
                <IfgText color={healthStore.isLoading ? 'rgba(0,0,0,0.3)' : colors.OLIVE_COLOR} style={[gs.fontCaptionMedium, gs.bold]}>
                {Math.round(healthStore.healthDataToday.calories)}
                </IfgText>
                }
            </View>
            <View style={gs.ml12} />
            <Separator />
        </View>
        <View style={gs.flexRow} >

            <View style={[gs.ml12, {gap: 6}]}>
                <IfgText style={[gs.fontCaptionSmall, gs.medium]}>{'Пролеты'}</IfgText>
                {healthStore.isLoading ? ValueShimmerCard(colors.ORANGE_COLOR) :
                <IfgText color={healthStore.isLoading ? 'rgba(0,0,0,0.3)' : colors.ORANGE_COLOR} style={[gs.fontCaptionMedium, gs.bold]}>
                { healthStore.healthDataToday.floors || 0}
                </IfgText>}
            </View>

        </View>
        </View>
    </View>
  </>;});
