/**
 * title     : 获取文章列表
 * path      : /articles
 * created at: 2022-1-10 10:55:21 ├F10: AM┤
 * updated at: 2022-1-10 10:55:21 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface GetArticlesQuery {
    page?: number;
    size?: number;
}
export interface GetArticlesRespList {
    id: number;
    name: string;
    linkName: string;
    content: string;
    abstract: string;
    tags: string[];
    categoryId: number;
    categoryIds: number[];
    categoryName: string;
    isActive: boolean;
}
export interface GetArticlesResp {
    list: GetArticlesRespList[];
    total: number;
}

export default function getArticles(query?: GetArticlesQuery) {
  return ApiClient.httpGet<GetArticlesResp>('/articles', { query });
}
