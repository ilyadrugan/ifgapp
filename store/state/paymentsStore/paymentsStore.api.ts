import HttpClient from '../../../app/core/http-client/http-client';
import { BASE_URL } from '../../../app/core/hosts';

export const addPaymentCardApi = async () => {
    console.log(`${BASE_URL}/lk/add-card`);
    return await HttpClient.get(`${BASE_URL}/lk/add-card`);
};

export const getCardsApi = async () => {
    console.log(`${BASE_URL}/lk/get-cards`);
    return await HttpClient.get(`${BASE_URL}/lk/get-cards`);
};

export const deleteCardApi = async (id: number) => {
    console.log(`${BASE_URL}/lk/delete-card`);
    return await HttpClient.post(`${BASE_URL}/lk/delete-card`, {id: id});
};

export const changeFavoriteCardApi = async (id: number) => {
    console.log(`${BASE_URL}/lk/card-favorite`);
    return await HttpClient.post(`${BASE_URL}/lk/card-favorite`, {id: id});
};