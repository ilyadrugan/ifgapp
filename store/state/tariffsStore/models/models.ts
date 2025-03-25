import { CouponViewModel } from '../../couponStore/models/models';

export type TariffModel = {
    id: number,
    title: string,
    description: string,
    price: number,
    price_discount: number | null,
    period: string,
    coupon: CouponViewModel | null
};
