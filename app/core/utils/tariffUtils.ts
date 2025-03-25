import { TariffModel } from '../../../store/state/tariffsStore/models/models';

export const getPeriod = (period: string) => {
    if (period === 'year') {
      return 'год';
    }
    return 'мес.';
  };
export const getPrice = (item: TariffModel, old = 0) => {
    let count = 1;
    if (item.period === 'year') {
      count = 12;
    }

    let price = (item.price_discount == null) ? item.price : item.price_discount;

    if (old) {
      price = item.price;
    }

    return Math.round(price * count);
  };
export const getPercent = (item: TariffModel) => {

    if (item.price_discount == null) {
      return 0;
    }
    let a = item.price_discount / item.price * 100;
    let b = 100 - a;

    return Math.round(b);
  };
