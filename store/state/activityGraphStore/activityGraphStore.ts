import { makeAutoObservable } from 'mobx';
import { addDailyActivityApi, getDailyActivityApi, getGraphCaloriesActivityApi, getGraphStepsActivityApi, getIfgScoreActivityApi, getPeriodActivityApi } from './activityGraphStore.api';
import { DailyActivityModel, DailyCommonModel, StoreDailyActivities } from './models/models';

class DailyActivityStore {
  isLoading = false; // Состояние загрузки
  graphPeriodActivities: DailyActivityModel[] = [];
  graphCaloriesActivities: DailyCommonModel[] = [];
  graphStepsActivities: DailyCommonModel[] = [];
  graphIfgScoreActivities: DailyCommonModel[] = [];
  dailyActivityData: DailyActivityModel;
  dailyTodayActivityData: DailyActivityModel;
  dailyTodayActivityDataLoading = false;
  isGraphLoading = false; // Состояние загрузки
  dailyTodayActivityAddLoading = false;

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

  getDailyActivity = async (date_to) => {
    this.isLoading = true;
  //   this.errorMessage = '';
    await getDailyActivityApi(date_to)
      .then((result)=>{
        console.log('getDailyActivityApi',result.data.data);
        this.dailyActivityData = result.data.data;
      }
      )
      .catch((err)=>{
        console.log('ERROR', err.message);

      })
      .finally(()=>{this.isLoading = false;});
  };
  getDailyTodayActivity = async (date_to) => {
    this.dailyTodayActivityDataLoading = true;
  //   this.errorMessage = '';
    await getDailyActivityApi(date_to)
      .then((result)=>{
        console.log('getDailyTodayActivity',result.data.data);
        this.dailyTodayActivityData = result.data.data;
        console.log('getDailyTodayActivity dailyTodayActivityDataLoading',this.dailyTodayActivityDataLoading);

      }
      )
      .catch((err)=>{
        console.log('ERROR', err.message);

      })
      .finally(()=>{this.dailyTodayActivityDataLoading = false;});
  };
    getGraphCaloriesActivity = async (period) => {
        this.isGraphLoading = true;
      //   this.errorMessage = '';
        await getGraphCaloriesActivityApi(period)
          .then((result)=>{
            this.graphCaloriesActivities = result.data.data;
          }
          )
          .catch((err)=>{
            console.log('ERROR', err.message);

          })
          .finally(()=>{this.isGraphLoading = false;});
      };
      getGraphStepsActivity = async (period) => {
        this.isGraphLoading = true;
      //   this.errorMessage = '';
        await getGraphStepsActivityApi(period)
          .then((result)=>{
            this.graphStepsActivities = result.data.data;
          }
          )
          .catch((err)=>{
            console.log('ERROR', err.message);

          })
          .finally(()=>{this.isGraphLoading = false;});
      };
      getIfgScoreActivity = async (period) => {
        this.isGraphLoading = true;
      //   this.errorMessage = '';
        await getIfgScoreActivityApi(period)
          .then((result)=>{
            this.graphIfgScoreActivities = result.data.data;
          }
          )
          .catch((err)=>{
            console.log('ERROR', err.message);

          })
          .finally(()=>{this.isGraphLoading = false;});
      };
      addDailyActivity = async (field: string, value: number | boolean) => {
        console.log('addDailyActivityApi', field, value);

        // if (this.dailyTodayActivityAddLoading) {return;}
        this.dailyTodayActivityAddLoading = true;
      //   this.errorMessage = '';
        const model: StoreDailyActivities = {
          [field]: value,
        };
        console.log('addDailyActivityApi', model);
        await addDailyActivityApi(model)
          .then((result)=>{
            this.dailyTodayActivityData[field] = result.data.data[field];
          }
          )
          .catch((err)=>{
            console.log('ERROR', err.message);

          });
          // .finally(()=>{this.dailyTodayActivityAddLoading = false;});
      };
      addDailyActivityArray = async (model: StoreDailyActivities) => {
        // this.isLoading = true;
      //   this.errorMessage = '';
        console.log('addDailyActivityArray');
        await addDailyActivityApi(model)
          .then((result)=>{
            console.log('addDailyActivityArray result',result.data.data);
          }
          )
          .catch((err)=>{
            console.log('ERROR', err.message);

          });
          // .finally(()=>{this.isLoading = false;});
      };
}

const dailyActivityStore = new DailyActivityStore();
export default dailyActivityStore;
