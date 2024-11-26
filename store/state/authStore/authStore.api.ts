import HttpClient from '../../../app/core/http-client/http-client';
import Config from 'react-native-config';
import { BASE_URL } from '../../../app/core/hosts';
import { LoginByUserPasswordModel } from './models/models';

export const login = async (model: LoginByUserPasswordModel) => {
    console.log(Config,`${BASE_URL}/auth/login`);
    return await HttpClient.post(`${BASE_URL}/auth/login`, model);
  };
