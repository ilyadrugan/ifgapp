import HttpClient from '../../../app/core/http-client/http-client';
import { BASE_URL } from '../../../app/core/hosts';

export const getPeriodActivityApi = async (date_from: string, date_to: string) => {
    return await HttpClient.get(`${BASE_URL}/daily-activity/period?date_from=${date_from}&date_to=${date_to}`);
};
export const getGraphCaloriesActivityApi = async (period: string) => {
    return await HttpClient.get(`${BASE_URL}/graph/calories?group_by=${period}`);
};
export const getGraphStepsActivityApi = async (period: string) => {
    return await HttpClient.get(`${BASE_URL}/graph/steps?group_by=${period}`);
};
export const getIfgScoreActivityApi = async (period: string) => {
    return await HttpClient.get(`${BASE_URL}/graph/ifg-score?group_by=${period}`);
};
