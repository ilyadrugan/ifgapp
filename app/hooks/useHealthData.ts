import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { NativeModules, Platform } from 'react-native';
import { fetchStepsAndCaloriesByDate, getHealthData } from './getHealthData';
import dailyActivityStore from '../../store/state/activityGraphStore/activityGraphStore';
import { StoreDailyActivities } from '../../store/state/activityGraphStore/models/models';

type HelthData = {
    caloriesBurned: number;
    flightsClimbed: number;
    steps: number;
  }
const { HealthModule } = NativeModules;

export function useHealthData(date?: Date) {
  const isFocused = useIsFocused();
  const [isRequesting, setIsRequesting] = useState(false);
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
      const result = await fetchStepsAndCaloriesByDate(date || new Date());
      // console.log(`Steps: ${result?.totalSteps} | Flights: ${result?.totalFloors} | Calories: ${result?.totalCalories}`);
      setHealthData({
        caloriesBurned: result?.calories || 0,
        steps: result?.steps || 0,
        flightsClimbed: result?.totalFloors || 0,
      });
      setDataToDailyActivities({
        steps: result?.steps,
        calories: result?.calories,
        floor_spans: result?.totalFloors,
      });
      setIsRequesting(false);

    };
    const setDataToDailyActivities = (model: StoreDailyActivities) => {
      dailyActivityStore.addDailyActivityArray(model);
    };
    useEffect(()=>{
      if (isRequesting) {return;}
      if (Platform.OS === 'ios') {
        requestHealthKitAuthorizationIOS();
        fetchHealthDataIOS();
      }
      if (Platform.OS === 'android') {
        setIsRequesting(true);
        requestHealthData();
      }
    },[]);

    // useFocusEffect(
    //   React.useCallback(() => {
    //     if (isRequesting) {return;}
    //     if (Platform.OS === 'android') {
    //       console.log('isFocused', isFocused);
    //       if (isFocused)
    //         {
    //           setIsRequesting(true);
    //           requestHealthData();

    //         }
    //     }
    //   }, [])
    // );
    // useEffect(() => {
    //   if (Platform.OS === 'android') {
    //     console.log('isFocused', isFocused);
    //     if (isFocused)
    //       {
    //         requestHealthData();

    //       }
    //   }
    // }, []);

    return { healthData };
}
