import HttpClient from '../../../app/core/http-client/http-client';
import { API_URL, BASE_URL } from '../../../app/core/hosts';

export const getCertsApi = async (query?: string) => {
    console.log(`${BASE_URL}/lk/certs?${query || ''}`);
    return await HttpClient.get(`${BASE_URL}/lk/certs?${query || ''}`);
};
