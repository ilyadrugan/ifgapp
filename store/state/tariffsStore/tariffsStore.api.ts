import {  HttpClientWithCookie, HttpClientWithoutHeaders, setCookies } from '../../../app/core/http-client/http-client';
import { PROD_URL } from '../../../app/core/hosts';
import axios from 'axios';
import CookieManager from '@react-native-cookies/cookies';

export const getTariffsApi = async (cookiesString?: string, coupon?: string) => {
    console.log(`${PROD_URL}/get-tariffs?coupon=${coupon}`);
    return await HttpClientWithoutHeaders.get(`${PROD_URL}/get-tariffs?coupon=${coupon}`);
};

