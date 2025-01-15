import { makeAutoObservable } from 'mobx';
import { addPaymentCardApi, getCardsApi } from './paymentsStore.api';
import { CardModel, PaymentDataModel } from './models/models';


class PaymentsStore {
  isLoading = false; // Состояние загрузки
  paymentData: PaymentDataModel;
  cards: CardModel[] = [];
  constructor() {
    makeAutoObservable(this); // Делаем объект реактивным
  }

  addPaymentCard = async () => {
    this.isLoading = true;
    //   this.errorMessage = '';
      await addPaymentCardApi()
        .then((result)=>{
          // console.log('paymentData', result.data);
          this.paymentData = result.data;
        }
        )
        .catch((err)=>{
          console.log('ERROR addPaymentCardApi', err.message);

        })
        .finally(()=>{this.isLoading = false;});
  };
  getPaymentCards = async () => {
    this.isLoading = true;
    //   this.errorMessage = '';
      await getCardsApi()
        .then((result)=>{
          // console.log('PaymentCards', result.data);
          this.cards = [...result.data.data.filter((card)=>card.default), ...result.data.data.filter((card)=>!card.default)];
        }
        )
        .catch((err)=>{
          console.log('ERROR getCardsApi', err.message);

        })
        .finally(()=>{this.isLoading = false;});
  };
}

const paymentsStore = new PaymentsStore();
export default paymentsStore;

