import { successToast, errorToast } from '../../../app/core/components/toast/toast';
import tariffsStore from '../tariffsStore/tariffsStore';
import { checkCouponApi } from './couponStore.api';
import { CouponResponseModel } from './models/models';

class CouponStore {
  isLoading = false; // Состояние загрузки
  couponData: CouponResponseModel;
  async checkCoupon(code: string, onChangeActiveTarriff: (id: number)=>void) {
    this.isLoading = true;
    await checkCouponApi(code)
      .then(async (result)=>{
        console.log('checkCouponApi result.data', result.data);
        if (result.data.error) {
          errorToast(result.data.error);
          return;
        }
        else {
          await tariffsStore.getTariffs(code);
          this.couponData = result.data;
          console.log('this.couponData', this.couponData.tariff);
          onChangeActiveTarriff(result.data.tariff.id - 1);
          successToast('Купон активирован!');
        }
      })
      .catch((err)=>{
        // this.couponData = [null, null];
        console.log('ERROR checkCouponApi', err);
        errorToast('Купон не найден или не активен');
      });
      // .finally(()=>{this.isLoading = false;});
      this.isLoading = false;
  }

}

const couponStore = new CouponStore();
export default couponStore;


