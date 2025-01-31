import { makeAutoObservable } from 'mobx';
import { getTariffsApi } from './tariffsStore.api';
import { TariffModel } from './models/models';


class TariffsStore {
  isLoading = false; // Состояние загрузки
  tariffs: TariffModel[] = [];
  tariffChoosed: TariffModel;
  constructor() {
    makeAutoObservable(this); // Делаем объект реактивным
    this.getTariffs();
  }

  setChoosedTariff = (tariff: TariffModel | undefined) => {
    if (tariff)
    {this.tariffChoosed = tariff;}
  };

  getTariffs = async () => {
      this.isLoading = true;
    //   this.errorMessage = '';
      await getTariffsApi()
        .then((result)=>{
          console.log('tariffs', result.data);
          this.tariffs = result.data;
        }
        )
        .catch((err)=>{
          console.log('ERROR', err.message);

        })
        .finally(()=>{this.isLoading = false;});
    };
}

const tariffsStore = new TariffsStore();
export default tariffsStore;

