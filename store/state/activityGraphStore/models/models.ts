import { CupsType } from '../../../../app/screens/ifg-home/blocks/data/data-cups';

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
    isDrinkEight: boolean,
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

export type StoreDailyActivities = {
    steps?: number,
    calories?: number,
    floor_spans?: number,
    food?: number,
    stress?: number,
    sleep?: number,
    phisical_activity?: number,
    watter?: number,
    isDrinkEight?: boolean
}

export type DailyActivitySettingsModel = {
    steps: number,
    calories: number,
    floor_spans: number,
    ifg_scores: number,
    max_ifg: number,
}

