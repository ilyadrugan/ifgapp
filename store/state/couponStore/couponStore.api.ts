import { HttpClientWithoutHeaders } from '../../../app/core/http-client/http-client';
import { PROD_URL } from '../../../app/core/hosts';

export const checkCouponApi = async (code: string) => {
    console.log(`${PROD_URL}/check-coupon`);
    return await HttpClientWithoutHeaders.get(`${PROD_URL}/check-coupon/?code=${code}`);
};
