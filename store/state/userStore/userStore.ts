import { makeAutoObservable } from 'mobx';
import { UserInfo } from './models/models';
import { getProfile } from './userStore.api';
import { BASE_URL } from '../../../app/core/hosts';
import HttpClient from '../../../app/core/http-client/http-client';
import authStore from '../authStore/authStore';
import axios from 'axios';


class UserStore {
  isAuthenticated = false; // Авторизован ли пользователь
  isLoading = false; // Состояние загрузки
  userInfo: UserInfo | null = null;

  constructor() {
    makeAutoObservable(this); // Делаем объект реактивным
  }

  setUser(user: UserInfo){
    this.userInfo = user;
    }

   getProfile = async () => {
    this.isLoading = true;
        try {
          const response = await axios('https://xsaht.100qrs.ru/api/lk', {
            headers: {
              Authorization: 'Bearer ' + authStore.access_token,
              'Cache-Control': 'no-cache',
            },
          });
          console.log(response.data.profile);
          if (response.data.profile) {
            // Используем стрелочную функцию, контекст this сохраняется
            this.setUser({
              name: response.data.profile.name,
              phone: response.data.profile.phone,
              last_name: response.data.profile.last_name,
              email: response.data.profile.email,
              profile_photo_url: response.data.profile.profile_photo_url,
              birthday: response.data.profile.birthday,
            } as UserInfo);
          }
        } catch (error) {
          console.error(error);
        }
        this.isLoading = false;

    };
  // Выход из аккаунта
  logout() {
    this.isAuthenticated = false;
  }
}

const userStore = new UserStore();
export default userStore;

