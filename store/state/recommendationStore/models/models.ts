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
    express: ActivivtyExpressModel[]
  }
}

export type PersonalRecommendationModel = {
  id: number,
  link_text: string,
  article: ArticleViewModel
}

export type ActivivtyExpressModel = {
  id: string,
  html: string,
  score_on: string,
  score_to: string,
  link_text: string,
}
export enum ActivitiesType {
    PhysicalActivity = 1,
    Pitanie = 2,
    Antistress = 3,
    Sleep = 4,
  }
