import { makeAutoObservable } from 'mobx';
import { BASE_URL } from '../../../app/core/hosts';
import axios from 'axios';
import { errorToast, successToast } from '../../../app/core/components/toast/toast';
import { StoryModel, SubStoryModel } from './models/models';
import { getStoriesApi } from './storiesStore.api';


class StoriesStore {
  isLoading = false; // Состояние загрузки
  storiesList: StoryModel[] = [];
  constructor() {
    makeAutoObservable(this); // Делаем объект реактивным
  }

  getStories = async () => {
      this.isLoading = true;
    //   this.errorMessage = '';
      await getStoriesApi()
        .then((result)=>{
          // console.log('result.data', result.data['common stories']);
          this.storiesList = result.data['common stories'].map((story)=>{
           const substory: SubStoryModel = {
            title: story.title,
            media: story.article.media[0],
           };
           story.subStories = [substory];
           return story;
          });
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

