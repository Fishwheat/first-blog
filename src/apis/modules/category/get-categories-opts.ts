/**
 * title     : 通过pid获取分类列表
 * path      : /categories/opts
 * created at: 2022-1-10 10:55:24 ├F10: AM┤
 * updated at: 2022-1-10 10:55:24 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface GetCategoriesOptsResp {
    id: number;
    name: string;
    icon?: string;
    pid?: number;
    description?: string;
}

export default function getCategoriesOpts(pid?: number) {
  return ApiClient.httpGet<GetCategoriesOptsResp[]>('/categories/opts', { query: { pid } });
}
