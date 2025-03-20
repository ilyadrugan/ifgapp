import { successToast, errorToast } from '../../../app/core/components/toast/toast';
import { checkCouponApi } from './couponStore.api';
import { CouponModel, CouponViewModel } from './models/models';

class CouponStore {
  isLoading = false; // Состояние загрузки
  couponData: CouponViewModel[] | null[] = [null, null];
  async checkCoupon(model: CouponModel) {
    this.isLoading = true;
    await checkCouponApi(model)
      .then((result)=>{
        this.couponData = [null, null];
        console.log('result.data', result.data);
        this.couponData[model.tariff_id - 1] = result.data;
        successToast('Купон активирован!');
      })
      .catch((err)=>{
        // this.couponData = [null, null];
        console.log('ERROR forgotpassword', err.data);
        errorToast('Купон не найден или не активен');
      });
      // .finally(()=>{this.isLoading = false;});
      this.isLoading = false;
  }

}

const couponStore = new CouponStore();
export default couponStore;


