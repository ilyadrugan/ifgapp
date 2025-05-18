import { fetchStepsAndCaloriesByDate, fetchStepsAndCaloriesLast30Days, getHealthData } from '../../../app/hooks/getHealthData';
import { CalorieData, HealthDataByDate, HelthData, StepData } from './models/models';

class HealthStore {
  healthData: HelthData[] = [];
  caloriesData: CalorieData[] = [];
  stepsData: StepData[] = [];
  healthDataByDate: HealthDataByDate;

  setHealthData (data: HelthData[]) {
    this.healthData = data;
  }
  async getStepsMonth () {
    // console.log('getStepsMonth');
    const res = await fetchStepsAndCaloriesLast30Days();
    console.log('getStepsMonth',res);
    this.caloriesData = res.caloriesData;
    this.stepsData = res.stepsData;
  }

  async getHealthDataByDate(date: Date) {
    console.log('getHealthDataByDate', date);
    const res = await fetchStepsAndCaloriesByDate(date);
    console.log('getHealthDataByDate', res);
    this.healthDataByDate = res;
  }
}

const healthStore = new HealthStore();
export default healthStore;


