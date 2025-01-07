import { makeAutoObservable } from 'mobx';
import { getGraphCaloriesActivityApi, getGraphStepsActivityApi, getIfgScoreActivityApi, getPeriodActivityApi } from './activityGraphStore.api';
import { DailyActivityModel, DailyCaloriesModel, DailyCommonModel, DailyIfgScoreModel, DailyStepsModel } from './models/models';

class DailyActivityStore {
  isLoading = false; // Состояние загрузки
  graphPeriodActivities: DailyActivityModel[] = [];
  graphCaloriesActivities: DailyCommonModel[] = [];
  graphStepsActivities: DailyCommonModel[] = [];
  graphIfgScoreActivities: DailyCommonModel[] = [];
  constructor() {
    makeAutoObservable(this); // Делаем объект реактивным
  }

  getPeriodActivity = async (date_from, date_to) => {
      this.isLoading = true;
    //   this.errorMessage = '';
      await getPeriodActivityApi(date_from, date_to)
        .then((result)=>{
          this.graphPeriodActivities = result.data.data;
        }
        )
        .catch((err)=>{
          console.log('ERROR', err.message);

        })
        .finally(()=>{this.isLoading = false;});
    };
    getGraphCaloriesActivity = async (period) => {
        this.isLoading = true;
      //   this.errorMessage = '';
        await getGraphCaloriesActivityApi(period)
          .then((result)=>{
            this.graphCaloriesActivities = result.data.data;
          }
          )
          .catch((err)=>{
            console.log('ERROR', err.message);

          })
          .finally(()=>{this.isLoading = false;});
      };
      getGraphStepsActivity = async (period) => {
        this.isLoading = true;
      //   this.errorMessage = '';
        await getGraphStepsActivityApi(period)
          .then((result)=>{
            this.graphStepsActivities = result.data.data;
          }
          )
          .catch((err)=>{
            console.log('ERROR', err.message);

          })
          .finally(()=>{this.isLoading = false;});
      };
      getIfgScoreActivity = async (period) => {
        this.isLoading = true;
      //   this.errorMessage = '';
        await getIfgScoreActivityApi(period)
          .then((result)=>{
            this.graphIfgScoreActivities = result.data.data;
          }
          )
          .catch((err)=>{
            console.log('ERROR', err.message);

          })
          .finally(()=>{this.isLoading = false;});
      };
}

const dailyActivityStore = new DailyActivityStore();
export default dailyActivityStore;
