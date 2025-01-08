import HttpClient from '../../../app/core/http-client/http-client';
import { BASE_URL } from '../../../app/core/hosts';

export const getRecommendationsApi = async (id: number) => {
    console.log(`${BASE_URL}/survey/recommendations/${id}`);
    return await HttpClient.get(`${BASE_URL}/survey/recommendations/${id}`);
};

export const getPersonalRecommendationsApi = async () => {
    console.log(`${BASE_URL}/recomendations/get-personal`);
    return await HttpClient.get(`${BASE_URL}/recomendations/get-personal`);
};

export const storeRecommendationApi = async (line_text: string) => {
    console.log(`${BASE_URL}/recomendations/store-personal`);
    return await HttpClient.post(`${BASE_URL}/recomendations/store-personal`, {line_text: line_text});
};

export const completeRecommendationApi = async (id: string) => {
    console.log(`${BASE_URL}/recommendations/complete`);
    return await HttpClient.post(`${BASE_URL}/recommendations/complete`, {id: id});
};
