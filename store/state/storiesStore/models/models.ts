import { ArticleModel, MediaModel } from '../../articlesStore/models/models';

export type StoryModel = {
    category_id: number,
    category_title: string,
    title: string,
    cover?: string,
    article: ArticleModel,
    subStories: SubStoryModel[]
}

export type SubStoryModel = {
    title: string,
    media: MediaModel,
}


export enum ActivitiesType {
    PhysicalActivity = 1,
    Pitanie = 2,
    Antistress = 3,
    Sleep = 4,
  }

export const GetActivitiesTypeName = (category_id: ActivitiesType): string => {
    switch (category_id) {
      case ActivitiesType.PhysicalActivity: {
        return 'Физическая активность';
      }
      case ActivitiesType.Pitanie: {
        return 'Правильное питание';
      }
      case ActivitiesType.Antistress: {
        return 'Снижение стресса';
      }
      case ActivitiesType.Sleep: {
        return 'Крепкий сон';
      }
      default: {
        return '';
      }
    }
  };

export const GetActivityBgColorName = (category_id: ActivitiesType): {borderColor: string, bgColor: string} => {
    switch (category_id) {
      case ActivitiesType.PhysicalActivity: {
        return {borderColor: '#FFAC44',
        bgColor: '#f3eee8'};
      }
      case ActivitiesType.Pitanie: {
        return{ borderColor: '#835CC2',
            bgColor: '#f0e8f3'};
      }
      case ActivitiesType.Antistress: {
        return {borderColor: '#5C9DC2',
        bgColor: '#e9eef4'};
      }
      case ActivitiesType.Sleep: {
        return {borderColor: '#5C9DC2',
        bgColor: '#e9eef4'};
      }
      default: {
        return {borderColor: '#5C9DC2',
            bgColor: '#e9eef4'};
      }
    }
  };
