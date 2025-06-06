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
    aggregateGroupByPeriod,
    AggregateRequest,
  } from 'react-native-health-connect';
import { AggregateGroupByPeriodRequest, Permission } from 'react-native-health-connect/lib/typescript/types';
import { TimeRangeFilter } from 'react-native-health-connect/lib/typescript/types/base.types';
import { SdkAvailabilityStatus } from 'react-native-health-connect/src/constants';
import { showAlert } from '../core/utils/showAlert';
import { CheckAppState } from './checkAppState';
import { logMessage } from '../core/utils/logger';
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
function getTimeProgress(startTime: Date, endTime: Date): number {
  const now = new Date();
  const startMs = startTime.getTime();
  const endMs = endTime.getTime();
  const nowMs = now.getTime();

  // Если текущее время раньше начала промежутка
  if (nowMs < startMs) {return 0;}

  // Если текущее время позже конца промежутка
  if (nowMs > endMs) {return 1;}

  // Вычисляем общую длину промежутка и пройденное время
  const totalDuration = endMs - startMs;
  const elapsed = nowMs - startMs;

  // Возвращаем долю (от 0 до 1)
  return elapsed / totalDuration;
}
function getHoursDifference(date1: Date, date2: Date): number {
  // Разница в миллисекундах
  const diffMs = Math.abs(date1.getTime() - date2.getTime());

  // Переводим миллисекунды в часы (1 час = 3_600_000 мс)
  const diffHours = diffMs / (1000 * 60 * 60);

  // Возвращаем с округлением до 4 знаков (можно изменить)
  return parseFloat(diffHours.toFixed(4));
}
const checkAvailability = async () => {
    const status = await getSdkStatus();
    if (status === SdkAvailabilityStatus.SDK_AVAILABLE) {
          console.log('SDK is available');
    }

    if (status === SdkAvailabilityStatus.SDK_UNAVAILABLE) {
          console.log('SDK is not available');
          showAlert('Синхронизация с Health Connect','Для работы с данными, необходимо установить приложение Health Connect и выдать разрешение на чтение данных одного из стандартных приложений здоровья и ifeelgood с Health Connect', [{
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
          showAlert('Синхронизация с Health Connect','Для работы с данными, необходимо установить приложение Health Connect и выдать разрешение на чтение данных одного из стандартных приложений здоровья и ifeelgood с Health Connect', [{
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

const getStartOfDay = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
};

const getEndOfDay = (date: Date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d.toISOString();
};

interface LogMessage {
        text: string,
        steps: {
          result: number | string,
          dataOrigin: string,
        },
        calories: {
          result: number | string,
          dataOrigin: string,
        },
}

const logSending = (msg: LogMessage) => {
  logMessage(`${msg.text}; stepsResult: ${msg.steps.result}; stepsOrigin: ${msg.steps.dataOrigin}; caloriesResult: ${msg.calories.result}; caloriesOrigin: ${msg.calories.dataOrigin};`);
};

export const getHealthData = async (date: Date) => {
    if (Platform.OS !== 'android') {
      return;
    }
    console.log('date', date);
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
        // { accessType: 'read', recordType: 'ReadHealthDataHistory' },
        { accessType: 'read', recordType: 'TotalCaloriesBurned' },
        // { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
      ]).then((permissions) => {
        console.log('Granted permissions ', { permissions });
      });
      const grantedAllPermissions = await getGrantedPermissions();
        // console.log('grantedPermissions', grantedAllPermissions);
        if (grantedAllPermissions.length == 0){
          showAlert('Разрешение на предоставление данных с Health Connect','Для работы с данными, необходимо выдать разрешение на синхронизацию данных одного из стандартных приложений и ifeelgood с Health Connect', [{
            text: 'Сделаю позже',
            onPress: () => console.log('Ask me later pressed'),
            style: 'cancel',
          },
          {text: 'К разрешениям', onPress: openHealthConnectSettings},
        ],);
        }
      const logMsg = {
        text: 'getHealthDataToday',
        steps: {
          result: 0,
          dataOrigin: '',
        },
        calories: {
          result: 0,
          dataOrigin: '',
        },
      };
      const timeRangeFilter: TimeRangeFilter = {
        operator: 'between',
        endTime: date.toISOString(),
        startTime: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
      };
      console.log('timeRangeFilter', timeRangeFilter);
      // Steps
      // console.log('getting steps');
      const steps = await readRecords('Steps', { timeRangeFilter });
      // console.log('steps', steps.records);
      const totalSteps = steps.records.reduce((sum, cur, index) => {
        if (index === 0) {logMsg.steps.dataOrigin = cur.metadata?.dataOrigin || '';}
        return sum + cur.count;
      }, 0);

      // CALORIES_BURNED
      // console.log('getting total_calories');
      const calories = await readRecords('TotalCaloriesBurned', {
      timeRangeFilter,
      });
      // console.log('calories', calories.records);
      calories.records.forEach((rec)=>{
        console.log('rec.energy.inKilocalories', rec);
        logMsg.calories.dataOrigin = rec.metadata?.dataOrigin || '';
      });
      const totalCalories = calories.records.reduce((sum, cur, index, arr) => {
        if (cur.metadata?.dataOrigin === 'com.google.android.apps.fitness' && (index === arr.length - 1)){
          return sum + (cur.energy.inKilocalories * getTimeProgress(new Date(cur.startTime), new Date(cur.endTime)));
        }
        return sum + cur.energy.inKilocalories;
      }, 0);
      logMsg.calories.result = totalCalories;
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
    logMsg.steps.result = totalSteps;
    logMsg.calories.result = totalCalories;
    logSending(logMsg);
    return {totalSteps, totalCalories, totalFloors};
  };

function isDateInFuture(selectedDate: Date): boolean {
  const now = new Date();
  return selectedDate.getTime() > now.getTime();
}
export async function fetchStepsAndCaloriesByDate(date: Date) {
  if (isDateInFuture(date)) {
    return {
      date: date.toISOString().slice(0, 10),
      steps: 0,
      calories: 0,
    };
  }
  const timeRangeFilter = {
    operator: 'between',
    startTime: getStartOfDay(date),
    endTime: getEndOfDay(date),
  } as const;

  const timeRangeSlicer = {
    period: 'DAYS',
    length: 1,
  } as const;

  // Получаем шаги
  const stepResults = await aggregateGroupByPeriod<'Steps'>({
    recordType: 'Steps',
    timeRangeFilter,
    timeRangeSlicer,
  });

  // Получаем калории
  const calorieResults = await aggregateGroupByPeriod<'TotalCaloriesBurned'>({
    recordType: 'TotalCaloriesBurned',
    timeRangeFilter,
    timeRangeSlicer,
  });

  const steps = stepResults[0]?.result?.COUNT_TOTAL || 0;
  const calories =
    Math.ceil(calorieResults[0]?.result?.ENERGY_TOTAL?.inKilocalories) || 0;
  const logMsg = {
        text: 'fetchStepsAndCaloriesByDate ' + date.toISOString().slice(0, 10),
        steps: {
          result: steps,
          dataOrigin: stepResults[0]?.result.dataOrigins[0] || '',
        },
        calories: {
          result: calories,
          dataOrigin: calorieResults[0]?.result.dataOrigins[0] || '',
        },
      };
  logSending(logMsg);
  return {
    date: date.toISOString().slice(0, 10),
    steps,
    calories,
  };
}

export async function fetchStepsAndCaloriesLast30Days() {
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 29); // включительно 30 дней

  const timeRangeFilter = {
    operator: 'between',
    startTime: getStartOfDay(thirtyDaysAgo),
    endTime: getEndOfDay(now),
  } as const;

  const timeRangeSlicer = {
    period: 'DAYS',
    length: 1,
  } as const;

  // Получаем шаги
  const stepResults = await aggregateGroupByPeriod<'Steps'>({
    recordType: 'Steps',
    timeRangeFilter,
    timeRangeSlicer,
  });
  console.log('stepResults', stepResults.length);
  // Получаем калории
  const calorieResults = await aggregateGroupByPeriod<'TotalCaloriesBurned'>({
    recordType: 'TotalCaloriesBurned',
    timeRangeFilter,
    timeRangeSlicer,
  });
  // console.log('calorieResults', calorieResults.length);
  const stepsData = stepResults.map((stepItem, index, arr)=>{
    return {
      created_at: stepItem.startTime,
      steps: (stepItem.result.COUNT_TOTAL || 0),
      // calories: clr,
    };
  });
  const caloriesData = calorieResults.map((calorieItem, index, arr)=>{

    const clr = (calorieItem.result.dataOrigins.includes('com.google.android.apps.fitness') && (index === arr.length - 1)) ? Math.ceil(calorieItem.result.ENERGY_TOTAL.inKilocalories * getTimeProgress(new Date(calorieItem.startTime), new Date(calorieItem.endTime))) : Math.ceil(calorieItem.result.ENERGY_TOTAL.inKilocalories || 0);
    return {
      created_at: calorieItem.startTime,
      // steps: (stepItem.result.COUNT_TOTAL || 0),
      calories: clr,
    };
  });
  // Объединяем результаты по дате
  const logMsg = {
        text: 'fetchStepsAndCaloriesLast30Days',
        steps: {
          result: stepsData.map(step=>step.steps.toString()).join(' '),
          dataOrigin: stepResults[0]?.result.dataOrigins[0] || '',
        },
        calories: {
          result: caloriesData.map(cal=>cal.calories.toString()).join(' '),
          dataOrigin: calorieResults[0]?.result.dataOrigins[0] || '',
        },
      };
  logSending(logMsg);
  console.log('mergedData', stepsData, caloriesData);
  // return mergedData;
  return {stepsData, caloriesData};
}

