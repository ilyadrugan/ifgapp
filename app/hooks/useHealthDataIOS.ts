import { NativeModules } from "react-native";

type HelthData = {
    caloriesBurned: number;
    flightsClimbed: number;
    steps: number;
  }
const { HealthModule } = NativeModules;

export const requestHealthKitAuthorizationIOS = async () => {
      try {
        const result = await HealthModule.requestAuthorization();
        // console.log('Authorization granted:', result);
        return true
      } catch (error) {
        // console.error('Authorization error:', error);
        return false
      }
    };

export const fetchHealthDataIOS = async () => {
      try {
        const res = await requestHealthKitAuthorizationIOS();
        if (res){
            const data = await HealthModule.fetchHealthData();
            return data
        }

        return {}
      } catch (error) {
        // console.error('Fetch error:', error);
      }
    };
export const fetchHealthDataForDate = async (dateIso: string) => {
    try {
        
        const data = await HealthModule.fetchHealthDataForDate(dateIso);
        return data
        return {}
      } catch (error) {
        // console.error('Fetch error:', error);
      }
}

export const fetchHealthDataFor30Days = async () => {
    try {
        
        const data = await HealthModule.fetchHealthDataLast30Days();
        return data
      } catch (error) {
        // console.error('Fetch error:', error);
      }
}
