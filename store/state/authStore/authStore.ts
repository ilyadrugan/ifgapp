import { makeAutoObservable } from 'mobx';
import { deleteProfile, forgotPasswordApi, login, registration } from './authStore.api';
import userStore from '../userStore/userStore';
import { deleteAuthTokenToStorage, getAuthTokenFromStorage, saveAuthTokenToStorage } from '../../../app/core/utils/bearer-token';
import { UserInfo } from '../userStore/models/models';
import { LoginByUserPasswordModel, LoginByUserPasswordState, RegisterFormModel, RegisterFormState } from './models/models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateFirebaseMessagingToken } from '../../../app/core/firebase/firebase';
import { errorToast, successToast } from '../../../app/core/components/toast/toast';
import { updateDeviceResultsTestApi } from '../testingStore/testingStore.api';
import { stripHtmlTags } from '../../../app/core/utils/stripHtmlTags';
import { TimeZone } from '../../../app/hooks/useTimezone';

class AuthStore {
  isAuthenticated = false; // Авторизован ли пользователь
  isLoading = false; // Состояние загрузки
  isOnBoarded = false;
  access_token: string = '';
  userInfo: UserInfo | null = null;
  errorMessage: string = '';
  loginByUserPassword: LoginByUserPasswordState = {loginInputError: '', passwordInputError: ''};
  registerByPromocode: RegisterFormState = {
    nameInputError: '',
    last_nameInputError: '',
    phoneInputError: '',
    promocodeInputError: '',
    passwordInputError: '',
    password_confirmationInputError: '',
    emailInputError: '',
   };
   registerByNumDoc: RegisterFormState = {
    phoneInputError: '',
    passwordInputError: '',
    password_confirmationInputError: '',
    emailInputError: '',
    birthdayInputError: '',
    num_docInputError: '',
   };
  checkAuthUser = async () => {
    const token = await getAuthTokenFromStorage();
    if (token) {
      this.setToken(token);
      console.log('TOKEN', token);
      this.isAuthenticated = true;
      console.log('getProfile');
      await userStore.getProfile();
    }
  };

  constructor() {
    this.checkIsOnBoarded();
    this.checkAuthUser();
    makeAutoObservable(this); // Делаем объект реактивным
  }

  setToken = async (token) => {
    this.access_token = token;
    await saveAuthTokenToStorage(token);
  };
  //Обработка ошибок логина
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
  //Обработка ошибок регистрации по промокоду
  fillRegisterByPromocodeInputError = (field: string, error: string) => {
    this.registerByPromocode[`${field}InputError`] =  error;
  };
  clearRegisterByPromocodeInputError = (field: string) => {
    this.registerByPromocode[`${field}InputError`] =  '';
  };
  clearAllRegisterByPromocodeInputError = () => {
    this.registerByPromocode = {
    nameInputError: '',
    last_nameInputError: '',
    phoneInputError: '',
    promocodeInputError: '',
    passwordInputError: '',
    password_confirmationInputError: '',
    emailInputError: '',
   };
  };

