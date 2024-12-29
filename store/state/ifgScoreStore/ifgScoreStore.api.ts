import HttpClient from '../../../app/core/http-client/http-client';
import { BASE_URL } from '../../../app/core/hosts';

export const getIfgScoreApi = async () => {
    console.log(`${BASE_URL}/ifg-score`);
    return await HttpClient.get(`${BASE_URL}/ifg-score`);
};
