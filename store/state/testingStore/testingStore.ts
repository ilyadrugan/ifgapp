import { makeAutoObservable, runInAction } from 'mobx';
import { ActivitiValueModel, MyCurrentResultsTestModel, MyTestModel, QuestionModel, ResultsTestModel, TestListModel, TestModel } from './models/models';
import { getAllMyTestApi, getTestByIdApi, submitResultsTestApi } from './testingStore.api';
import { errorToast } from '../../../app/core/components/toast/toast';
import { TimeZone } from '../../../app/hooks/useTimezone';

class TestingStore {
  isLoading = false; // Состояние загрузки
  testsList: MyTestModel[] = [];
  testList: TestListModel = {
    current_page: 1,
    surveys: [],
    total: 0,
    isLoading: false,
    hasMore: true,
  };
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
    completedHtmlOnConditionScore: [],
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

  countMaxValuesInTestByGroup(group: string, questions: QuestionModel[]) {
    const groupQuestions = questions.filter((question)=>question.group === group);
    return groupQuestions.reduce((summ, item)=>{
      return Math.max(...item.choices.map((choice)=>Number(choice.score))) + summ;
    }, 0);
  }

  setMyCurrentResultsTest(testId: number) {
    console.log('setMyCurrentResultsTest', testId);
    this.disableRecommendationCheck = true;
    const test = this.testsList.find((test, index)=>{
      if (index === 0 && test.id === testId) {this.disableRecommendationCheck = false;}
      return (test.id === testId);});
    if (test) {
      this.getTestById(test.survey_id);
      this.myCurrentResultsTest = {
      id: test?.id,
      survey_id: test.survey_id,
      total_score: test.total_score,
      activiti_value_json: JSON.parse(test.activiti_value_json),
      completedHtmlOnConditionScore: test.completedHtmlOnConditionScore,
    };
    // console.log('this.myCurrentResultsTest', this.myCurrentResultsTest.maxValues);
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
        completedHtmlOnConditionScore: this.currentResultsTest.completedHtmlOnConditionScore,
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
      completedHtmlOnConditionScore: [],
    };
  }
  clearTests() {
    this.testList = {
      current_page: 1,
      surveys: [],
      total: 0,
      isLoading: false,
      hasMore: true,
    };
    // this.articlesQueryParams.page =  `${articlesStore.articlesList.current_page}`;
  }
  setScoreToResult(total_score: number, activitiValues: ActivitiValueModel, answers: string, user_id?: number | undefined, device_id?: string | undefined) {
    this.currentResultsTest = {
      id: 0,
      survey_id: this.currentTest.id,
      total_score: total_score,
      activiti_value_json: JSON.stringify(activitiValues),
      answers_json: answers,
      completedHtmlOnConditionScore: this.currentTest.completedHtmlOnConditionScore,
      startHtml: this.currentTest.startHtml,
      timezone: TimeZone,
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
    console.log('getTestById', id);
    this.isLoading = true;
    this.errorMessage = '';
    await getTestByIdApi(id)
      .then((result)=>{
        const questions = this.remapQuestions(result.data.data.json.pages);
        // console.log('result.data.data.json', result.data.data.json.pages[0]);
        this.currentTest = {
          id: result.data.data.id,
          name: result.data.data.name,
          testLength: result.data.data.json.pages.length,
          questions: questions,
          completedHtmlOnConditionScore: result.data.data.json.completedHtmlOnConditionScore,
          startHtml: result.data.data.json.startHtml,
          maxValues: {
            Сон: this.countMaxValuesInTestByGroup('Сон', questions),
            Питание: this.countMaxValuesInTestByGroup('Питание', questions),
            Антистресс: this.countMaxValuesInTestByGroup('Антистресс', questions),
            'Физическая активность': this.countMaxValuesInTestByGroup('Физическая активность', questions),
          },
        };
        console.log('this.currentTest',this.currentTest.maxValues);
      }
      )
      .catch((err)=>{
        console.log('ERROR', err.message);
        this.errorMessage = err.message;
        errorToast('Неизвестная ошибка');
        this.isLoading = false;

      })
      .finally(()=>{this.isLoading = false;});
  }
  async getAllMyTest() {
    this.isLoading = true;
    this.errorMessage = '';
    await getAllMyTestApi()
      .then((result)=>{
        // console.log('result.data.data', result.data.surveys.data);
        this.testsList = result.data.surveys.data.map((test)=>{
          return {
            id: test.id,
            total_score: test.total_score,
            survey_id: test.survey_id,
            activiti_value_json: test.activiti_value_json,
            created_at: test.created_at,
            name: test.survey.name,
            completedHtmlOnConditionScore: test.survey.json.completedHtmlOnConditionScore,
            questions: test.survey.json.pages.map(page=>page.elements[0]),
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
  async loadMoreTests(query?: string) {
      console.log('loadMoreTests',this.testList );
      if (this.testList.isLoading || !this.testList.hasMore) {return;}
      this.testList.isLoading = true;
      await getAllMyTestApi(query)
        .then((result)=>{
          // console.log(result.data.surveys);
          runInAction(() => {
            this.testList.surveys = [...this.testList.surveys, ...result.data.surveys.data],
            this.testList.current_page += 1,
            this.testList.total = result.data.surveys.total,
            this.testList.hasMore = result.data.surveys.to < result.data.surveys.total;
            });
        }
        )
        .catch((err)=>{
          console.log('ERROR',  err.message);
          this.errorMessage = err.message;

        })
        .finally(()=>{this.testList.isLoading = false;});
    }
}

const testingStore = new TestingStore();
export default testingStore;
