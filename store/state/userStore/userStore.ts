import { makeAutoObservable } from 'mobx';
import { UserChangeInfoModel, UserChangeInfoState, UserInfo } from './models/models';
import { BASE_URL } from '../../../app/core/hosts';
import authStore from '../authStore/authStore';
import axios from 'axios';
import { changeProfile } from './userStore.api';
import { errorToast, successToast } from '../../../app/core/components/toast/toast';


class UserStore {
  isLoading = false; // Состояние загрузки
  userInfo: UserInfo | null = null;
  userChangeInfoState: UserChangeInfoState = {
    nameInputError: '',
    last_nameInputError: '',
    phoneInputError: '',
    emailInputError: '',
   };
  constructor() {
    makeAutoObservable(this); // Делаем объект реактивным
  }

  setUser(user: UserInfo){
    this.userInfo = user;
  }
  fillChangeInputError = (field: string, error: string) => {
      this.userChangeInfoState[`${field}InputError`] =  error;
  };
  getProfile = async () => {
    this.isLoading = true;
        try {
          const response = await axios(`${BASE_URL}/lk`, {
            headers: {

              Authorization: 'Bearer ' + authStore.access_token,
              'Cache-Control': 'no-cache',

            },
          });
          // console.log(response.data.profile);
          if (response.data.profile) {
            // Используем стрелочную функцию, контекст this сохраняется
            // this.setUser({
            //   name: response.data.profile.name,
            //   phone: response.data.profile.phone,
            //   last_name: response.data.profile.last_name,
            //   email: response.data.profile.email,
            //   profile_photo_url: response.data.profile.profile_photo_url,
            //   birthday: response.data.profile.birthday,
            // } as UserInfo);
            this.userInfo = response.data.profile;
            this.isLoading = false;
            // console.log(userStore.userInfo);
          }
        } catch (error) {
          console.error('getProfile',error);
          this.isLoading = false;
        }

    };

    changeProfile = async (model: UserChangeInfoModel) => {
      this.isLoading = true;
      // console.log('UserChangeInfoModel',model);
      await changeProfile(model)
      .then(()=>{
        // console.log(result.data);
        userStore.getProfile();
        this.isLoading = false;
        successToast('Данные успешно изменены');
      })
      .catch((err)=>{
        console.log('ERROR', err);
        // this.errorMessage = err.message;
        this.isLoading = false;
        errorToast('Произошла ошибка');
      });
  };
}

const userStore = new UserStore();
export default userStore;

