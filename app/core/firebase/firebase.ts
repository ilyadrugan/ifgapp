import messaging from '@react-native-firebase/messaging';
import { getModel, syncUniqueId } from 'react-native-device-info';
import { PermissionsAndroid, Platform } from 'react-native';
import { FirebaseApi } from './firebase.api';
import { FirebaseMessagingTokenUpdateModel, FirebaseMessagingTokenDeleteModel } from './firebase.model';

export async function updateFirebaseMessagingToken() {
  if (Platform.OS==='ios') {
    const apnsToken = await messaging().getAPNSToken();
    console.log('APNS Token:', apnsToken);
    
    await messaging().registerDeviceForRemoteMessages();
  }
  const fcm_token = await messaging().getToken();
  console.log('fcm_token',fcm_token);
  const deviceName = getModel();
  const deviceId = await syncUniqueId();
  const os = Platform.OS === 'android' ? 0 : 1;
  const tokenUpdateModel = {
    fcm_token,
    // deviceName,
    // deviceId,
    // platformOs: os,
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
const requestNotificationPermissionAndroid = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      'android.permission.POST_NOTIFICATIONS',
      {
        title: 'MyApp notifications Permission',
        message:
          'MyApp needs your permission to send you ' + 'notifications .',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    console.log('granted', granted);
    //granted is denied always whether i click "OK" or "Ask me Later", why is that?
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('GRANTED');
    } else {
      console.log('Notifications permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
export async function requestNotificationPermission() {
  if (Platform.OS === 'android') {
    console.log('requestNotificationPermission');
    await requestNotificationPermissionAndroid();
  } else {
    await requestUserPermissionIos();
  }
}
