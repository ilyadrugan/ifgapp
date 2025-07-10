import { makeAutoObservable } from 'mobx';
import { fetchStepsAndCaloriesByDate, fetchStepsAndCaloriesLast30Days, getHealthData } from '../../../app/hooks/getHealthData';
import { CalorieData, HealthDataByDate, HelthData, StepData } from './models/models';
import { Platform } from 'react-native';
import { fetchHealthDataFor30Days, fetchHealthDataForDate, fetchHealthDataIOS, requestHealthKitAuthorizationIOS } from '../../../app/hooks/useHealthDataIOS';
import { formatDateWithParamsMoment } from '../../../app/core/utils/formatDateTime';

class HealthStore {
  healthData: HelthData[] = [];
  caloriesData: CalorieData[] = [];
  stepsData: StepData[] = [];
  healthDataByDate: HealthDataByDate = {
    date: '',
    calories: 0,
    steps: 0,
    floors: 0
  };
  isLoading: boolean = false;
  healthDataToday: HealthDataByDate = {
    date: '',
    calories: 0,
    steps: 0,
    floors: 0
  };
  constructor() {
   makeAutoObservable(this); // Делаем объект реактивным
  }

  setHealthData (data: HelthData[]) {
    this.healthData = data;
  }
  async getStepsMonth () {
    if (Platform.OS === 'ios') 
    {
      const data = await fetchHealthDataFor30Days();
      this.caloriesData = data.map((item)=>{ return {created_at: item.date, calories: item.caloriesBurned}})
      this.stepsData = data.map((item)=>{ return {created_at: item.date, steps: item.steps}})
      return
    }
    // console.log('getStepsMonth');
    const res = await fetchStepsAndCaloriesLast30Days();
    this.caloriesData = res.caloriesData;
    this.stepsData = res.stepsData;
  }

  async getHealthDataByDate(date: Date, withNoload?: boolean) {
    if (Platform.OS === 'ios') {
      const dateStr = formatDateWithParamsMoment(date.toISOString(), '+03:00', 'YYYY-MM-DD')
      console.log('date', dateStr)
      const data = await fetchHealthDataForDate(dateStr)
      this.healthDataByDate = {
              date: dateStr || '',
              calories: data?.caloriesBurned || 0,
              steps: data?.steps || 0,
              floors: data?.flightsClimbed || 0
      }
      return
    }
    this.isLoading = withNoload ? false : true;
    await fetchStepsAndCaloriesByDate(date)
        .then(res=> {
          console.log('getHealthDataByDate res', res);
            this.healthDataByDate = {
              date: res?.date || '',
              calories: res?.calories || 0,
              steps: res?.steps || 0,
        };
        })
        .finally(()=>{
             this.isLoading = false;
        });

    this.isLoading = false;
  }
  async getHealthDataToday(withNoload?: boolean) {
    if (Platform.OS === 'ios') {
      const data = await fetchHealthDataIOS()
      this.healthDataToday = {
              date: data?.date || '',
              calories: data?.caloriesBurned || 0,
              steps: data?.steps || 0,
              floors: data?.flightsClimbed || 0
        } 
      return
    }
    this.isLoading = withNoload ? false : true;
    await fetchStepsAndCaloriesByDate(new Date())
        .then(res=> {
          console.log('fetchStepsAndCaloriesByDate res', res);
            this.healthDataToday = {
              date: res?.date || '',
              calories: res?.calories || 0,
              steps: res?.steps || 0,
        };
        })
        .finally(()=>{
             this.isLoading = false;
        });

    this.isLoading = false;

  }
}

const healthStore = new HealthStore();
export default healthStore;


