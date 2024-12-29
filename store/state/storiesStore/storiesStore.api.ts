import HttpClient from '../../../app/core/http-client/http-client';
import { BASE_URL } from '../../../app/core/hosts';

export const getStoriesApi = async () => {
    console.log(`${BASE_URL}/stories`);
    return await HttpClient.get(`${BASE_URL}/stories`);
};
