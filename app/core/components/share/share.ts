import { Share, Alert } from 'react-native';

export const onShare = async (shareText: string) => {
  console.log('shareText', shareText);
    try {
      const result = await Share.share({
        message: shareText,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
