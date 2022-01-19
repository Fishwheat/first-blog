/**
 * title     : 更新文章状态
 * path      : /article/{id}
 * created at: 2022-1-10 10:55:21 ├F10: AM┤
 * updated at: 2022-1-10 10:55:21 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface PatchArticleByIdBody {
    isActive: boolean; // 是否启用
}

export default function patchArticleById(id: number, body: PatchArticleByIdBody) {
  return ApiClient.httpPatch<boolean>('/article/{id}', { params: { id }, body });
}
