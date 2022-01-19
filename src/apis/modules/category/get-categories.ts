/**
 * title     : 获取分类列表
 * path      : /categories
 * created at: 2022-1-10 10:55:23 ├F10: AM┤
 * updated at: 2022-1-10 10:55:23 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface GetCategoriesResp {
    id: number;
    name: string;
    icon?: string;
    pid?: number;
    description?: string;
}

export default function getCategories() {
  return ApiClient.httpGet<GetCategoriesResp[]>('/categories', { });
}
