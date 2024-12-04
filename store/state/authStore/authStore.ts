import { makeAutoObservable } from 'mobx';
import { login } from './authStore.api';
import userStore from '../userStore/userStore';
import { getAuthTokenFromStorage, saveAuthTokenToStorage } from '../../../app/core/utils/bearer-token';
import { UserInfo } from '../userStore/models/models';
import { LoginByUserPasswordModel, LoginByUserPasswordState } from './models/models';

class AuthStore {
  isAuthenticated = false; // Авторизован ли пользователь
  isLoading = false; // Состояние загрузки
  access_token: string = '';
  userInfo: UserInfo | null = null;
  errorMessage: string = '';
  loginByUserPassword: LoginByUserPasswordState = {loginInputError: '', passwordInputError: ''};
  checkAuthUser = async () => {
    const token = await getAuthTokenFromStorage();
    if (token) {
      this.access_token = token;
      console.log('TOKEN', token);
      this.isAuthenticated = true;
      userStore.getProfile();
      console.log('getProfile');
    }
  };
  constructor() {
    makeAutoObservable(this); // Делаем объект реактивным
    this.checkAuthUser();
  }



  setToken = async (token) => {
    this.access_token = token;
    await saveAuthTokenToStorage(token);
  };

  clearEmailError = () => {
    this.loginByUserPassword.loginInputError = '';
  };
  clearPasswordError = () => {
    this.loginByUserPassword.passwordInputError =  '';
  };
  clearMessageError = () => {
    this.errorMessage =  '';
  };
  fillEmailError = (error: string) => {
    this.loginByUserPassword.loginInputError = error;
  };
  fillPasswordError = (error: string) => {
    this.loginByUserPassword.passwordInputError =  error;
  };
  async login(model: LoginByUserPasswordModel, callBack: ()=>void) {
    this.isLoading = true;
    this.errorMessage = '';
    await login(model)
      .then((result)=>{
        console.log('THEN');
        if (!model.email) {this.loginByUserPassword.loginInputError = 'Заполните поле';}
        if (!model.password) {this.loginByUserPassword.passwordInputError = 'Заполните поле';}
        console.log(result.data);
        if (result.data){
        this.setToken(result.data.access_token);
        userStore.setUser(result.data.user);
        this.access_token && callBack();}
      })
      .catch((err)=>{
        console.log('ERROR');
        this.errorMessage = err.message;

      });
      // .finally(()=>{this.isLoading = false;});
      this.isLoading = false;
  }

  // Выход из аккаунта
  logout() {
    this.isAuthenticated = false;
  }
}

const authStore = new AuthStore();
export default authStore;
