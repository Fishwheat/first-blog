/**
 * title     : 获取文章详情
 * path      : /web/article/{id}
 * created at: 2022-1-10 10:55:27 ├F10: AM┤
 * updated at: 2022-1-10 10:55:27 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface GetWebArticleByIdResp {
    id: number;
    categoryId: number;
    categoryName: string;
    name: string;
    linkName: string;
    abstract: string;
    content: string;
    tags: string[];
    updatedAt: Date;
    createdAt: Date;
    author: string;
    likeTotal: number;
    viewTotal: number;
}

export default function getWebArticleById(id: string) {
  return ApiClient.httpGet<GetWebArticleByIdResp>('/web/article/{id}', { params: { id } });
}
