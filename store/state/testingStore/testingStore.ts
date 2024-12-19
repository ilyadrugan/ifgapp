import { makeAutoObservable } from 'mobx';
import { ActivitiValueModel, MyTestModel, QuestionModel, ResultsTestModel, TestModel } from './models/models';
import { getAllMyTestApi, getTestByIdApi, submitResultsTestApi } from './testingStore.api';

class TestingStore {
  isLoading = false; // Состояние загрузки
  testsList: MyTestModel[] = [];
  currentTest: TestModel;
  currentResultsTest: ResultsTestModel;
  errorMessage: string = '';

  constructor() {
    makeAutoObservable(this); // Делаем объект реактивным
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

  setScoreToResult(total_score: number, activitiValues: ActivitiValueModel) {
    this.currentResultsTest = {
      survey_id: this.currentTest.id,
      total_score: total_score,
      activiti_value_json: activitiValues,
    };
  }
  async submitTest(results: ResultsTestModel) {
    this.isLoading = true;
    this.errorMessage = '';
    await submitResultsTestApi(results)
      .then((result)=>{
        console.log('result', result);
      }
      )
      .catch((err)=>{
        console.log('ERROR', err.message);
        this.errorMessage = err.message;
      })
      .finally(()=>{this.isLoading = false;});
  }
  async getTestById(id: number) {
    this.isLoading = true;
    this.errorMessage = '';
    await getTestByIdApi(id)
      .then((result)=>{
        console.log('result.data.data.json', result.data.data.json.pages[0]);
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
        console.log('result.data.data.json', result.data.surveys);
        this.testsList = result.data.surveys.data.map((test)=>{
          console.log(test.activiti_value_json);
          return {
            id: test.id,
            total_score: test.total_score,
            survey_id: test.survey_id,
            activiti_value_json: test.activiti_value_json,
            created_at: test.created_at,
            name: test.survey.name,
          } as MyTestModel;
        });
        console.log( this.testsList);
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
