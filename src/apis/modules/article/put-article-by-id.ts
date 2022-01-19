/**
 * title     : 编辑文章
 * path      : /article/{id}
 * created at: 2022-1-10 10:55:21 ├F10: AM┤
 * updated at: 2022-1-10 10:55:21 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface PutArticleByIdBody {
    name: string; // 文章标题
    linkName: string;
    abstract: string;
    content: string; // 文章内容
    tags: string[]; // 标签
    categoryId: number; // 分类id
}

export default function putArticleById(id: number, body: PutArticleByIdBody) {
  return ApiClient.httpPut<boolean>('/article/{id}', { params: { id }, body });
}
