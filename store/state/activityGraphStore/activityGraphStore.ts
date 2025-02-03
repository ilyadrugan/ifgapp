import { makeAutoObservable } from 'mobx';
import { addDailyActivityApi, getDailyActivityApi, getGraphCaloriesActivityApi, getGraphStepsActivityApi, getIfgScoreActivityApi, getPeriodActivityApi } from './activityGraphStore.api';
import { CupsDataModel, DailyActivityModel, DailyCommonModel, StoreDailyActivities } from './models/models';
import { CupStatus, CupsType } from '../../../app/screens/ifg-home/blocks/data/data-cups';

class DailyActivityStore {
  isLoading = false; // Состояние загрузки
  graphPeriodActivities: DailyActivityModel[] = [];
  graphCaloriesActivities: DailyCommonModel[] = [];
  graphStepsActivities: DailyCommonModel[] = [];
  graphIfgScoreActivities: DailyCommonModel[] = [];
  dailyActivityData: DailyActivityModel;
  dailyTodayActivityData: DailyActivityModel;
  cupsData: CupsDataModel;
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
  setCupsData = (watter: number, isDrinkEight: boolean) => {
    this.cupsData = {
      data: [0,1,2,3,4,5,6,7].map((item)=>
          {
              if (item < watter) {return {id: item, status: CupStatus.Filled} as CupsType;}
              if (item === watter) {return {id: item, status: CupStatus.Plused} as CupsType;}
              else {return {id: item, status: CupStatus.Empty} as CupsType;}
          }),
      watter: watter,
      isDrinkEight: isDrinkEight,
    };
  };
  onCupTap = (id: number, status: CupStatus, cb: ()=>void) => {
    const copyData = [...this.cupsData.data];
    switch (status){
                case CupStatus.Plused:
                    copyData[id].status = CupStatus.Filled;
                    if (id !== this.cupsData.data.length - 1)
                        {copyData[id + 1].status = CupStatus.Plused;}
                    break;
                case CupStatus.Filled:
                    const plusedCupIndex = this.cupsData.data.findIndex((cup: CupsType)=>cup.status === CupStatus.Plused);
                    if (plusedCupIndex < 0) {
                        copyData[this.cupsData.data.length - 1].status = CupStatus.Plused;
                    }
                    else {
                        copyData[plusedCupIndex].status = CupStatus.Empty;
                        copyData[plusedCupIndex - 1].status = CupStatus.Plused;
                    }
                    break;
      }
      this.cupsData.data = copyData;
      cb();
  };
  getDailyTodayActivity = async (date_to?:string) => {
    this.dailyTodayActivityDataLoading = true;
  //   this.errorMessage = '';
    await getDailyActivityApi(date_to || '')
      .then((result)=>{
        console.log('getDailyTodayActivity',result.data.data);
        this.dailyTodayActivityData = result.data.data;
        // this.setCupsData(result.data.data.watter, result.data.data.isDrinkEight);
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
            if (model.watter) {
              this.setCupsData(this.dailyTodayActivityData.watter, this.dailyTodayActivityData.isDrinkEight);
            }
            if (model.isDrinkEight) {
              this.setCupsData(this.dailyTodayActivityData.watter, true);
            }
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
}

const dailyActivityStore = new DailyActivityStore();
export default dailyActivityStore;
