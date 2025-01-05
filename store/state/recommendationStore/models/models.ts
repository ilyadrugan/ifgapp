import { ArticleModel, MediaModel } from '../../articlesStore/models/models';

export type RecommendationsModel = {
    'Сон': RecommendationActivivtyModel,
    'Питание': RecommendationActivivtyModel,
    'Антистресс': RecommendationActivivtyModel,
    'Физическая активность': RecommendationActivivtyModel,
}

export type RecommendationActivivtyModel = {
  activity: {
    name: string,
    express: ActivivtyExpressModel[]
  }
}

export type ActivivtyExpressModel = {
  id: string,
  html: string,
  score_on: string,
  score_to: string
}
export enum ActivitiesType {
    PhysicalActivity = 1,
    Pitanie = 2,
    Antistress = 3,
    Sleep = 4,
  }
