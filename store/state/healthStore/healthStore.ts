import { successToast, errorToast } from '../../../app/core/components/toast/toast';
import tariffsStore from '../tariffsStore/tariffsStore';
import { CouponResponseModel } from './models/models';

class HealthStore {
  isLoading = false; // Состояние загрузки
  couponData: CouponResponseModel;
  healthData = null;

}

const healthStore = new HealthStore();
export default healthStore;


