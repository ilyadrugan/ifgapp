import HttpClient from '../../../app/core/http-client/http-client';
import { BASE_URL } from '../../../app/core/hosts';

export const getPresentsApi = async (query?: string) => {
    console.log(`${BASE_URL}/presents?${query || ''}`);
    return await HttpClient.get(`${BASE_URL}/presents?${query || ''}`);
};

export const getPresentByIdApi = async (id: number) => {
    console.log(`${BASE_URL}/presents/${id}`);
    return await HttpClient.get(`${BASE_URL}/presents/${id}`);
};

export const sendSuggestionApi = async (message: string) => {
    console.log(`${BASE_URL}/suggestion`);
    return await HttpClient.post(`${BASE_URL}/suggestion`, {message: message});
};