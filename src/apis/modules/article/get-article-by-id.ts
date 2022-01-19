/**
 * title     : 获取文章详情
 * path      : /article/{id}
 * created at: 2022-1-10 10:55:22 ├F10: AM┤
 * updated at: 2022-1-10 10:55:22 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface GetArticleByIdResp {
    id: number;
    categoryId: number;
    name: string;
    linkName: string;
    content: string;
    tags: string[];
}

export default function getArticleById(id: number) {
  return ApiClient.httpGet<GetArticleByIdResp>('/article/{id}', { params: { id } });
}
