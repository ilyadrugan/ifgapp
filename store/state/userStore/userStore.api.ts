import HttpClient from '../../../app/core/http-client/http-client';
import { API_URL, BASE_URL } from '../../../app/core/hosts';
import { UserChangeInfoModel, UserPasswordChangeModel } from './models/models';
import authStore from '../authStore/authStore';
import userStore from './userStore';
import { errorToast, successToast } from '../../../app/core/components/toast/toast';
// import { LoginByUserPasswordModel } from './models/models';

export const getProfileApi = async () => {
    console.log('getProfile',`${BASE_URL}/lk`);
    return await HttpClient.get(`${BASE_URL}/lk`);
};

export const changeProfile = async (model: UserChangeInfoModel) => {
    console.log('changeProfile', `${BASE_URL}/lk/update-profile`);
    return await HttpClient.post(`${BASE_URL}/lk/update-profile`, model);
};

export const uploadProfileImage = async (imageUri: string) => {
  try {
    // Создаем объект FormData
    const formData = new FormData();

    // Получаем имя файла из URI
    const fileName = imageUri.split('/').pop();

    // Добавляем изображение в FormData
    formData.append('photo', {
      uri: imageUri,
      name: fileName,
      type: 'image/jpeg', // Замените на реальный тип изображения, если требуется
    });
    // formData.append('name', userStore.userInfo?.name || '');
    // formData.append('last_name', userStore.userInfo?.last_name || '');
    // formData.append('email', userStore.userInfo?.email || '');
    // Выполняем запрос на сервер
    // console.log('formData', formData);
    const response = await fetch(`${BASE_URL}/lk/update-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authStore.access_token}`,
      },
      body: formData,
    });
    // Проверяем ответ
    if (response.ok) {
      const result = await response.json(); // Парсим ответ от сервера
      console.log('Фото загружено', result);
      userStore.getProfile(true);
      successToast('Фото загружено успешно');
      return result;
    } else {
      // console.log('response err', await response.json());
      errorToast(`Ошибка загрузки: ${response.status}`);
      throw new Error(`Ошибка загрузки: ${response.status}`);
    }
  } catch (error) {
    console.error('Ошибка отправки изображения:', error.response.data.errors);

    console.error('Ошибка отправки изображения:', error);
    throw error;
  }
};

export const changePassword = async (model: UserPasswordChangeModel) => {
  console.log('changePassword', `${API_URL}/user/password`);
  return await HttpClient.put(`${API_URL}/user/password`, model);
};
