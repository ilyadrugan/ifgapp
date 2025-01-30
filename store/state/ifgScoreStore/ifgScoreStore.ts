import { makeAutoObservable } from 'mobx';
import { addIfgScoreApi, getIfgScoreApi, getTodayIfgScoreApi } from './ifgScoreStore.api';
import { successToast } from '../../../app/core/components/toast/toast';


class IfgScoreStore {
  isLoading = false; // Состояние загрузки
  todayScore: number = 0;
  constructor() {
    makeAutoObservable(this); // Делаем объект реактивным
  }

  getTotalScore = async () => {
      this.isLoading = true;
    //   this.errorMessage = '';
      await getIfgScoreApi()
        .then((result)=>{
          console.log('result.data', result.data);
          this.todayScore = result.data.total;
        }
        )
        .catch((err)=>{
          console.log('ERROR', err.message);

        })
        .finally(()=>{this.isLoading = false;});
    };
   getScoreToday = async () => {
      this.isLoading = true;
    //   this.errorMessage = '';
      await getTodayIfgScoreApi()
        .then((result)=>{
          this.todayScore = result.data.data.score;
        }
        )
        .catch((err)=>{
          console.log('ERROR', err.message);

        })
        .finally(()=>{this.isLoading = false;});
    };
  addScore = async (score: number) => {
    // this.isLoading = true;
    //   this.errorMessage = '';
      await addIfgScoreApi(score + this.todayScore)
        .then((result)=>{
          console.log('result.data', result.data);
          this.todayScore = Number(score) + Number(this.todayScore);
          successToast(`Зачислено баллов: +${score}`);
        }
        )
        .catch((err)=>{
          console.log('ERROR addIfgScoreApi', err.message);

        });
        // .finally(()=>{this.isLoading = false;});
  };
}

const ifgScoreStore = new IfgScoreStore();
export default ifgScoreStore;

