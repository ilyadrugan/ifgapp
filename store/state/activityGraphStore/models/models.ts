
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
    watter: number,
    score:{score: number}
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

export type DailyCommonModel = {
    calories?: number,
    steps?: number,
    score?: number,
    created_at: string,
}

export type GraphDataType = {
    value: number,
    created_at: string,
}

