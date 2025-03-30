import Config from 'react-native-config';

export const BASE_URL = 'https://api.ifeelgood.life/api';
export const API_URL = 'https://api.ifeelgood.life';
export const PROD_URL = 'https://ifeelgood.life';

export const hostName = () => {
    console.log(Config.ENVIRONMENT_NAME);
    return Config.API_URL;};
export const ApiPrefix = `${API_URL}/api`;
