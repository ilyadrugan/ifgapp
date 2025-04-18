import HttpClient, { HttpClientWithoutHeaders } from '../../../app/core/http-client/http-client';
import Config from 'react-native-config';
import { API_URL, BASE_URL } from '../../../app/core/hosts';
import { ForgotPasswordModel, LoginByUserPasswordModel, RegisterFormModel } from './models/models';

export const login = async (model: LoginByUserPasswordModel) => {
    console.log(model,`${BASE_URL}/auth/login`);
    return await HttpClient.post(`${BASE_URL}/auth/login`, model);
};

export const registration = async (model: RegisterFormModel) => {
    console.log(`${BASE_URL}/auth/register`, model);
    return await HttpClient.post(`${BASE_URL}/auth/register`, model);
};

export const deleteProfile = async () => {
    console.log(Config,`${BASE_URL}/auth/delete`);
    return await HttpClient.post(`${BASE_URL}/auth/delete`);
};

export const forgotPasswordApi = async (model: ForgotPasswordModel) => {
    // console.log(model,`${BASE_URL}/auth/forgotpassword`);
    return await HttpClientWithoutHeaders.post(`${BASE_URL}/auth/forgotpassword`, model);
};
