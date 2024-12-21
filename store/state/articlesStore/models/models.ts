
export type ArticleModel = {
    title: string,
    subtitle: string,
    datetime_publish: string,
    type: string,
    id: number,
    status: boolean,
    media: MediaModel[]
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
