import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  getApplicationName,
  getBuildNumber,
  getDeviceId,
  getDeviceName,
  getSystemName,
  getSystemVersion,
  getVersion,
} from 'react-native-device-info';
import authStore from '../../../store/state/authStore/authStore';
import { PROD_URL } from '../hosts';
import CookieManager, { Cookies } from '@react-native-cookies/cookies';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setCookies = async (code: string) => {
  await CookieManager.set(PROD_URL, {
    name: 'coupon',
    value: code,
    path: '/',
    secure: true, // true для HTTPS
    httpOnly: false, // Попробуй отключить, если сервер блокирует
  });
};
const HttpClient = axios.create({
  headers: {
    'Content-type': 'application/json',
    'App-Version': `${getVersion()}(${getBuildNumber()})`,
    'App-Name': getApplicationName(),
    'System': `${getSystemName()} ${getSystemVersion()}`,
    'Device-ID': getDeviceId(),
    'Authorization': `Bearer ${authStore.access_token}`,
  },
  withCredentials: false,
  xsrfHeaderName: 'X-CSRF-TOKEN',
  xsrfCookieName: 'csrf_access_token',
});

getDeviceName().then(x => {
  HttpClient.defaults.headers.common['Device-Name'] = x;
});

export const HttpClientWithoutHeaders = axios.create({
  // headers: {
  //   'Content-type': 'application/json',
  //   'Cache-control': 'no-cache',
  // },
  withCredentials: true,
  // xsrfHeaderName: 'X-CSRF-TOKEN',
  // xsrfCookieName: 'csrf_access_token',
});

export const HttpClientWithCookie = (cookieString: string) => {
  return axios.create({
  headers: {
    'Content-type': 'application/json',
    'Cookie': cookieString,
  },
  withCredentials: true,
  xsrfHeaderName: 'X-CSRF-TOKEN',
  xsrfCookieName: 'csrf_access_token',
});};

const addClientRequestInterceptors = (httpClient: AxiosInstance) => {
  httpClient.interceptors.request.use(
    (config) => {
      if (config.headers) {
        config.headers['x-csrf-token'] = 'eyJpdiI6ImlXY0xkNllycjN5MXdCMG1IUW9Remc9PSIsInZhbHVlIjoiRkdPWktPWE5NL2VSdysvaTBVZ2ZiRERjM2dQRDJwQjZ3VzJ5YnFVcko4TkZJL0ttV3RjV2IwM2UvWlhLb3hSayt1NWF6c2c5U1Q5V0VYZENiczZRM3lBNVlJV3Z5YkZ6MzFFOUZZU0pGdEdpa2owRmc1ZXJBOFlqSFJNSnFTY3hyMEJpSGVxanVsUzBjenZWcmJhVjgxdHBhTXVZV2I5YXNSdFZuY0ZGZWJSekVRMnRPMlZVT0xheXV6MEdTOUh6UWg3cWU3L1RoMzlQVGoxcU5QY1RqT3NZM0dGUVRXNnJGVlgzaml0bG84Y2RsTUo4ZHdUS3Z2VTRReXBwdmhNa2JaWGZmc2dFRitBb3FSQk9YdG5BMVV6TE1CY1owMlFZc3JQRFZOaU41Wnd1RkNwMWhsbnhZVC9xR2w0OFd3T2hCa1dRNkxmbHBhYXdLd2JLVDh4UitUSGRhYTBuSHdkdnAzcGphK1l2N3A0S2V0YVVkek9ZS3kyZjhUNWJRKzBMZlUzTGNVZ3BHOXVwNk82Qm9SdDk3K2RZL2dCUTNDUmRvaWhhYkF1Qjdpc2RZdHRXRkhqTUZFc0U3SHg1ak5LYW9qTWRSS3NPSGNnK2lzQnlVeUdTeXZ6UEFJbE9TMGYvS3dkMHlUZDhXZWpubHlGZjhvTFZVU1ZTU1dJb1VLKy8iLCJtYWMiOiJjZWViNzFiZmU2Y2M3OTlhYzI0NDk1YjA5M2E4Yzk1MmI5NmUxNGRlZjU2MDEzZDRlNDFmYWZlZDE4MzcxZWIwIiwidGFnIjoiIn0';
        config.headers.Authorization = `Bearer ${authStore.access_token}`;
      }
      return config;
    }
  );
};

// const addClientResponseInterceptors = (httpClient: AxiosInstance) => {
//   httpClient.interceptors.response.use(
//     (response) => {
//       if (
//         response.data &&
//         response.headers['content-type'].includes('application/json')
//       ) {
//         response.data = camelizeKeys(response.data);
//       }
//       return response;
//     },
//     async (err) => {
//       const originalConfig = err.config;
//       if ((!originalConfig.url.includes(`${ApiPrefix}/auth/login`) && originalConfig.url !== `${ApiPrefix}/auth/refreshToken`)
//         && err.response) {
//         if (err.response.status === 401 && !originalConfig._retry) {
//           originalConfig._retry = true;
//           if (!refreshing) {
//             try {
//               refreshing = true;
//               const result = await HttpClient.get(`${ApiPrefix}/auth/refreshToken`);
//               const token = result.data.token;
//               reduxStore.dispatch(accountSlice.actions.SetToken(token));
//               refreshing = false;
//               return HttpClient(originalConfig);
//             } catch (_error) {
//               refreshing = false;
//               reduxStore.dispatch(LogoutSaga());
//               return Promise.reject(_error);
//             }
//           } else {
//             let i = 0;
//             while (i < 10) {
//               if (!refreshing) {
//                 return HttpClient(originalConfig);
//               }
//               // @ts-ignore
//               await new Promise(r => setTimeout(r, 200));
//               i++;
//             }
//             reduxStore.dispatch(LogoutSaga());
//             return Promise.reject('Refresh error!');
//           }
//         }
//       }
//       if (
//         err.response.data &&
//         err.response.headers['content-type'].includes('application/json')
//       ) {
//         err.response.data = camelizeKeys(err.response.data);
//       }
//       return Promise.reject(err);
//     }
//   );
// };

addClientRequestInterceptors(HttpClient);
// addClientResponseInterceptors(HttpClient);

addClientRequestInterceptors(HttpClientWithoutHeaders);
// addClientResponseInterceptors(HttpClientWithoutHeaders);


export default HttpClient;

