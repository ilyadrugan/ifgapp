import { ArticleModel, ArticleViewModel, MediaModel } from '../../articlesStore/models/models';

export type RecommendationsModel = {
    'Сон': RecommendationActivivtyModel[],
    'Питание': RecommendationActivivtyModel[],
    'Антистресс': RecommendationActivivtyModel[],
    'Физическая активность': RecommendationActivivtyModel[],
}

export type RecommendationActivivtyModel = {
  activity: {
    name: string,
    express: ActivivtyExpressModel[],
    time_push: string,
    description_push: string,
  }
}

export type PersonalRecommendationModel = {
  id: number,
  link_text: string,
  user_recomendation_id: number,
  status: string,
  category: string,
  article: ArticleViewModel,
  title: string,
  description: string,
  publish_time: string
}

export type ActivivtyExpressModel = {
  id: string,
  html: string,
  score_on: string,
  score_to: string,
  link_text: string,
}

export type StoreRecommendationModel = {
  link_text: string,
  category: string,
  title: string,
  description: string,
  publish_time: string,
  timezone: string
}

export enum ActivitiesType {
    PhysicalActivity = 1,
    Pitanie = 2,
    Antistress = 3,
    Sleep = 4,
  }
