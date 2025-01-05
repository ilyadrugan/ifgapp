import HttpClient from '../../../app/core/http-client/http-client';
import { BASE_URL } from '../../../app/core/hosts';

export const getRecommendationsApi = async () => {
    console.log(`${BASE_URL}/survey/recommendations`);
    return await HttpClient.get(`${BASE_URL}/survey/recommendations`);
};