  //Обработка ошибок регистрации по договору
  fillRegisterByNumDocInputError = (field: string, error: string) => {
    this.registerByNumDoc[`${field}InputError`] =  error;
  };
  clearRegisterByNumDocInputError = (field: string) => {
    this.registerByNumDoc[`${field}InputError`] =  '';
  };
  clearAllRegisterByNumDocInputError = () => {
    this.registerByNumDoc = {
      phoneInputError: '',
      passwordInputError: '',
      password_confirmationInputError: '',
      emailInputError: '',
      birthdayInputError: '',
      num_docInputError: '',
     };
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
        if (result.data) {
        this.setToken(result.data.access_token);
        userStore.setUser(result.data.user);
        this.setIsOnBoarded();
        console.log('login updateFirebaseMessagingToken');
        updateFirebaseMessagingToken()
          .then(res=> console.log('updateFirebaseMessagingToken', res.data))
          .catch((err)=>{
            console.log('updateFirebaseMessagingToken Error',err.message);
            errorToast(err.message);
          });
        this.access_token && callBack();
      }
      })
      .catch((err)=>{
        console.log('login ERROR',err.response.data);

        if (err.response.data.error || err.response.data.message) {

          this.errorMessage = err.response.data.error;
          errorToast('Неправильно введён логин или пароль');
        }
        else {
          this.errorMessage = 'Неизвестная ошибка';
          errorToast('Неизвестная ошибка');
        }
      })
      .finally(()=>{this.isLoading = false;});
      // this.isLoading = false;
  }
  async register(model: RegisterFormModel, callBack: ()=>void) {
    this.isLoading = true;
    this.errorMessage = '';
    await registration(model)
      .then(async (result)=>{
        console.log('THEN');
        console.log(result.data);
        if (result.data) {
        this.setToken(result.data.token);
        userStore.setUser(result.data.data.user);
        const token = await AsyncStorage.getItem('fcm_token') || '';
        console.log('updatedResultsTest',token, TimeZone);
        if (token) {
          console.log(token, TimeZone);
          await updateDeviceResultsTestApi(token, TimeZone)
          .then(res=>console.log('updatedResultsTestApi'))
          .catch(err=>{
            console.log('updateDeviceResultsTestApi ERROR',err.message);
          });
        }
        await updateFirebaseMessagingToken()
          .then(res=> console.log(res.data))
          .catch((err)=>{
            console.log('updateFirebaseMessagingToken Error',err.message);
            errorToast(err.message);
          });
        this.isLoading = false;
        this.access_token && callBack();
      }
      })
      .catch((err)=>{
        console.log('registration ERROR',err.response.data.user);
        if (err.response.data.order) {
          callBack();
        }
        else if (err.response.data.user.id) {
          errorToast('Такой email уже занят');
        }

        console.log('registration ERROR',err.response.data.errors);
        if (err.response.data.errors.promocode) {
          console.log('Full error response:', err.response.data); // Полный JSON ошибки
          console.log('Error message:', err.response.data.message); // Текст ошибки
          console.log('Validation errors:', err.response.data.errors); // Детали ошибок

          this.errorMessage = err.response.data.errors.promocode[0];
          // this.errorMessage = 'Промокод не найден';

          errorToast(this.errorMessage);
        }
        else if (err.response.data.errors.num_doc){
          this.errorMessage = err.response.data.errors.num_doc[0].replaceAll('<br>', '\n');
          errorToast(this.errorMessage, '', 8000);
        }
        else if (err.response.data.errors.email){
          this.errorMessage = err.response.data.errors.email;
          errorToast(this.errorMessage);
        }
        else {
          this.errorMessage = 'Неизвестная ошибка';
          errorToast('Неизвестная ошибка');
        }
      })
      .finally(()=>{this.isLoading = false;});
      // this.isLoading = false;
  }

  async delete(callBack: ()=>void) {
    this.isLoading = true;
    this.errorMessage = '';
    await deleteProfile()
      .then((result)=>{
        console.log(result.data);
        if (result.data) {
          this.isAuthenticated = false;
          this.access_token = '';
          deleteAuthTokenToStorage();
          callBack();
      }
      })
      .catch((err)=>{
        console.log('ERROR');
        this.errorMessage = err.message;

      });
      // .finally(()=>{this.isLoading = false;});
      this.isLoading = false;
  }
  async forgotPassword(email: string) {
    this.isLoading = true;
    const model = {
      email: email,
    };
    await forgotPasswordApi(model)
      .then((result)=>{
        console.log('result.status', result.status);
        if (result.status === 200) {
          successToast('Вам отправлено на почту письмо!');
        }
      })
      .catch((err)=>{
        console.log('ERROR forgotpassword', err);
        this.errorMessage = err.message;
        // errorToast(this.errorMessage)
        errorToast('Такой email не зарегистрирован');
      });
      // .finally(()=>{this.isLoading = false;});
      this.isLoading = false;
  }
  async checkIsOnBoarded() {
    const isBoarded = await AsyncStorage.getItem('isOnBoarded');
    console.log('checkIsOnBoarded isBoarded',isBoarded)
    if (isBoarded) {
      this.isOnBoarded = true;
    }
  }

  async setIsOnBoarded() {
    await AsyncStorage.setItem('isOnBoarded', 'true');
    this.isOnBoarded = true;
     const isBoarded = await AsyncStorage.getItem('isOnBoarded');
    console.log('setIsOnBoarded isBoarded',isBoarded)
  }

  // Выход из аккаунта
  async logout() {
    this.isAuthenticated = false;
    this.access_token = '';

    await deleteAuthTokenToStorage();
  }
}

const authStore = new AuthStore();
export default authStore;
