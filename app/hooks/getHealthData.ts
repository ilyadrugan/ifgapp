import { useState, useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import {
    initialize,
    requestPermission,
    readRecords,
    getSdkStatus,
    getGrantedPermissions,
    openHealthConnectDataManagement,
    openHealthConnectSettings,
    revokeAllPermissions,
  } from 'react-native-health-connect';
import { Permission } from 'react-native-health-connect/lib/typescript/types';
import { TimeRangeFilter } from 'react-native-health-connect/lib/typescript/types/base.types';
import { SdkAvailabilityStatus } from 'react-native-health-connect/src/constants';
import { showAlert } from '../core/utils/showAlert';
import { CheckAppState } from './checkAppState';
// const showAlert = () =>
//     Alert.alert(
//       'Внимание!',
//       'Для работы с данными, необходимо установить приложение Health Connect для синхронизации', [
//         {
//           text: 'Сделаю позже',
//           onPress: () => console.log('Ask me later pressed'),
//           style: 'cancel',
//         },
//         // {
//         //   text: 'Cancel',
//         //   onPress: () => console.log('Cancel Pressed'),
//         //   style: 'cancel',
//         // },
//         {text: 'Скачать', onPress: ()=>Linking.openURL('market://details?id=com.google.android.apps.healthdata')},
//       ]);

const checkAvailability = async () => {
    const status = await getSdkStatus();
    if (status === SdkAvailabilityStatus.SDK_AVAILABLE) {
          console.log('SDK is available');
    }

    if (status === SdkAvailabilityStatus.SDK_UNAVAILABLE) {
          console.log('SDK is not available');
          showAlert('Синхронизация с Health Connect','Для работы с данными, необходимо установить приложение Health Connect и выдать разрешение на чтение данных одного из стандартных приложений здоровья и iFeelGood с Health Connect', [{
                      text: 'Сделаю позже',
                      onPress: () => console.log('Ask me later pressed'),
                      style: 'cancel',
                    },
                    {text: 'Скачать', onPress: ()=>Linking.openURL('market://details?id=com.google.android.apps.healthdata')},
                  ],);
        }

        if (
          status === SdkAvailabilityStatus.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED
        ) {
          console.log('SDK is not available, provider update required');
          showAlert('Синхронизация с Health Connect','Для работы с данными, необходимо установить приложение Health Connect и выдать разрешение на чтение данных одного из стандартных приложений здоровья и iFeelGood с Health Connect', [{
            text: 'Сделаю позже',
            onPress: () => console.log('Ask me later pressed'),
            style: 'cancel',
          },
          {text: 'Скачать', onPress: ()=>Linking.openURL('market://details?id=com.google.android.apps.healthdata')},
        ],);
        }
      };
      const initializeHealthConnect = async () => {
        const isInitialized = await initialize();
        console.log({ isInitialized });
        return isInitialized;
      };

export const getHealthData = async (date: Date) => {
    if (Platform.OS !== 'android') {
      return;
    }

    checkAvailability();

    // Android - Health Connect

      // initialize the client
     const result  = initializeHealthConnect();
      if (!result) {
        console.log('!isInitialized', result);
        return;
      }
      // revokeAllPermissions();
      console.log('request permissions');
      // request permissions
      const grantedPermissions = await requestPermission([
        { accessType: 'read', recordType: 'Steps' },
        { accessType: 'read', recordType: 'FloorsClimbed' },
        // { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
        { accessType: 'read', recordType: 'TotalCaloriesBurned' },
      ]).then((permissions) => {
        console.log('Granted permissions ', { permissions });
      });
      const grantedAllPermissions = await getGrantedPermissions();
        // console.log('grantedPermissions', grantedAllPermissions);
        if (grantedAllPermissions.length == 0){
          showAlert('Разрешение на предоставление данных с Health Connect','Для работы с данными, необходимо выдать разрешение на синхронизацию данных одного из стандартных приложений и iFeelGood с Health Connect', [{
            text: 'Сделаю позже',
            onPress: () => console.log('Ask me later pressed'),
            style: 'cancel',
          },
          {text: 'К разрешениям', onPress: openHealthConnectSettings},
        ],);
        }
      const timeRangeFilter: TimeRangeFilter = {
        operator: 'between',
        startTime: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
        endTime: new Date(date.setHours(23, 59, 59, 999)).toISOString(),
      };

      // Steps
      // console.log('getting steps');
      const steps = await readRecords('Steps', { timeRangeFilter });
      // console.log('steps', steps.records);
      const totalSteps = steps.records.reduce((sum, cur) => sum + cur.count, 0);

      // CALORIES_BURNED
      // console.log('getting total_calories');
      const calories = await readRecords('TotalCaloriesBurned', {
      timeRangeFilter,
      });
      // console.log('calories', calories.records);

      const totalCalories = calories.records.reduce((sum, cur) => sum + cur.energy.inKilocalories, 0);
      // console.log('total_calories', totalCalories);

      // Floors climbed
      const floorsClimbed = await readRecords('FloorsClimbed', {
        timeRangeFilter,
      });
      let totalFloors = floorsClimbed.records.reduce((sum, cur) => sum + cur.floors, 0);
      // console.log('totalFloors', totalFloors);
      // if (totalFloors === 0) {
      //   const steps = await readRecords('Steps', { timeRangeFilter });
      //   const elevationData = await readRecords('ElevationGained', { timeRangeFilter });
      //   console.log('elevationData', elevationData);
      //   if (elevationData.records.length > 0) {
      //     const totalElevation = elevationData.records.reduce((sum, item) => sum + item.elevation.inMeters, 0);
      //     console.log('totalElevation', totalElevation);
      //     const estimatedFloors = totalElevation / 3; // 3 метра — средняя высота этажа
      //     totalFloors = estimatedFloors;
      //   }
      // }

    return {totalSteps, totalCalories, totalFloors};



  };
