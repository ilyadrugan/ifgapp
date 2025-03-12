import { makeAutoObservable } from 'mobx';
import { UserChangeInfoModel, UserChangeInfoState, UserInfo } from './models/models';
import { BASE_URL } from '../../../app/core/hosts';
import authStore from '../authStore/authStore';
import axios from 'axios';
import { changeProfile, getProfileApi } from './userStore.api';
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
  clearChangeInputError = (field: string) => {
    this.userChangeInfoState[`${field}InputError`] =  '';
  };
  getProfile = async (withNoUpdate = false) => {
    this.isLoading = withNoUpdate ? false : true;
    await getProfileApi()
      .then((result)=>{
        if (result.data.profile) {
          this.userInfo = result.data.profile;
        }
      })
      .catch((err)=>{
        console.log('ERROR', err);
        // this.errorMessage = err.message;
        // errorToast('Произошла ошибка');
      }).finally(()=>this.isLoading = false);

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
        // errorToast('Произошла ошибка');
      });
  };
}

const userStore = new UserStore();
export default userStore;

