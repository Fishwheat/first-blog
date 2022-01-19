/**
 * title     : 新增文章
 * path      : /article
 * created at: 2022-1-10 10:55:20 ├F10: AM┤
 * updated at: 2022-1-10 10:55:20 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface PostArticleBody {
    name: string; // 文章标题
    linkName: string;
    abstract: string;
    content: string; // 文章内容
    tags: string[]; // 标签
    categoryId: number; // 分类id
}
export interface PostArticleResp {
    id: number; // 新增的文章id
}

export default function postArticle(body: PostArticleBody) {
  return ApiClient.httpPost<PostArticleResp>('/article', { body });
}
