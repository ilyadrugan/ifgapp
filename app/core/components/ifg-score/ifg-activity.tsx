import React, { FC, useEffect, useState } from 'react';
import { View, Platform, NativeModules } from 'react-native';
import { ColumnarProgressBar } from '../../../screens/ifg-home/components/progressBar';
import { ActivityStats } from '../../../screens/ifg-home/data/data';
import gs from '../../styles/global';
import { IfgText } from '../text/ifg-text';
import Separator from '../../../../assets/icons/separator.svg';
import userStore from '../../../../store/state/userStore/userStore';

type HelthData = {
    caloriesBurned: number;
    flightsClimbed: number;
    steps: number;
  }
  const { HealthModule} = NativeModules;
export const IFGActivity:FC  = ()=> {
    const [healthData, setHealthData] = useState<HelthData>();


    const requestHealthKitAuthorization = async () => {
      try {
        const result = await HealthModule.requestAuthorization();
        console.log('Authorization granted:', result);
      } catch (error) {
        console.error('Authorization error:', error);
      }
    };

    const fetchHealthData = async () => {
      try {
        const data = await HealthModule.fetchHealthData();
        console.log('Health data:', data);
        setHealthData(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    useEffect(()=>{
      if (Platform.OS === 'ios') {
        requestHealthKitAuthorization();
        fetchHealthData();
      }
      // if (Platform.OS === 'android') {
      //   setHealthData({caloriesBurned: 500,
      //     flightsClimbed: 1,
      //     steps: 1000});
      // }
    console.log('userStore.userInfo', userStore.userInfo, userStore.isLoading);

    },[]);
    return <>
    <IfgText style={[gs.fontCaption2, gs.bold]}>Активность</IfgText>
    <View  style={[gs.flexRow, gs.alignCenter, {gap: 2, justifyContent: 'space-between'}]}>
        <View style={[gs.flexRow, {gap: 2}]}>
        {Object.keys(ActivityStats).map((name, index)=>

            <ColumnarProgressBar
            key={index.toString()}
            height={ActivityStats[name].value / ActivityStats[name].standart_value * 100}
            color={ActivityStats[name].color}/>
        )}
        </View>
        <View style={[gs.flexRow]}>
        {Object.keys(ActivityStats).map((name, index, arr)=>{
            return  <View style={gs.flexRow} key={index.toString()} >
            <View style={[index !== 0 && gs.ml12, {gap: 6}]}>
                <IfgText style={[gs.fontCaptionSmall, gs.medium]}>{name}</IfgText>
                <IfgText color={ActivityStats[name].color} style={[gs.fontCaptionMedium, gs.bold]}>
                {Platform.OS === 'ios' && (healthData && name === 'Шаги') ? healthData?.steps : name === 'Калории' ? healthData?.caloriesBurned : healthData?.flightsClimbed}
                {Platform.OS === 'android' && ActivityStats[name].value}
                </IfgText>
            </View>
            { index !== arr.length - 1 &&   <View style={gs.ml12} />}
                <Separator />
            </View>;})
        }
        </View>
    </View>
  </>;};
