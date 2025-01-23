import HttpClient, { HttpClientWithoutHeaders } from '../../../app/core/http-client/http-client';
import { BASE_URL } from '../../../app/core/hosts';
import { ResultsTestModel } from './models/models';

export const getTestByIdApi = async (id: number) => {
    return await HttpClient.get(`${BASE_URL}/surveys/questions/${id}`);
};

export const submitResultsTestApi = async (model: ResultsTestModel) => {
    return await HttpClient.post(`${BASE_URL}/surveys/submit`, model);
};

export const getAllMyTestApi = async () => {
    return await HttpClient.get(`${BASE_URL}/lk/surveys`);
};

export const updateDeviceResultsTestApi = async (device_id: string) => {
    return await HttpClientWithoutHeaders.post(`${BASE_URL}/surveys/update-device`, {device_id: device_id});
};

