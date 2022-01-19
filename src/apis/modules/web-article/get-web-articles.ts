/**
 * title     : 获取文章列表
 * path      : /web/articles
 * created at: 2022-1-10 10:55:27 ├F10: AM┤
 * updated at: 2022-1-10 10:55:27 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface GetWebArticlesQuery {
    page: number;
    size: number;
    tag?: string;
}
export interface GetWebArticlesRespList {
    id: number;
    name: string;
    linkName: string;
    abstract: string;
    tags: string[];
    categoryId: number;
    categoryName: string;
    createdAt: Date;
}
export interface GetWebArticlesResp {
    list: GetWebArticlesRespList[];
    total: number;
}

export default function getWebArticles(query?: GetWebArticlesQuery) {
  return ApiClient.httpGet<GetWebArticlesResp>('/web/articles', { query });
}
