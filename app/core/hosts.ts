import Config from 'react-native-config';

export const BASE_URL = `${Config.API_URL}/api`;
export const API_URL = Config.API_URL;
export const APPADMIN_URL = Config.APPADMIN_URL;
export const PROD_URL = 'https://ifeelgood.life';

export const hostName = () => {
    console.log(Config.ENVIRONMENT_NAME);
    return Config.API_URL;};
export const ApiPrefix = `${API_URL}/api`;
