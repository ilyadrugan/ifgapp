import { makeAutoObservable } from 'mobx';
import { BASE_URL } from '../../../app/core/hosts';
import axios from 'axios';
import { errorToast, successToast } from '../../../app/core/components/toast/toast';
import { completeRecommendationApi, deleteRecommendationApi, getPersonalRecommendationsApi, getRecommendationsApi, storeRecommendationApi } from './recommendationStore.api';
import { PersonalRecommendationModel, RecommendationsModel, StoreRecommendationModel } from './models/models';


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
          // console.log('this.recommendationList', this.recommendationList);
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
            // console.log('this.personalReacomendationList', this.personalRecomendationList);
          }
          )
          .catch((err)=>{
            console.log('getPersonalRecommendations ERROR', err.message);
          })
          .finally(()=>{this.isLoading = false;});
      };
    storeRecommendation = async (model: StoreRecommendationModel) => {
        console.log('storeRecommendation', model);
          this.isLoading = true;
          await storeRecommendationApi(model)
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
    deleteRecommendation = async (user_recomendation_id: string) => {
            console.log('deleteRecommendation',user_recomendation_id);
              this.isLoading = true;
              await deleteRecommendationApi(user_recomendation_id)
                .then((result)=>{
                  console.log('deleteRecommendationApi result', result.data);
                }
                )
                .catch((err)=>{
                  console.log('deleteRecommendationApi ERROR', err.message);
                })
                .finally(()=>{this.isLoading = false;});
      };
}

const recommendationStore = new RecommendationStore();
export default recommendationStore;

