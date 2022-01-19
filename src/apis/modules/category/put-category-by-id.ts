/**
 * title     : 修改分类
 * path      : /category/{id}
 * created at: 2022-1-10 10:55:22 ├F10: AM┤
 * updated at: 2022-1-10 10:55:22 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface PutCategoryByIdBody {
    pid?: number;
    name: string;
    icon?: string;
    description?: string;
}

export default function putCategoryById(id: number, body: PutCategoryByIdBody) {
  return ApiClient.httpPut<boolean>('/category/{id}', { params: { id }, body });
}
