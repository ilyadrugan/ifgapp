import { makeAutoObservable } from 'mobx';
import { BASE_URL } from '../../../app/core/hosts';
import axios from 'axios';
import { errorToast, successToast } from '../../../app/core/components/toast/toast';
import { completeRecommendationApi, getPersonalRecommendationsApi, getRecommendationsApi, storeRecommendationApi } from './recommendationStore.api';
import { PersonalRecommendationModel, RecommendationsModel } from './models/models';


class RecommendationStore {
  isLoading = false; // Состояние загрузки
  recommendationList: RecommendationsModel = {
     Сон: [],
        Питание: [],
        Антистресс: [],
      'Физическая активность': [],
  };
  personalRecomendationList: PersonalRecommendationModel[] = [];
  constructor() {
    makeAutoObservable(this); // Делаем объект реактивным
  }

  getRecommendations = async (resultTestId: number) => {
    console.log('getRecommendations', resultTestId);
      this.isLoading = true;
      await getRecommendationsApi(resultTestId)
        .then((result)=>{
          this.recommendationList = result.data;
          console.log('this.recommendationList', this.recommendationList);
        }
        )
        .catch((err)=>{
          console.log('getRecommendationsApi ERROR', err.message);
        })
        .finally(()=>{this.isLoading = false;});
    };
    getPersonalRecommendations = async () => {
      console.log('getPersonalRecommendations');
        this.isLoading = true;
        await getPersonalRecommendationsApi()
          .then((result)=>{
            this.personalRecomendationList = result.data;
            console.log('this.personalReacomendationList', this.personalRecomendationList);
          }
          )
          .catch((err)=>{
            console.log('getPersonalRecommendations ERROR', err.message);
          })
          .finally(()=>{this.isLoading = false;});
      };
    storeRecommendation = async (line_text: string) => {
        console.log('storeRecommendation');
          this.isLoading = true;
          await storeRecommendationApi(line_text)
            .then((result)=>{
              console.log('storeRecommendationApi result', result.data);
            }
            )
            .catch((err)=>{
              console.log('storeRecommendationApi ERROR', err.message);
            })
            .finally(()=>{this.isLoading = false;});
        };
      completeRecommendation = async (id: string) => {
          console.log('completeRecommendation');
            this.isLoading = true;
            await completeRecommendationApi(id)
              .then((result)=>{
                console.log('completeRecommendationApi result', result.data);
              }
              )
              .catch((err)=>{
                console.log('completeRecommendationApi ERROR', err.message);
              })
              .finally(()=>{this.isLoading = false;});
          };

}

const recommendationStore = new RecommendationStore();
export default recommendationStore;

