import authStore from '../../../store/state/authStore/authStore';
import HttpClient, { HttpClientWithoutHeaders } from '../../core/http-client/http-client';
import { BASE_URL } from '../hosts';
import { FirebaseMessagingTokenDeleteModel, FirebaseMessagingTokenUpdateModel } from './firebase.model';

export const FirebaseApi = {
  updateMessagingToken: async (model: FirebaseMessagingTokenUpdateModel) => {
    console.log('updateMessagingToken', model, authStore.access_token);
    return await HttpClient.post(`${BASE_URL}/lk/send-fcm`, model);
  },
  deleteMessagingToken: async (model: FirebaseMessagingTokenDeleteModel) => {
    return await HttpClient.post(`${BASE_URL}/lk/delete-fcm`, model);
  },
};
