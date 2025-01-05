import { makeAutoObservable } from 'mobx';
import { BASE_URL } from '../../../app/core/hosts';
import axios from 'axios';
import { errorToast, successToast } from '../../../app/core/components/toast/toast';
import { getRecommendationsApi } from './recommendationStore.api';
import { RecommendationsModel } from './models/models';


class RecommendationStore {
  isLoading = false; // Состояние загрузки
  recommendationList: RecommendationsModel[] = [];
  constructor() {
    makeAutoObservable(this); // Делаем объект реактивным
  }

  getRecommendations = async () => {
      this.isLoading = true;
    //   this.errorMessage = '';
      await getRecommendationsApi()
        .then((result)=>{
          this.recommendationList = result.data;
          console.log(' this.recommendationList', this.recommendationList);

        }
        )
        .catch((err)=>{
          console.log('ERROR', err.message);

        })
        .finally(()=>{this.isLoading = false;});
    };


}

const recommendationStore = new RecommendationStore();
export default recommendationStore;

