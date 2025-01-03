import HttpClient from '../../../app/core/http-client/http-client';
import Config from 'react-native-config';
import { API_URL, BASE_URL } from '../../../app/core/hosts';
import { LoginByUserPasswordModel, RegisterFormModel } from './models/models';

export const login = async (model: LoginByUserPasswordModel) => {
    console.log(Config,`${BASE_URL}/auth/login`);
    return await HttpClient.post(`${BASE_URL}/auth/login`, model);
};

export const registration = async (model: RegisterFormModel) => {
    console.log(Config,`${API_URL}/register`);
    return await HttpClient.post(`${API_URL}/register`, model);
};