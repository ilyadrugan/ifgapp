
export type DailyActivityModel = {
    date: string,
    steps: number,
    calories: number,
    floor_spans: number,
    id: number,
    food: number,
    stress: number,
    sleep: number,
    phisical_activity: number,
    watter: number
}

export type DailyCaloriesModel = {
    calories: number,
    created_at: string,
}

export type DailyStepsModel = {
    steps: number,
    created_at: string,
}

export type DailyIfgScoreModel = {
    score: number,
    created_at: string,
}
