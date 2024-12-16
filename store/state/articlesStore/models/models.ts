
export type ArticleModel = {
    title: string,
    subtitle: string,
    datetime_publish: string,
    type: string,
    id: number,
    status: boolean,
    media: string[]
}

export type ArticleTagModel = {
    id: number,
    name: string,
    tags_ids: number[]
}

export type ArticleThemesModel = {
    id: number,
    tag: string,
    parent: null,
    children: []
}
export type ArticleSortModel = {
    id: number,
    tag: string,
    order?: number,
    sort_value?: string
}
