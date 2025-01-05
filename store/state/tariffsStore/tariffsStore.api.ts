import HttpClient from '../../../app/core/http-client/http-client';
import { BASE_URL } from '../../../app/core/hosts';

export const getTariffsApi = async () => {
    console.log(`${BASE_URL}/tariffs`);
    return await HttpClient.get(`${BASE_URL}/tariffs`);
};
