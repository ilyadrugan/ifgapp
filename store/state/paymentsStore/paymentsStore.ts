import { makeAutoObservable } from 'mobx';
import { addPaymentCardApi, changeFavoriteCardApi, deleteCardApi, getCardsApi } from './paymentsStore.api';
import { CardModel, PaymentDataModel } from './models/models';
import { successToast } from '../../../app/core/components/toast/toast';


class PaymentsStore {
  isLoading = false; // Состояние загрузки
  isCardLoadingObj = {
    isLoading: false,
    cardId: 0,
  }; // Состояние загрузки
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
    console.log('getPaymentCards');
    this.isLoading = true;
    //   this.errorMessage = '';
      await getCardsApi()
        .then((result)=>{
          console.log('PaymentCards', result.data.data);
          this.cards = result.data.data;
          // this.cards = [...result.data.data.filter((card)=>card.default), ...result.data.data.filter((card)=>!card.default)];
        }
        )
        .catch((err)=>{
          console.log('ERROR getCardsApi', err.message);

        })
        .finally(()=>{this.isLoading = false;});
  };
  deletePaymentCard = async (id: number) => {
    console.log('deletePaymentCard');
    this.isCardLoadingObj = {
      isLoading: true,
      cardId: id,
    };

    //   this.errorMessage = '';
      await deleteCardApi(id)
        .then((result)=>{
          console.log('deletePaymentCard', result.data);
          const card = this.cards.find((item)=>item.id === id);
          if (card?.default){
            this.changeFavoritePaymentCard(this.cards[1].id);
          }
          this.getPaymentCards();
          // this.cards = [...this.cards.filter((card)=>card.id !== id)];
          successToast(result.data.message);
        }
        )
        .catch((err)=>{
          console.log('ERROR deletePaymentCard', err.message);

        })
        .finally(()=>{
          this.isCardLoadingObj = {
            isLoading: false,
            cardId: 0,
          };
        });
  };
  changeFavoritePaymentCard = async (id: number) => {
    console.log('changeFavoritePaymentCard');
    this.isCardLoadingObj = {
      isLoading: true,
      cardId: id,
    };
    //   this.errorMessage = '';
      await changeFavoriteCardApi(id)
        .then((result)=>{
          console.log('changeFavoriteCardApi', result.data);
          this.getPaymentCards();
          successToast('Способ оплаты успешно изменён!');
        }
        )
        .catch((err)=>{
          console.log('ERROR changeFavoriteCardApi', err.message);

        })
        .finally(()=>{
          this.isCardLoadingObj = {
            isLoading: false,
            cardId: 0,
          };
        });
  };
}

const paymentsStore = new PaymentsStore();
export default paymentsStore;

