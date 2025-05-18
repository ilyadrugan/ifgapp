export type HelthData = {
    caloriesBurned: number;
    flightsClimbed: number;
    steps: number;
}

export type StepData = {
    created_at: string;
    steps: number;
}
export type CalorieData = {
    created_at: string;
    calories: number;
}

export type HealthDataByDate = {
    date: string;
    calories: number;
    steps: number;
}
