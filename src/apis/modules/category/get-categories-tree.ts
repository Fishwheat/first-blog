/**
 * title     : 获取分类tree
 * path      : /categories/tree
 * created at: 2022-1-10 10:55:23 ├F10: AM┤
 * updated at: 2022-1-10 10:55:23 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface GetCategoriesTreeRespChild {
    id: number;
    name: string;
    icon?: string;
    pid?: number;
    description?: string;
}
export interface GetCategoriesTreeResp {
    id: number;
    name: string;
    icon?: string;
    pid?: number;
    description?: string;
    children?: GetCategoriesTreeRespChild[];
}

export default function getCategoriesTree() {
  return ApiClient.httpGet<GetCategoriesTreeResp[]>('/categories/tree', { });
}
