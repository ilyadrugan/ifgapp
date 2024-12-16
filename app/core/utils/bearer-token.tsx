import AsyncStorage from '@react-native-async-storage/async-storage';

// @ts-ignore
export const setAuthToken = (token: string | null) => {
  // @ts-ignore
  global.authToken = token;
  saveAuthTokenToStorage(token);
};

export const getAuthTokenFromStorage = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('AUTH_TOKEN');
};

export const saveAuthTokenToStorage = async (token: string | null) => {
  await AsyncStorage.setItem('AUTH_TOKEN', token ? token : '');
};

export const deleteAuthTokenToStorage = async  () => {
  await AsyncStorage.setItem('AUTH_TOKEN', '');
};
