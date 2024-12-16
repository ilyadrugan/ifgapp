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
type HelthData = {
    caloriesBurned: number;
    flightsClimbed: number;
    steps: number;
  }
  const { HealthModule } = NativeModules;
export const IFGActivity:FC  = ()=> {
  const [date, setDate] = useState(new Date());
  const isFocused = useIsFocused();
    const [healthData, setHealthData] = useState<HelthData>({
      caloriesBurned: 0,
      flightsClimbed: 0,
      steps: 0,
    });


    const requestHealthKitAuthorizationIOS = async () => {
      try {
        const result = await HealthModule.requestAuthorization();
        // console.log('Authorization granted:', result);
      } catch (error) {
        // console.error('Authorization error:', error);
      }
    };

    const fetchHealthDataIOS = async () => {
      try {
        const data = await HealthModule.fetchHealthData();
        // console.log('Health data:', data);
        setHealthData(data);
      } catch (error) {
        // console.error('Fetch error:', error);
      }
    };
    const requestHealthData = async () => {
      const result = await getHealthData(date);
      // console.log(`Steps: ${result?.totalSteps} | Flights: ${result?.totalFloors} | Calories: ${result?.totalCalories}`);
      setHealthData({
        caloriesBurned: result?.totalCalories || 0,
        steps: result?.totalSteps || 0,
        flightsClimbed: result?.totalFloors || 0,
      });
    };
    useEffect(()=>{


      if (Platform.OS === 'ios') {
        requestHealthKitAuthorizationIOS();
        fetchHealthDataIOS();
      }
      // if (Platform.OS === 'android') {
      //   requestHealthData();
      // }

    },[]);
    useFocusEffect(
      React.useCallback(() => {
        if (Platform.OS === 'android') {
          // console.log('isFocused', isFocused);
          if (isFocused)
            {
              requestHealthData();

            }
        }
      }, [])
    );

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
                {(healthData && name === 'Шаги') ? healthData?.steps : name === 'Калории' ? Math.round(healthData?.caloriesBurned) : healthData?.flightsClimbed}
                {/* {Platform.OS === 'android' && ActivityStats[name].value} */}
                </IfgText>
            </View>
            {index !== arr.length - 1 && <View style={gs.ml12} />}
            {index !== arr.length - 1 && <Separator />}
            </View>;})
        }
        </View>
    </View>
  </>;};
