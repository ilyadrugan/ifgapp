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

export const getArticleByIdApi = async (id: number) => {
    console.log(`${BASE_URL}/articles/${id}`);
    return await HttpClient.get(`${BASE_URL}/articles/${id}`);
};
export const getInterviewByIdApi = async (id: number) => {
    console.log(`${BASE_URL}/interview/${id}`);
    return await HttpClient.get(`${BASE_URL}/interview/${id}`);
};
export const getInterViewsByTagsApi = async (query?: string) => {
    console.log(`${BASE_URL}/interview?${query || ''}`);
    return await HttpClient.get(`${BASE_URL}/interview?${query || ''}`);
};
export const getUserArticlesApi = async () => {
    console.log(`${BASE_URL}/lk/articles`);
    return await HttpClient.get(`${BASE_URL}/lk/articles`);
};
export const getUserEventsApi = async () => {
    console.log(`${BASE_URL}/materials/my-events`);
    return await HttpClient.get(`${BASE_URL}/materials/my-events`);
};
export const changeLikeArticleApi = async (id: number, action: number) => {
    return await HttpClient.post(`${BASE_URL}/article/like?id=${id}&action=${action}`);
};
export const changeLikeInterViewApi = async (id: number, action: number) => {
    return await HttpClient.post(`${BASE_URL}/event/like?id=${id}&action=${action}`);
};
export const changeUserArticleApi = async (id: number) => {
    return await HttpClient.post(`${BASE_URL}/article/wishlist`, {id: id});
};

export const changeUserInterViewApi = async (id: number, del: boolean) => {
    console.log(`${BASE_URL}/materials/${del ? 'delete-my-event' : 'add-favorite-event'}`, id);
    return await HttpClient.post(`${BASE_URL}/materials/${del ? 'delete-my-event' : 'add-favorite-event'}`, {event_id: id});
};
