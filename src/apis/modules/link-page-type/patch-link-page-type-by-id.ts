/**
 * title     : 更改链接页类型
 * path      : /link-page-type/{id}
 * created at: 2022-1-10 10:55:16 ├F10: AM┤
 * updated at: 2022-1-10 10:55:16 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface PatchLinkPageTypeByIdBody {
    isNav?: boolean;
    isActive?: boolean;
    order?: number;
}

export default function patchLinkPageTypeById(id: number, body: PatchLinkPageTypeByIdBody) {
  return ApiClient.httpPatch<boolean>('/link-page-type/{id}', { params: { id }, body });
}
