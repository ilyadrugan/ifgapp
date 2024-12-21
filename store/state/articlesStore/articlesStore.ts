import { makeAutoObservable } from 'mobx';
import { ArticleHashTagModel, ArticleModel, ArticleThemesModel } from './models/models';
import { deleteUserArticleApi, getArticlesByTagsApi, getMaterialFiltersApi, getMaterialHashtagsApi, getUserArticlesApi } from './articlesStore.api';
import { errorToast, successToast } from '../../../app/core/components/toast/toast';

class ArticlesStore {
  isLoading = false; // Состояние загрузки
  articlesList: ArticleModel[] = [];
  articlesUserList: ArticleModel[] = [];
  errorMessage: string = '';
  articleHashTagList: ArticleHashTagModel[] = [];
  articleThemesList: ArticleThemesModel[] = [];

  constructor() {
    makeAutoObservable(this); // Делаем объект реактивным
  }

  async getArticlesByTags(query?: string) {
    this.isLoading = true;
    this.errorMessage = '';
    await getArticlesByTagsApi(query)
      .then((result)=>{
        // console.log('result.data', result.data.tags);
        this.articlesList = result.data.articles.data;
        // this.articleHashTagList = result.data.populate_tags;
        // this.articleThemesList = result.data.tags;
      }
      )
      .catch((err)=>{
        console.log('ERROR');
        this.errorMessage = err.message;

      })
      .finally(()=>{this.isLoading = false;});

  }
  async getMaterialFilters() {
    this.isLoading = true;
    this.errorMessage = '';
    await getMaterialFiltersApi()
      .then((result)=>{
        console.log('getMaterialFiltersApi',result.data.data);
        // console.log('result.data', result.data);
        this.articleThemesList = result.data.data;
        console.log(this.articleThemesList);
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
        console.log('result.data',  result.data.data);
        this.articleHashTagList = result.data.data;
      }
      )
      .catch((err)=>{
        console.log('ERROR');
        this.errorMessage = err.message;

      })
      .finally(()=>{this.isLoading = false;});
  }
  async getArticleFilters(query?: string) {
    this.isLoading = true;
    this.errorMessage = '';
    await getArticlesByTagsApi(query || '')
      .then((result)=>{
        // console.log('result.data', result.data);
        this.articlesList = result.data.articles.data;
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
