import HttpClient from '../../../app/core/http-client/http-client';
import { API_URL  } from '../../../app/core/hosts';
import { FoodMealModel, GoalModel } from './models/models';

export const getFoodListApi = async () => {
    console.log(`${API_URL}/api/nutrition/foods`);
    return await HttpClient.get(`${API_URL}/api/nutrition/foods`);
};

export const getFoodGoalApi = async (date: string) => {
    console.log(`${API_URL}/api/nutrition/pfc?date=${date}`);
    return await HttpClient.get(`${API_URL}/api/nutrition/pfc?date=${date}`);
};

export const createFoodGoalApi = async (model: GoalModel) => {
    console.log(`${API_URL}/api/nutrition/pfc/set`, model);
    return await HttpClient.post(`${API_URL}/api/nutrition/pfc/set`, model);
};


export const getMyMealsApi = async (date: string) => {
    console.log(`${API_URL}/api/nutrition/meals?date=${date}`);
    return await HttpClient.get(`${API_URL}/api/nutrition/meals?date=${date}`);
};

export const getMyMealByIdApi = async (id: number) => {
    console.log(`${API_URL}/api/nutrition/meals/${id}`);
    return await HttpClient.get(`${API_URL}/api/nutrition/meal/${id}`);
};

export const createMealApi = async (model: FoodMealModel) => {
    console.log(`${API_URL}/api/nutrition/meal/create`, model);
    return await HttpClient.post(`${API_URL}/api/nutrition/meal/create`, model);
};

export const updateMyMealByIdApi = async (id: number, model: FoodMealModel) => {
    console.log(`${API_URL}/api/nutrition/meal/${id}/update`, model);
    return await HttpClient.post(`${API_URL}/api/nutrition/meal/${id}/update`, model);
};

export const deleteMyMealByIdApi = async (id: number) => {
    console.log(`${API_URL}/api/nutrition/meal/${id}/delete`);
    return await HttpClient.delete(`${API_URL}/api/nutrition/meal/${id}/delete`);
};
