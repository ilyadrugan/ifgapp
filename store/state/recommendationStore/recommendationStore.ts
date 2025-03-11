import { makeAutoObservable } from 'mobx';
import { BASE_URL } from '../../../app/core/hosts';
import axios from 'axios';
import { errorToast, successToast } from '../../../app/core/components/toast/toast';
import { completeRecommendationApi, deleteRecommendationApi, getPersonalRecommendationsApi, getRecommendationsApi, storeRecommendationApi } from './recommendationStore.api';
import { PersonalRecommendationModel, RecommendationsModel, StoreRecommendationModel } from './models/models';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

  async readRecommendation(id: number) {
    console.log('readRecommendation', id);
    const recIndex = this.personalRecomendationList.findIndex((item)=>item.id === id);
    if (recIndex) {
      console.log('readRecommendation recIndex', recIndex);
      this.personalRecomendationList = this.personalRecomendationList.map((rec, index)=>{
        if (index === recIndex) {
          return {...rec, is_viewed: true};
        }
        return rec;
      });
    }
    const recs = await AsyncStorage.getItem('read_recs');
    if (recs) {
      await AsyncStorage.setItem('read_recs',JSON.stringify([...JSON.parse(recs), id]));
    }
    else {
      await AsyncStorage.setItem('read_recs',JSON.stringify([id]));
    }

  }

  getRecommendations = async (resultTestId: number) => {
    console.log('getRecommendations', resultTestId);
      this.isLoading = true;
      await getRecommendationsApi(resultTestId)
        .then((result)=>{
          this.recommendationList = result.data;
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
          .then(async (result)=>{
            const recs = await AsyncStorage.getItem('read_recs') || JSON.stringify([]);
            if (!recs) {
              await AsyncStorage.setItem('read_recs', JSON.stringify(recs));
            }
            console.log('recsss',recs);
            this.personalRecomendationList = result.data.map((rec)=>{
              return {...rec, is_viewed: JSON.parse(recs).includes(rec.id)};
            });
            // console.log('this.personalReacomendationList', this.personalRecomendationList);
          }
          )
          .catch((err)=>{
            console.log('getPersonalRecommendations ERROR', err.message);
            this.isLoading = false;
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

