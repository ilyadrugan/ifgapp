import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import notifee, { EventType } from '@notifee/react-native';
import { Platform } from 'react-native';
import colors from '../colors/colors';
import { getPushAction, PushAction } from './firebase';
export async function onDisplayNotification() {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  // Required for iOS
  // See https://notifee.app/react-native/docs/ios/permissions
  await notifee.displayNotification({
    id: '1234',
    title: '<p style="color: white;"><b>John  sent a message</span></p></b></p>',
    body: 'Hey there! 🌟',
    android: {
      channelId,
      color: colors.GREEN_COLOR,

    },
  });
}
export function useFirebaseMessaging(
  onPushAction: (action: PushAction) => void,
  needToShow: (action: PushAction) => boolean,
) {

  function onForegroundPressEvent(messageData: any) {
    const action = getPushAction(messageData);
    if (!action) {return;}
    onPushAction(action);
  }

  function _needToShow(message: FirebaseMessagingTypes.RemoteMessage): boolean {
    console.log('needToShow', message);
    const action = getPushAction(message.data);
    if (!action) {return true;}
    return needToShow(action);
  }

  useEffect(() => {
    let channel = '';

    notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    }).then(ch => {
      channel = ch;
    });

    notifee.onForegroundEvent(event => {
      console.log('onForegroundEvent');
      console.log(event);

      if (event.type === EventType.PRESS) {
        if (!event.detail.notification) {return;}
        onForegroundPressEvent(event.detail?.notification?.data);
      }
    });

    async function onMessageReceived(message: FirebaseMessagingTypes.RemoteMessage) {
      if (!message) {return;}
      console.log('onMessageReceived');
      console.log(message);
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      // if (!_needToShow(message)) return;

      await notifee.displayNotification({
        title: message.notification?.title,
        body: message.notification?.body,
        data: message.data,
        android: {
          channelId: channelId,
          // smallIcon: 'ic_notification',
          color: colors.GREEN_COLOR,
        },
      });
    }

    function onInitialNotification(message: FirebaseMessagingTypes.RemoteMessage | null) {
      console.log('onInitialNotification');
      console.log(message);

      if (!message) {return;}
      onForegroundPressEvent(message.data);
    }

    async function onBackgroundMessageReceived(message: FirebaseMessagingTypes.RemoteMessage) {
      console.log(message);
      if (!message) {return;}
      onForegroundPressEvent(message.data);
    }
    messaging().getInitialNotification().then(onInitialNotification);
    messaging().setBackgroundMessageHandler((message) =>
      Platform.OS === 'android' ? onBackgroundMessageReceived(message)
        : new Promise((resolve: any) => resolve()));

    let unsubscribeOnMessage: (() => void) | null = null;
    unsubscribeOnMessage = messaging().onMessage(onMessageReceived);

    return () => {
      unsubscribeOnMessage && unsubscribeOnMessage();
    };
  }, []);
}
