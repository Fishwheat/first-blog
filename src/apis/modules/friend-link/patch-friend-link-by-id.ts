/**
 * title     : 更改友链
 * path      : /friend-link/{id}
 * created at: 2022-1-10 10:55:25 ├F10: AM┤
 * updated at: 2022-1-10 10:55:25 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface PatchFriendLinkByIdBody {
    order?: number;
    isActive?: boolean;
}

export default function patchFriendLinkById(id: number, body: PatchFriendLinkByIdBody) {
  return ApiClient.httpPatch<boolean>('/friend-link/{id}', { params: { id }, body });
}
