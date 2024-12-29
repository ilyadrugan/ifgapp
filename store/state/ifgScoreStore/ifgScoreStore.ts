import { makeAutoObservable } from 'mobx';
import { getIfgScoreApi } from './ifgScoreStore.api';


class IfgScoreStore {
  isLoading = false; // Состояние загрузки
  todayScore: number = 0;
  constructor() {
    makeAutoObservable(this); // Делаем объект реактивным
  }

  getScoreToday = async () => {
      this.isLoading = true;
    //   this.errorMessage = '';
      await getIfgScoreApi()
        .then((result)=>{
          console.log('result.data', result.data);
          this.todayScore = result.data.data.score;
        }
        )
        .catch((err)=>{
          console.log('ERROR', err.message);

        })
        .finally(()=>{this.isLoading = false;});
    };
}

const ifgScoreStore = new IfgScoreStore();
export default ifgScoreStore;

