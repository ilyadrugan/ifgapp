import { TariffModel } from '../../tariffsStore/models/models';

export type CouponModel = {
    code: string;
    tariff_id: number;
};

export type CouponViewModel = {
    id: number,
    code: string,
    description: string,
    discount: number,
    type: number,
    email: string | null,
    tariff_id: number,
    end_date: string | null,
    status: number,
    count: number
};

export type CouponResponseModel = {
    coupon: CouponViewModel,
    tariff: TariffModel,
    error: string | boolean
}
