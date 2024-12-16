import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { uploadProfileImage } from '../../../../store/state/userStore/userStore.api';

export const useImageUploader = () => {

  const selectImage = async () => {
    const images = await launchImageLibrary({ selectionLimit: 1, mediaType: 'photo' });
    const asset = images?.assets?.[0];

    if (!asset) {throw new Error();}

    const file = await uploadProfileImage(asset.uri);
    const data = file.data;

    return new Promise<{ fileId: string, message: string }>((resolve, reject) => {
      resolve({ fileId: data.fileId, message: data.message });
    });
  };

  return { selectImage };
};
