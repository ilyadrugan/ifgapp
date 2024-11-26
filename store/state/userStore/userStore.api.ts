import HttpClient from '../../../app/core/http-client/http-client';
import { BASE_URL } from '../../../app/core/hosts';
// import { LoginByUserPasswordModel } from './models/models';

export const getProfile = async () => {
    console.log('getProfile',`${BASE_URL}/lk`);
    return await HttpClient.get(`${BASE_URL}/lk`);
  };
