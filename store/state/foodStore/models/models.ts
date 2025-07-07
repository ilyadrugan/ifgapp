
export type FoodModel = {
    id: number;
    name: string;
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
};

export type FoodMealModel = {
    food_id: number;
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
    amount: number;
    type: string;
    eat_at: string;
};

export type GoalModel = {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
};

type Goal = {
    goal: number,
    current: number
}

export type MyCurrentGoalModel = {
    calories: Goal;
    proteins: Goal;
    fats: Goal;
    carbohydrates: Goal;
}
