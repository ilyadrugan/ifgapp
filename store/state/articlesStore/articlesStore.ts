import { makeAutoObservable, runInAction } from 'mobx';
import { ArticleHashTagModel, ArticleListModel, ArticleModel, ArticleQueryParamsModel, ArticleThemesModel, InterViewsTypesModel } from './models/models';
import { deleteUserArticleApi, getArticlesByTagsApi, getInterViewsByTagsApi, getMaterialFiltersApi, getMaterialHashtagsApi, getUserArticlesApi } from './articlesStore.api';
import { errorToast, successToast } from '../../../app/core/components/toast/toast';

class ArticlesStore {
  isLoading = false; // Состояние загрузки
  articlesList: ArticleListModel = {
    current_page: 1,
    articles: [],
    total: 0,
    isLoading: false,
    hasMore: true,
  };
  interViewsActual: InterViewsTypesModel = {
    current_page: 1,
    interviews: [],
    total: 0,
    isLoading: false,
    hasMore: true,
  };
  interViewsFinished: InterViewsTypesModel = {
    current_page: 1,
    interviews: [],
    total: 0,
    isLoading: false,
    hasMore: true,
  };
  articlesUserList: ArticleModel[] = [];
  errorMessage: string = '';
  articleHashTagList: ArticleHashTagModel[] = [];
  articleThemesList: ArticleThemesModel[] = [];
  articlesQueryParams: ArticleQueryParamsModel = {};
  interViewsQueryParams: ArticleQueryParamsModel = {};

  constructor() {
    makeAutoObservable(this); // Делаем объект реактивным
  }

  setArticleQueryParam(name: string, value: string) {
    console.log('setArticleQueryParam');
    this.articlesQueryParams[name] = value;
  }
  setInterViewsQueryParam(name: string, value: string) {
    console.log('setInterViewsQueryParam');
    this.interViewsQueryParams[name] = value;
  }
  removeArticleParam(name) {
    delete this.articlesQueryParams[name];
  }
  removeInterViewsParam(name) {
    delete this.interViewsQueryParams[name];
  }
  clearArticleParams() {
    this.articlesQueryParams = {};
  }
  clearInterViewsParams() {
    this.interViewsQueryParams = {};
  }
  getArticleQueryParamsString() {
    return new URLSearchParams(this.articlesQueryParams).toString();
  }
  getInterViewsQueryParamsString() {
    return new URLSearchParams(this.interViewsQueryParams).toString();
  }
  // page: `${this.articlesList.current_page}`,
  clearArticles() {
    this.articlesList = {
      current_page: 1,
      articles: [],
      total: 0,
      isLoading: false,
      hasMore: true,
    };
    this.articlesQueryParams.page =  `${articlesStore.articlesList.current_page}`;
  }
  clearInterViews(type: string) {
    if (type === 'actual') {
      this.interViewsActual = {
        current_page: 1,
        interviews: [],
        total: 0,
        isLoading: false,
        hasMore: true,
      };
      this.interViewsQueryParams.page =  '1';
    }
    if (type === 'finished') {
      this.interViewsFinished = {
        current_page: 1,
        interviews: [],
        total: 0,
        isLoading: false,
        hasMore: true,
      };
      this.interViewsQueryParams.page =  '1';
    }
  }
  async loadMoreArticles(query?: string) {
    console.log('loadMoreArticles',this.articlesList );
    if (this.articlesList.isLoading || !this.articlesList.hasMore) {return;}
    this.articlesList.isLoading = true;
    await getArticlesByTagsApi(query)
      .then((result)=>{
        runInAction(() => {
          this.articlesList.articles = [...this.articlesList.articles, ...result.data.articles.data],
          this.articlesList.current_page += 1,
          this.articlesList.total = result.data.articles.total,
          this.articlesList.hasMore = result.data.articles.to < result.data.articles.total;
          });
      }
      )
      .catch((err)=>{
        console.log('ERROR',  err.message);
        this.errorMessage = err.message;

      })
      .finally(()=>{this.articlesList.isLoading = false;});
  }
  async loadMoreActualInterviews(query?: string) {
    console.log('loadMoreActualInterviews',this.interViewsActual);
    if (this.interViewsActual.isLoading || !this.interViewsActual.hasMore) {return;}
    this.interViewsActual.isLoading = true;
    await getInterViewsByTagsApi(query)
      .then((result)=>{
        runInAction(() => {
          this.interViewsActual.interviews = [...this.interViewsActual.interviews, ...result.data.events_finished.data],
          this.interViewsActual.current_page += 1,
          this.interViewsActual.total = result.data.events_actual.total,
          this.interViewsActual.hasMore = result.data.events_finished.to < result.data.events_finished.total;
        });
      }
      )
      .catch((err)=>{
        console.log('ERROR',  err.message);
        this.errorMessage = err.message;

      })
      .finally(()=>{this.interViewsActual.isLoading = false;});
  }
  async loadMoreFinishedInterviews(query?: string) {
    console.log('loadMoreFinishedInterviews',this.interViewsFinished);
    if (this.interViewsFinished.isLoading || !this.interViewsFinished.hasMore) {return;}
    this.interViewsFinished.isLoading = true;
    await getInterViewsByTagsApi(query)
      .then((result)=>{
        runInAction(() => {
          this.interViewsFinished.interviews = [...this.interViewsFinished.interviews, ...result.data.events_actual.data],
          this.interViewsFinished.current_page += 1,
          this.interViewsFinished.total = result.data.events_actual.total,
          this.interViewsFinished.hasMore = result.data.events_actual.to < result.data.events_actual.total;
        });
      }
      )
      .catch((err)=>{
        console.log('ERROR',  err.message);
        this.errorMessage = err.message;

      })
      .finally(()=>{this.interViewsFinished.isLoading = false;});
  }

