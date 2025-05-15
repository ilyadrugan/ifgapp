import { fetchStepsAndCaloriesLast30Days } from '../../../app/hooks/getHealthData';
import { CalorieData, HelthData, StepData } from './models/models';

class HealthStore {
  healthData: HelthData[] = [];
  caloriesData: CalorieData[] = [];
  stepsData: StepData[] = [];

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
}

const healthStore = new HealthStore();
export default healthStore;


