import { makeAutoObservable } from 'mobx';
import { addDailyActivityApi, getDailyActivityApi, getDailyActivitySettingsApi, getGraphCaloriesActivityApi, getGraphStepsActivityApi, getIfgScoreActivityApi, getPeriodActivityApi, setDailyActivitySettingsApi } from './activityGraphStore.api';
import { DailyActivityModel, DailyActivitySettingsModel, DailyCommonModel, StoreDailyActivities } from './models/models';
import { errorToast, successToast } from '../../../app/core/components/toast/toast';

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
  dailyActivitySettings: DailyActivitySettingsModel = {
    steps: 10000,
    calories: 1500,
    floor_spans: 50,
    ifg_scores: 100,
  };
  dailyActivitySettingsToSend: DailyActivitySettingsModel = {
    steps: 10000,
    calories: 1500,
    floor_spans: 50,
    ifg_scores: 100,
  };
  constructor() {
    makeAutoObservable(this);
}
  setDailyActivitySettingsForSend = (field: string, val: number) => {
    this.dailyActivitySettingsToSend[field] = val;
  };
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
    console.log('getDailyActivity date_to',date_to);
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

  addWatter = (watter: number) => {
    this.dailyTodayActivityData = { ...this.dailyTodayActivityData, watter: watter };
    console.log('this.dailyTodayActivityData', this.dailyTodayActivityData);
  };

  getDailyTodayActivity = async (date_to?:string) => {
    console.log('getDailyTodayActivity date_to',date_to);

    this.dailyTodayActivityDataLoading = true;
  //   this.errorMessage = '';
    await getDailyActivityApi(date_to || '')
      .then((result)=>{
        console.log('getDailyTodayActivity',result.data.data);
        this.dailyTodayActivityData = result.data.data;
        if (this.dailyTodayActivityData.watter === undefined) {
          this.addWatter(0);
        }
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
        // console.log('addDailyActivityApi', field, value);

        // if (this.dailyTodayActivityAddLoading) {return;}
        this.dailyTodayActivityAddLoading = true;
      //   this.errorMessage = '';
        const model: StoreDailyActivities = {
          [field]: value,
        };
        console.log('addDailyActivityApi', model);
        await addDailyActivityApi(model)
          .then((result)=>{
            this.dailyTodayActivityData = { ...this.dailyTodayActivityData, [field]: value };
            // if (model.watter) {
            //   this.setCupsData(this.dailyTodayActivityData.watter, this.dailyTodayActivityData.isDrinkEight);
            // }
            // if (model.isDrinkEight) {
            //   this.setCupsData(this.dailyTodayActivityData.watter, true);
            // }
            console.log('addDailyActivityApi, result', result.data);
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
      getDailyActivitySettings = async () => {
        // this.isLoading = true;
      //   this.errorMessage = '';
        console.log('getDailyActivitySettings');
        await getDailyActivitySettingsApi()
          .then((result)=>{
            console.log('getDailyActivitySettings result',result.data);
            this.dailyActivitySettings = result.data.settings;
          }
          )
          .catch((err)=>{
            console.log('ERROR', err.message);

          });
          // .finally(()=>{this.isLoading = false;});
      };
      setDailyActivitySettings = async (model: DailyActivitySettingsModel) => {
        // this.isLoading = true;
      //   this.errorMessage = '';
        console.log('setDailyActivitySettings');
        await setDailyActivitySettingsApi(model)
          .then((result)=>{
            console.log('setDailyActivitySettings result',result.data);
            this.dailyActivitySettings = result.data;
            successToast('Цели успешно изменены!');
          }
          )
          .catch((err)=>{
            console.log('setDailyActivitySettings ERROR', err.message);
            errorToast('Неизвестная ошибка');
          });
          // .finally(()=>{this.isLoading = false;});
      };
}

const dailyActivityStore = new DailyActivityStore();
export default dailyActivityStore;
