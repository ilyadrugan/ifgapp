import { makeAutoObservable } from 'mobx';
import { addPaymentCardApi } from './paymentsStore.api';
import { PaymentDataModel } from './models/models';


class PaymentsStore {
  isLoading = false; // Состояние загрузки
  paymentData: PaymentDataModel;
  constructor() {
    makeAutoObservable(this); // Делаем объект реактивным
  }

  addPaymentCard = async () => {
    this.isLoading = true;
    //   this.errorMessage = '';
      await addPaymentCardApi()
        .then((result)=>{
          console.log('paymentData', result.data);
          this.paymentData = result.data;
        }
        )
        .catch((err)=>{
          console.log('ERROR addPaymentCardApi', err.message);

        })
        .finally(()=>{this.isLoading = false;});
  };
}

const paymentsStore = new PaymentsStore();
export default paymentsStore;

