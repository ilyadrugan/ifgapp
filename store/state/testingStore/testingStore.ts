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

  setScoreToResult(total_score: number, activitiValues: ActivitiValueModel, answers: string) {
    this.currentResultsTest = {
      survey_id: this.currentTest.id,
      total_score: total_score,
      activiti_value_json: JSON.stringify(activitiValues),
      answers_json: answers,
      activiti_value: '<div class="surevey-result"><div class="activity"><div class="activity-item" data-item="Питание"><h3>Питание <span style="font-size: 16px;">(баллов: 36)</span></h3><b>Пейте воду </b> <p>Из расчета 30&ndash;35 мл на кг веса, ежедневно.&nbsp;</p><br><b>Завтракайте утром </b> <p>Ежедневно.&nbsp;</p><br><b>Ешьте фрукты и овощи </b> <p>Цель &mdash; 1&ndash;2 порции по 100&ndash;200 г любимых фруктов и овощей ежедневно.&nbsp;</p><br><b>Соблюдайте правило здоровой тарелки </b> <p>Ежедневно.&nbsp;</p><br><b>Пейте чай или кофе только после еды </b> <p>Не злоупотребляйте данными напитками.</p><br><b>Обедайте вкусно и правильно </b> <p>Ежедневно, составьте рацион на неделю.</p><br><b>Соблюдайте режим питания </b> <p>Цель &mdash; 3 основных приема пищи + 1 перекус.</p><br><b>Снижайте потребление соли и сахара! </b> <p>Не добавляйте в блюда соль! Не более 6 чайных ложек сахара (25 г) в день.&nbsp;</p><br><b>Выбирайте продукты правильно </b> <p>Цель - всегда при покупке продуктов оценивать их качество.&nbsp;</p><br><b>Откажитесь от диет </b> <p>Цель - питаться сбалансированно и настроить правильный метаболизм!</p><br><b>Снижайте потребление вредных продуктов </b> <p>Откажитесь от употребления вредных продуктов.&nbsp;</p><br><b>Снижайте употребление алкоголя </b> <p>Откажитесь от употребления алкоголя.&nbsp;</p><br></div><div class="activity-item" data-item="Сон"><h3>Сон <span style="font-size: 16px;">(баллов: 30)</span></h3><b>Отключите синий свет на своих гаджетах </b> <p><a href="../../../articles/247">Отключите синий свет на своем смартфоне за час до сна.</a></p><br><b>Спите в темноте! </b> <p>Максимально затемните спальню перед сном.&nbsp;</p><br><b>Спите 7–8 часов в сутки </b> <p>3&ndash;4 раза в неделю.&nbsp;</p><br><b>Ложитесь спать и вставайте в одно и то же время </b> <p>3&ndash;4 раза в неделю.</p><br><b>Проветривайте в спальне перед сном </b> <p>Ежедневно.</p><br><b>Держите температуру в спальне на уровне 15–19 ̊С </b> <p>Ежедневно.&nbsp;</p><br></div><div class="activity-item" data-item="Физическая активность"><h3>Физическая активность <span style="font-size: 16px;">(баллов: 36)</span></h3><b>Гуляйте на улице или ходите на дорожке </b> <p>Ежедневно по 30 мин в день. На выходных добавьте одну длинную прогулку - 45-60 мин</p><br><b>Ходите по лестнице или на степпере </b> <p>Ежедневно по 7 этажей за один раз.</p><br><b>Выполняйте утреннюю зарядку </b> <p>Ежедневно.&nbsp;</p><br><b>Делайте разминку дома и на работе </b> <p>По 7-10 мин каждый час.&nbsp;</p><br><b>Пилатес–тренировки + комплекс упражнений на растяжку </b> <p>По 30 - 45 минут 1-2 раза в неделю.&nbsp;</p><br><b>Найдите спорт по душе и занимайтесь им </b> <p>По 60-90 минут 1-2 раза в неделю.&nbsp;</p><br><b>Кардиотренировки </b> <p>По 30-45 минут 1-2 раза в неделю.&nbsp;</p><br><b>Силовые тренировки </b> <p>По 30-45 минут 1-2 раза в неделю.</p><br><b>Упражнения для ягодиц </b> <p>По 15-30 минут 1-2 раза в неделю.</p><br><b>Упражнения на координацию и против деменции </b> <p>По 15-30 минут 1-2 раза в неделю.</p><br></div><div class="activity-item" data-item="Антистресс"><h3>Антистресс <span style="font-size: 16px;">(баллов: 25)</span></h3><b>Занимайтесь домашними делами </b> <p>Ежедневно.&nbsp;</p><br><b>Уделяйте внимание общению, но также не забывайте побыть наедине с собой (одиночество) </b> <p>Когда чувствуете необходимость в эмоциональной разрядке</p><br><b>Уделяйте время одному из ваших любимых занятий (хобби) </b> <p>По 30-45 мин. 2-3 раза в неделю.</p><br><b>Принимайте теплую ванну и душ </b> <p>Принимайте тёплую ванну 1-2 раза в неделю, тёплый душ - несколько раз в день, при тревожном состоянии.</p><br><b>Ходите на массаж или делайте самомассаж </b> <p>Начните ходить на массаж 1 раз в неделю. Уделите самомассажу 5 минут в день 2-3 раза в неделю на начальном этапе.</p><br><b>Используйте массажный аппликатор (коврик) </b> <p>Начните лежать на коврике по 5&ndash;10 минут перед сном 3&ndash;4 раза в неделю, доведя до ежедневных 20&ndash;40 минут, за 2&ndash;3 подхода.&nbsp;</p><br><b>Ходите в баню/сауну </b> <p>Частота посещения бани зависит от физического состояния и желания</p><br></div><div class="activity-item" data-item="Мотивация"><h3>Мотивация <span style="font-size: 16px;">(баллов: 0)</span></h3></div></div></div>',
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
