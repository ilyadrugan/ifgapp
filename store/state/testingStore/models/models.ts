
export type TestModel = {
    id: number,
    name: string,
    testLength: number,
    questions: QuestionModel[]
}

export type QuestionModel = {
    name: string,
    group: string,
    choices: ChoiceModel[]
}
export type ChoiceModel = {
    score: number,
    value: string
}

export type ResultsTestModel = {
    id: number,
    survey_id: number,
    device_id?: string,
    user_id?: number,
    total_score: number,
    activiti_value_json: string,
    answers_json: string,
    // activiti_value: string
}
export type MyCurrentResultsTestModel = {
    id: number,
    survey_id: number,
    total_score: number,
    activiti_value_json: ActivitiValueViewModel,
    // activiti_value: string
}
export type ActivitiValueModel = {
        'fizact': number,
        sleep: number,
        anistres: number,
        pitaniye: number
}

export type ActivitiValueViewModel = {
    'Сон': number,
    'Питание': number,
    'Антистресс': number,
    'Физическая активность': number
}

export type MyTestModel = {
    id: number,
    survey_id: number,
    name: string,
    total_score: number,
    activiti_value_json: string,
    created_at: string,
}

export type TestListModel = {
    surveys: MyTestModel[],
    total: number,
    current_page: number,
    isLoading: boolean,
    hasMore: boolean
};
