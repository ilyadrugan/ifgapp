import { MediaModel } from '../../articlesStore/models/models';

export type PresentListModel = {
    presents: PresentModel[],
    total: number,
    current_page: number,
    isLoading: boolean,
    hasMore: boolean
};

export type PresentModel = {
    title: string,
    deleted_at: string,
    id: number,
    status: boolean,
    media: MediaModel[]
}

export type PresentViewModel = {
    title: string,
    subtitle: string,
    desc: string,
    mintext: string,
    id: number,
    winners: WinnerModel[],
    media: MediaModel[]
}

export type WinnerModel = {
    id: number,
    name: string,
}
