import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { NativeModules, Platform } from 'react-native';
import { getHealthData } from './getHealthData';

type HelthData = {
    caloriesBurned: number;
    flightsClimbed: number;
    steps: number;
  }
const { HealthModule } = NativeModules;

export function useHealthData(date?: Date) {
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
      const result = await getHealthData(date || new Date());
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
      if (Platform.OS === 'android') {
        requestHealthData();
      }
    },[]);
    // useFocusEffect(
    //   React.useCallback(() => {
    //     if (Platform.OS === 'android') {
    //       // console.log('isFocused', isFocused);
    //       if (isFocused)
    //         {
    //           requestHealthData();

    //         }
    //     }
    //   }, [])
    // );
    return { healthData };
}
