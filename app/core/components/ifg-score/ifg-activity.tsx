import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Platform, NativeModules, NativeEventEmitter, AppState } from 'react-native';
import { ColumnarProgressBar } from '../../../screens/ifg-home/components/progressBar';
import { ActivityStats } from '../../../screens/ifg-home/data/data';
import gs from '../../styles/global';
import { IfgText } from '../text/ifg-text';
import Separator from '../../../../assets/icons/separator.svg';
import userStore from '../../../../store/state/userStore/userStore';
import { getHealthData } from '../../../hooks/getHealthData';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useHealthData } from '../../../hooks/useHealthData';
import { DailyActivityModel } from '../../../../store/state/activityGraphStore/models/models';
import colors from '../../colors/colors';
import dailyActivityStore from '../../../../store/state/activityGraphStore/activityGraphStore';
import { observer } from 'mobx-react';

export const IFGActivity:FC<{dailyActivities?: DailyActivityModel}>  = observer(({dailyActivities}) => {
  const [dailyValues, setDailyValues] = useState(dailyActivities);
  const {healthData} = useHealthData();
  useEffect(() => {
    console.log('dailyActivities', dailyActivities);
    setDailyValues(dailyActivities);
  }, [dailyActivities]);

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
            height={(dailyValues?.steps || healthData.steps || 0) / 10000 * 100}
            color={colors.GREEN_COLOR}/>
        <ColumnarProgressBar
            height={(dailyValues?.calories || healthData.caloriesBurned || 0) / 1500 * 100}
            color={colors.OLIVE_COLOR}/>
         <ColumnarProgressBar
            height={(dailyValues?.floor_spans || healthData.flightsClimbed || 0) / 10000 * 100}
            color={colors.ORANGE_COLOR}/>
        </View>
        <View style={[gs.flexRow]}>
        {/* {Object.keys(ActivityStats).map((name, index, arr)=>{
            return  <View style={gs.flexRow} key={index.toString()} >
            <View style={[index !== 0 && gs.ml12, {gap: 6}]}>
                <IfgText style={[gs.fontCaptionSmall, gs.medium]}>{name}</IfgText>
                <IfgText color={ActivityStats[name].color} style={[gs.fontCaptionMedium, gs.bold]}>
                {(healthData && name === 'Шаги') ? healthData?.steps : name === 'Калории' ? Math.round(healthData?.caloriesBurned) : healthData?.flightsClimbed}
                </IfgText>
            </View>
            {index !== arr.length - 1 && <View style={gs.ml12} />}
            {index !== arr.length - 1 && <Separator />}
            </View>;})
        } */}
        <View style={gs.flexRow} >
            <View style={{gap: 6}}>
                <IfgText style={[gs.fontCaptionSmall, gs.medium]}>{'Шаги'}</IfgText>
                <IfgText color={colors.GREEN_COLOR} style={[gs.fontCaptionMedium, gs.bold]}>
                {dailyValues?.steps || healthData.steps || 0}
                </IfgText>
            </View>
            <View style={gs.ml12} />
            <Separator />
        </View>
        <View style={gs.flexRow} >
            <View style={[gs.ml12, {gap: 6}]}>
                <IfgText style={[gs.fontCaptionSmall, gs.medium]}>{'Калории'}</IfgText>
                <IfgText color={colors.OLIVE_COLOR} style={[gs.fontCaptionMedium, gs.bold]}>
                {dailyValues?.calories || healthData.caloriesBurned || 0}
                </IfgText>
            </View>
            <View style={gs.ml12} />
            <Separator />
        </View>
        <View style={gs.flexRow} >
            <View style={[gs.ml12, {gap: 6}]}>
                <IfgText style={[gs.fontCaptionSmall, gs.medium]}>{'Пролеты'}</IfgText>
                <IfgText color={colors.ORANGE_COLOR} style={[gs.fontCaptionMedium, gs.bold]}>
                {dailyValues?.floor_spans || healthData.flightsClimbed || 0}
                </IfgText>
            </View>
        </View>
        </View>
    </View>
  </>;});
