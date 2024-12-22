
export type ArticleModel = {
    title: string,
    subtitle: string,
    datetime_publish: string,
    type: string,
    id: number,
    status: boolean,
    media: MediaModel[]
}

export type ArticleListModel = {
    articles: ArticleModel[],
    total: number,
    current_page: number,
    isLoading: boolean,
    hasMore: boolean
}

export type InterViewModel = {
    id: number,
    title: string,
    theme: string,
    publication_date: string,
    thumb_title: string,
    thumb_desc: string,
    media: MediaModel[]
}

export type InterViewListModel = {
    interViews: InterViewModel[],
}

export type InterViewsTypesModel = {
    interviews: InterViewModel[],
    total: number,
    current_page: number,
    hasMore: boolean,
    isLoading: boolean,
}

export type MediaModel = {
    id: number,
    full_path: string[]
}

export type ArticleHashTagModel = {
    id: number,
    name: string,
}

export type ArticleThemesModel = {
    tag_id: number,
    title: string,
    children?: ArticleThemeModel[]
}

export type ArticleThemeModel = {
    tag_id: number,
    title: string
}

export type ArticleSortModel = {
    tag_id: number,
    title: string,
    order?: number,
    sort_value?: string
}

export type ArticleQueryParamsModel = {
    'sort[date]'?: string,
    'sort[likes]'?: string,
    'sort[popular]'?: string,
    tag?: string,
    page?: string,
    populate_tags?: string
}
