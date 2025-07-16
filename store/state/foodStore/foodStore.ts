import {FoodMealModel, FoodModel, GoalModel, MyCurrentGoalModel} from './models/models';
import {createFoodGoalApi, createMealApi, deleteMyMealByIdApi, getFoodGoalApi, getFoodListApi, getMyMealByIdApi, getMyMealsApi, updateMyMealByIdApi} from './foodStore.api';
import { deepEqual } from '../../../app/core/utils/deepEqual';
import { makeAutoObservable } from 'mobx';
import { formatDateToYYYYMMDD } from '../../../app/core/utils/formatDateTime';

const defaultGoal: MyCurrentGoalModel = {
  calories: {
      goal: 2200,
      current: 0,
    },
    proteins: {
      goal: 90,
      current: 0,
    },
    fats: {
      goal: 80,
      current: 0,
    },
    carbohydrates: {
      goal: 300,
      current: 0,
    },
};

const emptyGoal: MyCurrentGoalModel = {
  calories: {
      goal: 0,
      current: 0,
    },
    proteins: {
      goal: 0,
      current: 0,
    },
    fats: {
      goal: 0,
      current: 0,
    },
    carbohydrates: {
      goal: 0,
      current: 0,
    },
};

const isToday = (date: string): boolean => {
  const inputDate = new Date(date);
  const today = new Date();

  return (
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() === today.getDate()
  );
};

class FoodStore {
  isLoading = false; // Состояние загрузки
  haveGoal = false;
  products: FoodModel[] = [];
  myCurrentGoal: MyCurrentGoalModel = emptyGoal;
  myTodayGoal: MyCurrentGoalModel = emptyGoal;
  myMeals: FoodMealModel[] = [];
  currentMeal: FoodMealModel;
  errorMessage = '';

  constructor() {
   makeAutoObservable(this); // Делаем объект реактивным
  }

  async loadFood() {
      this.isLoading = true;
      await getFoodListApi()
        .then((result)=>{
          console.log(result.data.length);
          this.products = result.data;
        }
        )
        .catch((err)=>{
          console.log('ERROR',  err.message);
          this.errorMessage = err.message;

        })
        .finally(()=>{this.isLoading = false;});
  }
  async getMyFoodGoal(date: string) {
      this.isLoading = true;
      await getFoodGoalApi(date)
        .then(async (result)=>{
          console.log(result.data);
          if (deepEqual(result.data, emptyGoal)) {
            console.log('goalllllll');
            this.haveGoal = false;
          }
          else {
            this.haveGoal = true;
          }
          this.myCurrentGoal = result.data;
          if (isToday(date)) {
            console.log('');
            await this.getMyFoodGoalToday();
          }
        }
        )
        .catch((err)=>{
          console.log('ERROR',  err.message);
          this.errorMessage = err.message;

        })
        .finally(()=>{this.isLoading = false;});
  }
  async getMyFoodGoalToday() {
      this.isLoading = true;
      await getFoodGoalApi(formatDateToYYYYMMDD(new Date()))
        .then((result)=>{
          console.log(result.data);
          if (deepEqual(result.data, emptyGoal)) {
            console.log('goalllllll');
            this.haveGoal = false;
          }
          else {
            this.haveGoal = true;
          }
          this.myTodayGoal = result.data;
        }
        )
        .catch((err)=>{
          console.log('ERROR',  err.message);
          this.errorMessage = err.message;

        })
        .finally(()=>{this.isLoading = false;});
  }
  async createMyFoodGoal(model: GoalModel) {
      // this.isLoading = true;
      await createFoodGoalApi(model)
        .then((result)=>{
          console.log('createMyFoodGoal result',result.data);
          this.myCurrentGoal = {
            calories: {
              goal: result.data.calories,
              current: this.myCurrentGoal.calories.current,
            },
            carbohydrates: {
              goal: result.data.carbohydrates,
              current: this.myCurrentGoal.carbohydrates.current,
            },
            fats: {
              goal: result.data.fats,
              current: this.myCurrentGoal.fats.current,
            },
            proteins: {
              goal: result.data.proteins,
              current: this.myCurrentGoal.proteins.current,
            },
          };
          this.haveGoal = true;
        }
        )
        .catch((err)=>{
          console.log('ERROR',  err.message);
          this.errorMessage = err.message;

        });
        // .finally(()=>{this.isLoading = false;});
  }
  async getMyMeals(date: string) {
      this.isLoading = true;
      await getMyMealsApi(date)
        .then((result)=>{
          console.log('getMyMealsApi result',result.data);
          this.myMeals = result.data;
        }
        )
        .catch((err)=>{
          console.log('ERROR',  err.message);
          this.errorMessage = err.message;

        })
        .finally(()=>{this.isLoading = false;});
  }
  async getMyMealById(id: number) {
      this.isLoading = true;
      await getMyMealByIdApi(id)
        .then((result)=>{
          console.log(result.data);
          this.currentMeal = result.data;
        }
        )
        .catch((err)=>{
          console.log('ERROR',  err.message);
          this.errorMessage = err.message;

        })
        .finally(()=>{this.isLoading = false;});
  }
  async createMyMeal(model: FoodMealModel) {
      this.isLoading = true;
      await createMealApi(model)
        .then(async (result)=>{
          console.log(result.data);

        }
        )
        .catch((err)=>{
          console.log('ERROR',  err.message);
          this.errorMessage = err.message;

        })
        .finally(()=>{this.isLoading = false;});
  }
  async updateMyMeal(id:number, model: FoodMealModel) {
      this.isLoading = true;
      await updateMyMealByIdApi(id, model)
        .then(async (result)=>{
          console.log(result.data);
        }
        )
        .catch((err)=>{
          console.log('ERROR',  err.message);
          this.errorMessage = err.message;

        })
        .finally(()=>{this.isLoading = false;});
  }
  async deleteMyMeal(id:number) {
    console.log('delete', id);
      this.isLoading = true;
      await deleteMyMealByIdApi(id)
        .then(async (result)=>{
          console.log(result.data);

        }
        )
        .catch((err)=>{
          console.log('ERROR',  err.message);
          this.errorMessage = err.message;

        })
        .finally(()=>{this.isLoading = false;});
  }
}

const foodStore = new FoodStore();
export default foodStore;


