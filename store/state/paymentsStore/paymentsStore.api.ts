import HttpClient from '../../../app/core/http-client/http-client';
import { BASE_URL } from '../../../app/core/hosts';

export const addPaymentCardApi = async () => {
    console.log(`${BASE_URL}/lk/add-card`);
    return await HttpClient.get(`${BASE_URL}/lk/add-card`);
};
