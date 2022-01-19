/**
 * title     : 更改 link page
 * path      : /link-page/{id}
 * created at: 2022-1-10 10:55:18 ├F10: AM┤
 * updated at: 2022-1-10 10:55:18 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface PatchLinkPageByIdBody {
    isActive?: boolean;
    order?: number;
}

export default function patchLinkPageById(id: number, body: PatchLinkPageByIdBody) {
  return ApiClient.httpPatch<boolean>('/link-page/{id}', { params: { id }, body });
}
