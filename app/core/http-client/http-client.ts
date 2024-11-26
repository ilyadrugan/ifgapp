import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiPrefix } from '../constants/api-const';
import reduxStore from '../../../state/store';
import { camelizeKeys } from 'humps';
import { LogoutSaga } from '../../../screens/profile/account/state/account.saga';
import { accountSlice } from '../../../screens/profile/account/state/account.slice';
import {
  getApplicationName,
  getBuildNumber,
  getDeviceId,
  getDeviceName,
  getSystemName,
  getSystemVersion,
  getVersion,
} from 'react-native-device-info';
import { getAuthToken } from '../utils/bearer-token';

const HttpClient = axios.create({
  headers: {
    'Content-type': 'application/json',
    // 'App-Version': `${getVersion()}(${getBuildNumber()})`,
    // 'App-Name': getApplicationName(),
    // 'System': `${getSystemName()} ${getSystemVersion()}`,
    'Cache-Control': 'no-cache',
    // 'Device-ID': getDeviceId(),
    'Authorization': 'Bearer ' + getAuthToken(),
  },
  withCredentials: true,
  // xsrfHeaderName: 'X-CSRF-TOKEN',
  // xsrfCookieName: 'csrf_access_token',
});

getDeviceName().then(x => {
  HttpClient.defaults.headers.common['Device-Name'] = x;
});


const addClientRequestInterceptors = (httpClient: AxiosInstance) => {
  httpClient.interceptors.request.use(
    (config) => {
      if (config.headers) {
        config.headers['x-csrf-token'] = 'eyJpdiI6ImpaS245YTR2NHl0OFB4UTRpTDlSdGc9PSIsInZhbHVlIjoid2NxTjQ4YTU1NGx1clE1V3MzQlRPRXJkVk9SK1g5TW1oeEJmbURXcjFOSVV4TFc2YVlnbXo0SlBENUNSTGZFUG9yeUgxYkxQaTF4c09FczVLNjJqZmdKMGdvL0tGbC82eDJBUi9qek5wK0VpMkQ0Qk1RRm9rUldscXBHZE40K1pwaEEvUDVOK1pPTEUzMmpuZTUzdlYzTXJWK0p0SjN0a3l6TFBpWW5ueFdUZ3Q5TW45UGs1dC9xK2lOblp5b2VnOEQrY08vaVhmTGc0d2lzbzJSVVd2MmVCN1pmS1NIRHFET1VQVkhHRUYvelVUQlMxK21Ob1RVa1NyekUrZDAzbm1YNTJWK0NmMkp6K3V3TUJoUzBKYXc2S3Y0Z001RHVmVWViTytTVmNTUXlycEFjdndMMGlWaW0rekdpQWFFcWw1cEdsUWdXUW9iQjR5MWxYOSs5WWtWc2V2Q0pRSEYwaTdYUlBLYXQwSHJFOCtkVE5BVzhZUFdJVzE2NVJaWVhsT2ZjNERzazl0UjRoSzQwUDh1OVFCNi9aN2drWGNaYWdHK1I2T0xUdXZmUmUyQlUrYTJhL2p6VEdYcWtjbmp3V0o4RnNjMDZrZ0FCbmJkSGVsQ3hPbm9tRVovSk42Yk5uYmRtNDJiWkd6L2QzUlVZVWN3YzRscExvK3B6NHNRdEciLCJtYWMiOiIxMDU0YjkwZjJiMTA4ZDkxYjBhZDdkNjI2ODgxOTBmZmIyNzAyYmQ3ZGJkMjRjYmYzYmNkN2QyOTc3NTk5MmM3IiwidGFnIjoiIn0';
        config.headers.Authorization = `Bearer ${getAuthToken()}`;
      }
      return config;
    }
  );
};

// addClientRequestInterceptors(HttpClient);

export default HttpClient;
