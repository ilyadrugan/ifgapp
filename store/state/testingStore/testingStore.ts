import { makeAutoObservable } from 'mobx';
import { ActivitiValueModel, MyCurrentResultsTestModel, MyTestModel, QuestionModel, ResultsTestModel, TestModel } from './models/models';
import { getAllMyTestApi, getTestByIdApi, submitResultsTestApi } from './testingStore.api';

class TestingStore {
  isLoading = false; // Состояние загрузки
  testsList: MyTestModel[] = [];
  currentTest: TestModel;
  currentResultsTest: ResultsTestModel;
  myCurrentResultsTest: MyCurrentResultsTestModel = {
    id: 0,
    survey_id: 0,
    total_score: 0,
    activiti_value_json: {
      'Сон': 0,
      'Антистресс': 0,
      'Питание': 0,
      'Физическая активность': 0,
    },
  };
  errorMessage: string = '';
  disableRecommendationCheck: boolean = true;
  constructor() {
    makeAutoObservable(this); // Делаем объект реактивным
    this.clearMyCurrentResultsTest();
    this.getAllMyTest();
  }
  remapQuestions (pages: any) {
    return pages.map((element)=>{
      const question: QuestionModel = {
        name: element.elements[0].name,
        group: element.elements[0].group,
        choices: element.elements[0].choices,
      };
      return question;
    });
  }
  setMyCurrentResultsTest(testId: number) {
    console.log('setMyCurrentResultsTest', testId);
    this.disableRecommendationCheck = true;
    const test = this.testsList.find((test, index)=>{
      if (index === 0 && test.id === testId) {this.disableRecommendationCheck = false;}
      return (test.id === testId);});
    console.log('setMyCurrentResultsTest', test);
    if (test) {
      this.myCurrentResultsTest = {
      id: test?.id,
      survey_id: test.survey_id,
      total_score: test.total_score,
      activiti_value_json: JSON.parse(test.activiti_value_json),
    };
    }
    else {
      this.disableRecommendationCheck = false;
      this.myCurrentResultsTest = {
        id: this.currentResultsTest.id,
        survey_id: this.currentResultsTest.survey_id,
        total_score: this.currentResultsTest.total_score,
        activiti_value_json: {
          Сон: JSON.parse(this.currentResultsTest.activiti_value_json).sleep,
          Антистресс: JSON.parse(this.currentResultsTest.activiti_value_json).anistres,
          Питание: JSON.parse(this.currentResultsTest.activiti_value_json).pitaniye,
          'Физическая активность': JSON.parse(this.currentResultsTest.activiti_value_json).fizact,
        },
    };
  }
  }
  clearMyCurrentResultsTest() {
      this.myCurrentResultsTest = {
      id: 0,
      survey_id: 0,
      total_score: 0,
      activiti_value_json: {
        'Сон': 0,
        'Антистресс': 0,
        'Питание': 0,
        'Физическая активность': 0,
      },
    };
  }
  setScoreToResult(total_score: number, activitiValues: ActivitiValueModel, answers: string, user_id?: number | undefined, device_id?: string | undefined) {
    this.currentResultsTest = {
      id: 0,
      survey_id: this.currentTest.id,
      total_score: total_score,
      activiti_value_json: JSON.stringify(activitiValues),
      answers_json: answers,
    };
    if (device_id) {this.currentResultsTest = {...this.currentResultsTest, device_id: device_id};}
    if (user_id) {this.currentResultsTest = {...this.currentResultsTest, user_id: user_id};}
  }
  async submitTest(results: ResultsTestModel) {
    this.isLoading = true;
    this.errorMessage = '';
    console.log('submitTest', results);
    await submitResultsTestApi(results)
      .then((result)=>{
        console.log('result', result.data.data);
        this.currentResultsTest = {...this.currentResultsTest, id: result.data.data.id};
      }
      )
      .catch((err)=>{
        console.log('submitTest ERROR', err.message);
        this.errorMessage = err.message;
      })
      .finally(()=>{this.isLoading = false;});
  }
  async getTestById(id: number) {
    this.isLoading = true;
    this.errorMessage = '';
    await getTestByIdApi(id)
      .then((result)=>{
        // console.log('result.data.data.json', result.data.data.json.pages[0]);
        this.currentTest = {
          id: result.data.data.id,
          name: result.data.data.name,
          testLength: result.data.data.json.pages.length,
          questions: this.remapQuestions(result.data.data.json.pages),
        };
      }
      )
      .catch((err)=>{
        console.log('ERROR', err.message);
        this.errorMessage = err.message;

      })
      .finally(()=>{this.isLoading = false;});
  }
  async getAllMyTest() {
    this.isLoading = true;
    this.errorMessage = '';
    await getAllMyTestApi()
      .then((result)=>{
        // console.log('result.data.data.json', result.data.surveys);
        this.testsList = result.data.surveys.data.map((test)=>{
          // console.log(test.activiti_value_json);
          return {
            id: test.id,
            total_score: test.total_score,
            survey_id: test.survey_id,
            activiti_value_json: test.activiti_value_json,
            created_at: test.created_at,
            name: test.survey.name,
          } as MyTestModel;
        });
        // console.log( this.testsList);
      }
      )
      .catch((err)=>{
        console.log('ERROR', err.message);
        this.errorMessage = err.message;

      })
      .finally(()=>{this.isLoading = false;});
  }
}

const testingStore = new TestingStore();
export default testingStore;
