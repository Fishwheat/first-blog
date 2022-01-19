/**
 * title     : 删除分类
 * path      : /category/{id}
 * created at: 2022-1-10 10:55:23 ├F10: AM┤
 * updated at: 2022-1-10 10:55:23 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export default function deleteCategoryById(id: number) {
  return ApiClient.httpDelete<boolean>('/category/{id}', { params: { id } });
}
