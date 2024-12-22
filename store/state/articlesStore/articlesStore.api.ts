import HttpClient from '../../../app/core/http-client/http-client';
import { BASE_URL } from '../../../app/core/hosts';

export const getMaterialFiltersApi = async () => {
    return await HttpClient.get(`${BASE_URL}/materials/filters`);
};

export const getMaterialHashtagsApi = async () => {
    return await HttpClient.get(`${BASE_URL}/materials/hashtags`);
};

export const getArticlesByTagsApi = async (query?: string) => {
    console.log(`${BASE_URL}/articles?${query || ''}`);
    return await HttpClient.get(`${BASE_URL}/articles?${query || ''}`);
};
export const getInterViewsByTagsApi = async (query?: string) => {
    console.log(`${BASE_URL}/interview?${query || ''}`);
    return await HttpClient.get(`${BASE_URL}/interview?${query || ''}`);
};
export const getUserArticlesApi = async () => {
    console.log(`${BASE_URL}/lk/articles`);
    return await HttpClient.get(`${BASE_URL}/lk/articles`);
};

export const deleteUserArticleApi = async (id: number) => {
    return await HttpClient.post(`${BASE_URL}/article/wishlist`, {id: id});
};
