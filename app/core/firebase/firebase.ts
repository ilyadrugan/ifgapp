import messaging from '@react-native-firebase/messaging';
import { getModel, syncUniqueId } from 'react-native-device-info';
import { PermissionsAndroid, Platform } from 'react-native';
import { FirebaseApi } from './firebase.api';
import { FirebaseMessagingTokenUpdateModel, FirebaseMessagingTokenDeleteModel } from './firebase.model';

export async function updateFirebaseMessagingToken() {
  const token = await messaging().getToken();
  const deviceName = getModel();
  const deviceId = await syncUniqueId();
  const os = Platform.OS === 'android' ? 0 : 1;
  const tokenUpdateModel = {
    token,
    deviceName,
    deviceId,
    platformOs: os,
  } as FirebaseMessagingTokenUpdateModel;
  return await FirebaseApi.updateMessagingToken(tokenUpdateModel);
}

export async function deleteDeviceMessagingToken() {
  const deviceId = await syncUniqueId();
  const tokenDeleteModel = {
    deviceId: deviceId,
  } as FirebaseMessagingTokenDeleteModel;
  await FirebaseApi.deleteMessagingToken(tokenDeleteModel);
}

export function getPushAction(data: any | undefined): PushAction | undefined {
  if (data?.notificationAction) {
    return JSON.parse(data?.notificationAction) as PushAction;
  }
  return undefined;
}

export interface PushAction {
  action: any;
  data: any;
}

// export enum PushActionType {
//   NavigateToContractorChat = 'NavigateToContractorChat',
//   ProjectHomeownerRegisterGuarantee = 'ProjectHomeownerRegisterGuarantee',
//   ProjectRequestHomeownerAddGuarantee = 'ProjectRequestHomeownerAddGuarantee',
//   NavigateToCompany = 'NavigateToCompany',
//   NavigateToRequest = 'NavigateToRequest',
//   NavigateToRequestChat = 'NavigateToRequestChat',
//   ProjectRequestHomeownerUpdateStatus = 'ProjectRequestHomeownerUpdateStatus'
// }

async function requestUserPermissionIos() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export async function requestNotificationPermission() {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  } else {
    await requestUserPermissionIos();
  }
}
