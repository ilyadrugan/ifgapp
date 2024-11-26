import Config from 'react-native-config';

export const BASE_URL = 'https://xsaht.100qrs.ru/api' 

export const hostName = () => {
    console.log(Config.ENVIRONMENT_NAME);
    return Config.API_URL;};
export const ApiPrefix = `${hostName()}/api`;
