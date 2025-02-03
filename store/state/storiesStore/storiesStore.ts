import { makeAutoObservable } from 'mobx';
import { BASE_URL } from '../../../app/core/hosts';
import axios from 'axios';
import { errorToast, successToast } from '../../../app/core/components/toast/toast';
import { StoriesListModel, StoryMappedModel, StoryModel, SubStoryModel } from './models/models';
import { getStoriesApi } from './storiesStore.api';


class StoriesStore {
  isLoading = false; // Состояние загрузки
  storiesList:StoriesListModel = {
    'Физическая активность': [] as StoryModel[],
    'Правильное питание': [] as StoryModel[],
    'Снижение стресса': [] as StoryModel[],
    'Крепкий сон': [] as StoryModel[],
  };
  storiesMappedList: StoryMappedModel[] = [];
  constructor() {
    makeAutoObservable(this); // Делаем объект реактивным
  }

  getStories = async () => {
      this.isLoading = true;
    //   this.errorMessage = '';
      await getStoriesApi()
        .then((result)=>{
          // console.log('result.data', result.data['common stories']);
          // this.storiesList = result.data['common stories'].map((story)=>{
          //  const substory: SubStoryModel = {
          //   title: story.title,
          //   media: story.article.media[0],
          //  };
          //  story.subStories = [substory];
          //  return story;
          // });
          const categories:StoryMappedModel[] = result.data['common stories'].map((cat)=>{
            return {
              category_title: cat.category_title,
              category_id: cat.category_id,
              category_cover: cat.category_cover,
              bgColor: cat.bgColor,
            };
          });
          console.log('categories', categories);
          const uniqueArray = categories.filter((value, index) => {
            const _value = JSON.stringify(value);
            return index === categories.findIndex(obj => {
              return JSON.stringify(obj) === _value;
            });
          });
          console.log('uniqueCategories', uniqueArray);
          this.storiesMappedList = uniqueArray.map((cat: StoryMappedModel)=>{
            const subStoriesArticles = result.data['common stories'].filter((item)=>item.category_id === cat.category_id);
            // console.log('subStoriesArticles', subStoriesArticles);
            return {...cat, subStories: subStoriesArticles.map((story)=>{
              return {
                title: story.title,
                article: story.article,
                media: story.article.media,
                subtitle: story.subtitle,
                cover: story.cover,
              };
            })};
          });
          console.log('this.storiesMappedList',this.storiesMappedList);
          console.log('this.storiesMappedList substories',this.storiesMappedList.map((subst)=>subst.subStories.length));
          this.storiesList = {
            'Физическая активность': result.data['common stories'].filter((story)=> story.category_title === 'Физическая активность'),
            'Правильное питание': result.data['common stories'].filter((story)=> story.category_title === 'Правильное питание'),
            'Снижение стресса': result.data['common stories'].filter((story)=> story.category_title === 'Снижение стресса'),
            'Крепкий сон': result.data['common stories'].filter((story)=> story.category_title === 'Крепкий сон'),
          };
         console.log('this.storiesList', this.storiesList);
        }
        )
        .catch((err)=>{
          console.log('ERROR', err.message);

        })
        .finally(()=>{this.isLoading = false;});
    };


}

const storiesStore = new StoriesStore();
export default storiesStore;