  async getMaterialFilters() {
    this.isLoading = true;
    this.errorMessage = '';
    await getMaterialFiltersApi()
      .then((result)=>{
        this.articleThemesList = result.data.data;
      }
      )
      .catch((err)=>{
        console.log('ERROR', err.message);
        this.errorMessage = err.message;

      })
      .finally(()=>{this.isLoading = false;});
  }
  async getMaterialHashtags() {
    this.isLoading = true;
    this.errorMessage = '';
    await getMaterialHashtagsApi()
      .then((result)=>{
        this.articleHashTagList = result.data.data;
      }
      )
      .catch((err)=>{
        console.log('ERROR');
        this.errorMessage = err.message;

      })
      .finally(()=>{this.isLoading = false;});
  }

  async getUserArticles() {
    this.isLoading = true;
    this.errorMessage = '';
    await getUserArticlesApi()
      .then((result)=>{
        // console.log(result.data.articles.data[0].articles.title);
        const mappedArticles = result.data.articles.data.map(item=>{
          console.log('item.articles.id',item.articles.id);
          return {...item.articles, id: item.articles.id} as ArticleModel;
        });
        // console.log(mappedArticles);
        this.articlesUserList = mappedArticles;
        // console.log('result.data', result.articles.data[0]);
        // console.log('result.data', result.articles.data[0].articles);
        // this.articlesUserList = [result.articles.data[0].articles];
      }
      )
      .catch((err)=>{
        console.log('ERROR');
        this.errorMessage = err.message;

      })
      .finally(()=>{
        this.isLoading = false;
      });
  }
  async deleteUserArticle(id: number) {
    this.isLoading = true;
    this.errorMessage = '';
    console.log(id);
    await deleteUserArticleApi(id)
      .then((result)=>{
        console.log(result);
        successToast('Материал успешно удалён из избранного');
        this.getUserArticles();
      }
      )
      .catch((err)=>{
        console.log('ERROR');
        this.errorMessage = err.message;
        errorToast(err.message);
      })
      .finally(()=>{this.isLoading = false;});
  }
}

const articlesStore = new ArticlesStore();
export default articlesStore;
