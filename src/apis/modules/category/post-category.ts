/**
 * title     : 创建分类
 * path      : /category
 * created at: 2022-1-10 10:55:22 ├F10: AM┤
 * updated at: 2022-1-10 10:55:22 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface PostCategoryBody {
    name: string;
    pid?: number;
    icon?: string;
    description?: string;
}
export interface PostCategoryResp {
    id: number;
}

export default function postCategory(body: PostCategoryBody) {
  return ApiClient.httpPost<PostCategoryResp>('/category', { body });
}
