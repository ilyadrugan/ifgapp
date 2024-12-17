import HttpClient from '../../core/http-client/http-client';
import { BASE_URL } from '../hosts';
import { FirebaseMessagingTokenDeleteModel, FirebaseMessagingTokenUpdateModel } from './firebase.model';

export const FirebaseApi = {
  updateMessagingToken: async (model: FirebaseMessagingTokenUpdateModel) => {
    console.log('updateMessagingToken', model);
    return await HttpClient.post(`${BASE_URL}/firebase/messaging-token`, model);
  },
  deleteMessagingToken: async (model: FirebaseMessagingTokenDeleteModel) => {
    return await HttpClient.post(`${BASE_URL}/firebase/delete-messaging-token`, model);
  },
};
