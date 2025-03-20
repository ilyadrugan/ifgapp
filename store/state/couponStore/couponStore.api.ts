import { HttpClientWithoutHeaders } from '../../../app/core/http-client/http-client';
import Config from 'react-native-config';
import { BASE_URL } from '../../../app/core/hosts';
import { CouponModel } from './models/models';

export const checkCouponApi = async (model: CouponModel) => {
    console.log(Config,`${BASE_URL}/check-coupon`);
    return await HttpClientWithoutHeaders.post(`${BASE_URL}/check-coupon`, model);
};
