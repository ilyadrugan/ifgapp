import { makeAutoObservable, runInAction } from 'mobx';
import { ArticleHashTagModel, ArticleListModel, ArticleModel, ArticleQueryParamsModel, ArticleThemesModel, ArticleViewModel, InterViewModel, InterViewsTypesModel, InterviewViewModel } from './models/models';
import { changeLikeArticleApi, changeLikeInterViewApi, changeUserArticleApi, changeUserInterViewApi, getArticleByIdApi, getArticlesByTagsApi, getInterviewByIdApi, getInterViewsByTagsApi, getMaterialFiltersApi, getMaterialHashtagsApi, getUserArticlesApi, getUserEventsApi } from './articlesStore.api';
import { errorToast, successToast } from '../../../app/core/components/toast/toast';

class ArticlesStore {
  isLoading = false; // Состояние загрузки
  isUserArticleLoading = false;
  isUserLikeArticleLoading = false;
  isUserDislikeArticleLoading = false;
  articlesMainList: ArticleListModel = {
    current_page: 1,
    articles: [],
    total: 0,
    isLoading: false,
    hasMore: true,
  };
  articlesList: ArticleListModel = {
    current_page: 1,
    articles: [],
    total: 0,
    isLoading: false,
    hasMore: true,
  };
  currentArticle: ArticleViewModel = {
    title: '',
    subtitle: '',
    datetime_publish: '',
    body: null,
    body_json: null,
    id: 0,
    media: [],
    like: 0,
    unlike: 0,
    views: 0,
    created_at: '',
    url: '',
    type: '',
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
  currentInterview: InterviewViewModel = {
    id: 0,
    title: '',
    desc: '',
    theme: '',
    publication_date: '',
    thumb_title: '',
    thumb_desc: '',
    like: 0,
    unlike: 0,
    views: 0,
    video: '',
    media: [],
  };
  articlesUserList: ArticleModel[] = [];
  interViewsUserList: InterviewViewModel[] = [];
  errorMessage: string = '';
  articleHashTagList: ArticleHashTagModel[] = [];
  articleThemesList: ArticleThemesModel[] = [];
  articlesQueryParams: ArticleQueryParamsModel = {};
  interViewsQueryParams: ArticleQueryParamsModel = {};

  constructor() {
    this.getUserArticles();
    makeAutoObservable(this); // Делаем объект реактивным
  }

  setArticleQueryParam(name: string, value: string) {
    this.articlesQueryParams[name] = value;
  }
  setInterViewsQueryParam(name: string, value: string) {
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
    console.log('clearInterViews');
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
  clearCurrentArticle() {
    this.currentArticle = {
      title: '',
      subtitle: '',
      datetime_publish: '',
      body: null,
      body_json: null,
      id: 0,
      media: [],
      like: 0,
      unlike: 0,
      views: 0,
      created_at: '',
      url: '',
      type: '',
    };
  }

  clearCurrentInterView() {
    this.currentInterview = {
      id: 0,
      title: '',
      desc: '',
      theme: '',
      publication_date: '',
      thumb_title: '',
      thumb_desc: '',
      like: 0,
      unlike: 0,
      views: 0,
      video: '',
      media: [],
    };
  }
  readArticle(id: number) {
    const articleIndex = this.articlesList.articles.findIndex((item)=>item.id === id);
    if (articleIndex) {
      this.articlesList.articles = this.articlesList.articles.map((article, index)=>{
        if (index === articleIndex) {
          return {...article, is_viewed: true};
        }
        return article;
      });
    }
  }
  async getArticleById(id: number) {
    this.isLoading = true;
    this.errorMessage = '';
    await getArticleByIdApi(id)
      .then((result)=>{
        // console.log('result.data.data',result.data.data);
        this.currentArticle = result.data.data;
      }
      )
      .catch((err)=>{
        console.log('ERROR getArticleById', err.message);
        errorToast(err.message);
        this.errorMessage = err.message;
      })
      .finally(()=>{
        this.isLoading = false;
      });
  }
  async getInterviewById(id: number) {
    this.isLoading = true;
    this.errorMessage = '';
    await getInterviewByIdApi(id)
      .then((result)=>{
        this.currentInterview = result.data.data;
      }
      )
      .catch((err)=>{
        console.log('ERROR', err.message);
        errorToast(err.message);
        this.errorMessage = err.message;
      })
      .finally(()=>{
        this.isLoading = false;
      });
  }
  async loadMoreArticles(query?: string) {
    // console.log('loadMoreArticles',this.articlesList );
    if (this.articlesList.isLoading || (!this.articlesList.hasMore && this.articlesList.articles.length !== 0)) {return;}
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
  async loadMainArticles(query?: string) {
    // console.log('loadMoreArticles',this.articlesList );
    this.articlesMainList.isLoading = true;
    await getArticlesByTagsApi(query)
      .then((result)=>{
        this.articlesMainList.articles = result.data.articles.data;
        // runInAction(() => {
        //   this.articlesMainList.articles = [...this.articlesList.articles, ...result.data.articles.data],
        //   this.articlesMainList.current_page += 1,
        //   this.articlesMainList.total = result.data.articles.total,
        //   this.articlesMainList.hasMore = result.data.articles.to < result.data.articles.total;
        //   });
      }
      )
      .catch((err)=>{
        console.log('ERROR',  err.message);
        this.errorMessage = err.message;

      })
      .finally(()=>{this.articlesMainList.isLoading = false;});
  }
  async loadMoreActualInterviews(query?: string) {
    // console.log('loadMoreActualInterviews',this.interViewsActual);
    if (this.interViewsActual.isLoading || (!this.interViewsActual.hasMore && this.interViewsActual.interviews.length !== 0)) {return;}
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
    // console.log('loadMoreFinishedInterviews',this.interViewsFinished);
    if (this.interViewsFinished.isLoading || (!this.interViewsFinished.hasMore && this.interViewsFinished.interviews.length !== 0)) {return;}
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
    this.isUserArticleLoading = true;
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
        this.isUserArticleLoading = false;
      });
  }
  async getUserEvents() {
    this.isUserArticleLoading = true;
    this.errorMessage = '';
    await getUserEventsApi()
      .then((result)=>{
        console.log('getUserEventsApi',result.data.data);
        // const mappedEvents = result.data.data.map(item=>{
        //   console.log('item.articles.id',item.articles.id);
        //   return {...item.articles, id: item.articles.id} as ArticleModel;
        // });
        // console.log(mappedArticles);
        this.interViewsUserList = result.data.data;
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
        this.isUserArticleLoading = false;
      });
  }
  async changeUserArticle(id: number) {
    this.isUserArticleLoading = true;
    this.errorMessage = '';
    console.log(id);
    await changeUserArticleApi(id)
      .then(async (result)=>{
        // console.log(result);
        await this.getUserArticles().then(()=>
          successToast(`Материал ${result.data.set === 1 ? 'добавлен в избранное' : 'удалён из избранного'} `)
        );
      }
      )
      .catch((err)=>{
        console.log('ERROR');
        this.errorMessage = err.message;
        errorToast(err.message);
      })
      .finally(()=>{this.isUserArticleLoading = false;});
  }
  async changeUserInterView(id: number, del: boolean) {
    this.isUserArticleLoading = true;
    this.errorMessage = '';
    console.log(id);
    await changeUserInterViewApi(id, del)
      .then(async (result)=>{
        // console.log(result);
        await this.getUserEvents().then(()=>
          successToast(`Событие ${!del ? 'добавлено в избранное' : 'удалено из избранного'} `)
        );
      }
      )
      .catch((err)=>{
        console.log('ERROR');
        this.errorMessage = err.message;
        errorToast(err.message);
      })
      .finally(()=>{this.isUserArticleLoading = false;});
  }
  async changeLikeUserArticle(id: number, action: number) {
    if (this.isUserLikeArticleLoading || this.isUserDislikeArticleLoading) {return;}
    if (action === 1) {
      this.isUserLikeArticleLoading = true;
    }
    else {
      this.isUserDislikeArticleLoading = true;
    }
    this.errorMessage = '';
    await changeLikeArticleApi(id, action)
      .then(async (result)=>{
        this.currentArticle.like = result.data.like;
        this.currentArticle.unlike = result.data.unlike;
      }
      )
      .catch((err)=>{
        console.log('ERROR');
        this.errorMessage = err.message;
        errorToast(err.message);
      })
      .finally(()=>{this.isUserLikeArticleLoading = false; this.isUserDislikeArticleLoading = false;});
  }
  async changeLikeInterView(id: number, action: number) {
    if (this.isUserLikeArticleLoading || this.isUserDislikeArticleLoading) {return;}
    if (action === 1) {
      this.isUserLikeArticleLoading = true;
    }
    else {
      this.isUserDislikeArticleLoading = true;
    }
    this.errorMessage = '';
    await changeLikeInterViewApi(id, action)
      .then(async (result)=>{
        this.currentInterview.like = result.data.like;
        this.currentInterview.unlike = result.data.unlike;
      }
      )
      .catch((err)=>{
        console.log('ERROR');
        this.errorMessage = err.message;
        errorToast(err.message);
      })
      .finally(()=>{this.isUserLikeArticleLoading = false; this.isUserDislikeArticleLoading = false;});
  }
}

const articlesStore = new ArticlesStore();
export default articlesStore;
