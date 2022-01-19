/**
 * title     : 删除文章
 * path      : /article/{id}
 * created at: 2022-1-10 10:55:20 ├F10: AM┤
 * updated at: 2022-1-10 10:55:20 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export default function deleteArticleById(id: number) {
  return ApiClient.httpDelete<boolean>('/article/{id}', { params: { id } });
}
