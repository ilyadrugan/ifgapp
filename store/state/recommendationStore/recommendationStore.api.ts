import HttpClient from '../../../app/core/http-client/http-client';
import { BASE_URL } from '../../../app/core/hosts';
import { StoreRecommendationModel } from './models/models';

export const getRecommendationsApi = async (id: number) => {
    console.log(`${BASE_URL}/survey/recommendations/${id}`);
    return await HttpClient.get(`${BASE_URL}/survey/recommendations/${id}`);
};

export const getPersonalRecommendationsApi = async () => {
    console.log(`${BASE_URL}/recomendations/get-personal`);
    return await HttpClient.get(`${BASE_URL}/recomendations/get-personal`);
};

export const storeRecommendationApi = async (model: StoreRecommendationModel) => {
    console.log(`${BASE_URL}/recomendations/store-personal`);
    return await HttpClient.post(`${BASE_URL}/recomendations/store-personal`, model);
};

export const completeRecommendationApi = async (id: string) => {
    console.log(`${BASE_URL}/recomendations/complete`);
    return await HttpClient.post(`${BASE_URL}/recomendations/complete`, {id: id});
};

export const deleteRecommendationApi = async (user_recomendation_id: string) => {
    console.log(`${BASE_URL}/recomendations/delete`);
    return await HttpClient.post(`${BASE_URL}/recomendations/delete`, {id: user_recomendation_id});
};
