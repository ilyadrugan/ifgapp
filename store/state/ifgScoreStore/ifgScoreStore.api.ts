import HttpClient from '../../../app/core/http-client/http-client';
import { BASE_URL } from '../../../app/core/hosts';

export const getIfgScoreApi = async () => {
    console.log(`${BASE_URL}/ifg-score/total-score`);
    return await HttpClient.get(`${BASE_URL}/ifg-score/total-score`);
};

export const getTodayIfgScoreApi = async () => {
    console.log(`${BASE_URL}/ifg-score`);
    return await HttpClient.get(`${BASE_URL}/ifg-score`);
};

export const addIfgScoreApi = async (score: number) => {
    console.log(`${BASE_URL}/ifg-score/store`, score);
    return await HttpClient.post(`${BASE_URL}/ifg-score/store`, {score: score});
};
