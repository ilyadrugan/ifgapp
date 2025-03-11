import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { CupStatus, CupsType } from '../../../app/screens/ifg-home/blocks/data/data-cups';
import dailyActivityStore from '../activityGraphStore/activityGraphStore';
import ifgScoreStore from '../ifgScoreStore/ifgScoreStore';

class WatterStore {
  cupsData: CupsType[] = [];
  watterCount: number = 0;
  isDrinkEight: boolean = false;
  isLoading: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }
  updateCups(watter = 0) {
    this.cupsData = Array.from({ length: 8 }, (_, item) => ({
      id: item,
      status:
        item < watter
          ? CupStatus.Filled
          : item === watter
          ? CupStatus.Plused
          : CupStatus.Empty,
    }));
    console.log('this.cupsData', this.cupsData);
    this.watterCount = watter;
   }
   onCupTap() {
    this.updateCups(this.watterCount + 1);
    this.addWatterToActivityData(this.watterCount);
  }
   addWatterToActivityData = async (watter: number) => {
    if (this.watterCount === 1) {
        await dailyActivityStore.addDailyActivity('food', dailyActivityStore.dailyTodayActivityData.food + 1);
        await ifgScoreStore.addScore(1);
    }
    await dailyActivityStore.addDailyActivity('watter', watter);
  };
    addScoreForWatter = async () => {
      // setIsLoadingButton(true)
      this.isLoading = true;
      dailyActivityStore.addDailyActivity('watter', 8);
      dailyActivityStore.addDailyActivity('food', dailyActivityStore.dailyTodayActivityData.food + 2);
      await dailyActivityStore.addDailyActivity('isDrinkEight', true);
      await ifgScoreStore.addScore(2);
      this.isLoading = false;
      this.isDrinkEight = true;
      // setIsLoadingButton(false)
  };
}

const watterStore = new WatterStore();
export default watterStore;
