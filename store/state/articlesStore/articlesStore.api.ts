import HttpClient from '../../../app/core/http-client/http-client';
import { API_URL, BASE_URL } from '../../../app/core/hosts';

export const getArticlesApi = async () => {
    return await HttpClient.get(`${BASE_URL}/articles`);
};

export const getArticlesByTagsApi = async (query: string) => {
    return await HttpClient.get(`${BASE_URL}/articles${query}`);
};

export const getUserArticlesApi = async () => {
    console.log(`${BASE_URL}/lk/articles`);
    return await HttpClient.get(`${BASE_URL}/lk/articles`);
};

export const deleteUserArticleApi = async (id: number) => {
    console.log(`${BASE_URL}/article/wishlist`);
    return await HttpClient.post(`${BASE_URL}/article/wishlist`, {id: id});
};
