import { makeAutoObservable } from 'mobx';
import { BASE_URL } from '../../../app/core/hosts';
import axios from 'axios';
import { errorToast, successToast } from '../../../app/core/components/toast/toast';
import { StoriesListModel, StoryMappedModel, StoryModel, SubStoryModel } from './models/models';
import { getStoriesApi } from './storiesStore.api';
import { IUserStory } from '../../../app/core/components/insta-stories/insta-stories';


class StoriesStore {
  isLoading = false; // Состояние загрузки
  // storiesList:StoriesListModel = {
  //   'Физическая активность': [] as StoryModel[],
  //   'Правильное питание': [] as StoryModel[],
  //   'Снижение стресса': [] as StoryModel[],
  //   'Крепкий сон': [] as StoryModel[],
  // };
  storiesMappedList: IUserStory[] = [];
  constructor() {
    makeAutoObservable(this); // Делаем объект реактивным
  }

  getStories = async () => {
      this.isLoading = true;
    //   this.errorMessage = '';
      await getStoriesApi()
        .then((result)=>{

          const categories:IUserStory[] = result.data['common stories'].map((cat)=>{
            return {
              user_name: cat.category_title,
              user_id: cat.category_id,
              user_image: cat.category_cover,
              bgColor: cat.bgColor,
            };
          });
          const uniqueArray = categories.filter((value, index) => {
            const _value = JSON.stringify(value);
            return index === categories.findIndex(obj => {
              return JSON.stringify(obj) === _value;
            });
          });
          this.storiesMappedList = uniqueArray.map((cat: IUserStory)=>{
            const subStoriesArticles = result.data['common stories'].filter((item)=>item.category_id === cat.user_id);
            // console.log('subStoriesArticles', subStoriesArticles);
            return {...cat, stories: subStoriesArticles.map((story, index)=>{
              return {
                title: story.title,
                article: story.article,
                media: story.article.media,
                subtitle: story.subtitle,
                story_image: story.cover,
                story_id: index,
              };
            })};
          });

        //   this.storiesList = {
        //     'Физическая активность': result.data['common stories'].filter((story)=> story.category_title === 'Физическая активность'),
        //     'Правильное питание': result.data['common stories'].filter((story)=> story.category_title === 'Правильное питание'),
        //     'Снижение стресса': result.data['common stories'].filter((story)=> story.category_title === 'Снижение стресса'),
        //     'Крепкий сон': result.data['common stories'].filter((story)=> story.category_title === 'Крепкий сон'),
        //   };
        //  console.log('this.storiesList', this.storiesList);
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

