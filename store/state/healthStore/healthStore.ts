import { makeAutoObservable } from 'mobx';
import { fetchStepsAndCaloriesByDate, fetchStepsAndCaloriesLast30Days, getHealthData } from '../../../app/hooks/getHealthData';
import { CalorieData, HealthDataByDate, HelthData, StepData } from './models/models';
import { Platform } from 'react-native';

class HealthStore {
  healthData: HelthData[] = [];
  caloriesData: CalorieData[] = [];
  stepsData: StepData[] = [];
  healthDataByDate: HealthDataByDate = {
    date: '',
    calories: 0,
    steps: 0,
  };
  isLoading: boolean = false;
  healthDataToday: HealthDataByDate = {
    date: '',
    calories: 0,
    steps: 0,
  };
  constructor() {
   makeAutoObservable(this); // Делаем объект реактивным
  }

  setHealthData (data: HelthData[]) {
    this.healthData = data;
  }
  async getStepsMonth () {
    if (Platform.OS === 'ios') return
    // console.log('getStepsMonth');
    const res = await fetchStepsAndCaloriesLast30Days();
    console.log('getStepsMonth',res);
    this.caloriesData = res.caloriesData;
    this.stepsData = res.stepsData;
  }

  async getHealthDataByDate(date: Date, withNoload?: boolean) {
    if (Platform.OS === 'ios') return
    this.isLoading = withNoload ? false : true;
    console.log('getHealthDataByDate');
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
    if (Platform.OS === 'ios') return
    this.isLoading = withNoload ? false : true;
    console.log('getHealthDataToday');
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


