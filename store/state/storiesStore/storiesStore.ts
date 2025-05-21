import { makeAutoObservable } from 'mobx';
import { APPADMIN_URL, BASE_URL } from '../../../app/core/hosts';
import axios from 'axios';
import { errorToast, successToast } from '../../../app/core/components/toast/toast';
import { StoriesListModel, StoryMappedModel, StoryModel, SubStoryModel } from './models/models';
import { getStoriesApi } from './storiesStore.api';
import { IUserStory } from '../../../app/core/components/insta-stories/insta-stories';
import { InstagramStoriesProps, InstagramStoryProps, StoryItemProps } from '../../../app/core/components/instagram-stories/core/dto/instagramStoriesDTO';


class StoriesStore {
  isLoading = false; // Состояние загрузки
  // storiesList:StoriesListModel = {
  //   'Физическая активность': [] as StoryModel[],
  //   'Правильное питание': [] as StoryModel[],
  //   'Снижение стресса': [] as StoryModel[],
  //   'Крепкий сон': [] as StoryModel[],
  // };
  storiesMappedList: InstagramStoryProps[] = [];
  constructor() {
    makeAutoObservable(this); // Делаем объект реактивным
  }

  getStories = async () => {
      if (storiesStore.isLoading) {return;}
      this.isLoading = true;
    //   this.errorMessage = '';
      await getStoriesApi()
        .then((result)=>{

          const categories:InstagramStoryProps[] = result.data['common stories'].map((cat)=>{
            return {
              name: cat.category_title,
              id: `${cat.category_id}`,
              avatarSource: { uri: `${APPADMIN_URL}/storage/` + cat.category_cover},
              // bgColor: cat.bgColor,
            } as InstagramStoryProps;
          });
          const uniqueArray = categories.filter((value, index) => {
            const _value = JSON.stringify(value);
            return index === categories.findIndex(obj => {
              return JSON.stringify(obj) === _value;
            });
          });
          this.storiesMappedList = uniqueArray.map((cat: InstagramStoryProps)=>{
            const subStoriesArticles = result.data['common stories'].filter((item)=>item.category_id === cat.id);

            return {...cat, stories: subStoriesArticles.map((story, index)=>{
              return {
                id: index.toString(),
                article: story.buttonContent.is_article !== 0 ? story.article : null,
                subtitle: story.subtitle,
                source: { uri: `${APPADMIN_URL}/storage/` + story.cover },
                story_id: index,
                buttonContent: story.withButton ? story.buttonContent : null,
                animationDuration: 6,
              };
            })as StoryItemProps[]};
          });
          console.log('this.storiesMappedList', this.storiesMappedList);
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
          console.log('ERROR GET STORIES', err.message);

        })
        .finally(()=>{this.isLoading = false;});
    };


}

const storiesStore = new StoriesStore();
export default storiesStore;

