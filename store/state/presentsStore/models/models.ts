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
    winners: [],
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
    last: string,
}

export type LifehackModel = {
    event_id?: number,
    present_id?: number,
    message: string,
}
