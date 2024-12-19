
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
    survey_id: number,
    total_score: number,
    activiti_value_json: ActivitiValueModel
}

export type ActivitiValueModel = {
        'fiz-act': number,
        sleep: number,
        anistres: number,
        pitaniye: number
}

export type MyTestModel = {
    id: number,
    survey_id: number,
    name: string,
    total_score: number,
    activiti_value_json: ActivitiValueModel,
    created_at: string,
}