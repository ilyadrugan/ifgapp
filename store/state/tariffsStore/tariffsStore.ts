import { makeAutoObservable } from 'mobx';
import { getTariffsApi, getTariffsApiCookie } from './tariffsStore.api';
import { TariffModel } from './models/models';
import CookieManager from '@react-native-cookies/cookies';
import axios from 'axios';
import { PROD_URL } from '../../../app/core/hosts';
import { setCookies } from '../../../app/core/http-client/http-client';

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

  getTariffs = async (code?: string) => {
    console.log('GET TARIFFS');
      this.isLoading = true;
    //   this.errorMessage = '';
      let cookiesString = '';
      if (code) {
        await setCookies(code);
        console.log(`${PROD_URL}/get-tariffs`);
        const cookies = await CookieManager.get(PROD_URL);
        console.log('Текущие куки:', cookies);

        const cookieString = Object.entries(cookies)
            .map(([name, { value }]) => `${name}=${value}`)
            .join('; ');

        axios.get(`${PROD_URL}/get-tariffs`, {
            headers: {
              Cookie: cookieString,
            },
            withCredentials: true, // Включаем куки в запросе
          })
          .then(response =>  this.tariffs = response.data.tariffs)
          .catch(error => console.error('Ошибка:', error.response?.data || error));
        return;
      }
      await getTariffsApi(cookiesString, code)
        .then((result)=>{
          console.log('tariffs', result.data);
          this.tariffs = result.data.tariffs;
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

