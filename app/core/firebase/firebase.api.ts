import HttpClient, { HttpClientWithoutHeaders } from '../../core/http-client/http-client';
import { BASE_URL } from '../hosts';
import { FirebaseMessagingTokenDeleteModel, FirebaseMessagingTokenUpdateModel } from './firebase.model';

export const FirebaseApi = {
  updateMessagingToken: async (model: FirebaseMessagingTokenUpdateModel) => {
    console.log('updateMessagingToken', model);
    return await HttpClientWithoutHeaders.post(`${BASE_URL}/lk/send-fcm`, model);
  },
  deleteMessagingToken: async (model: FirebaseMessagingTokenDeleteModel) => {
    return await HttpClientWithoutHeaders.post(`${BASE_URL}/lk/delete-fcm`, model);
  },
};
