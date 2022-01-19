/**
 * title     : 更新友链
 * path      : /friend-link/{id}
 * created at: 2022-1-10 10:55:26 ├F10: AM┤
 * updated at: 2022-1-10 10:55:26 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface PutFriendLinkByIdBody {
    name: string;
    description: string;
    logoUrl: string;
    linkUrl: string;
}

export default function putFriendLinkById(id: number, body: PutFriendLinkByIdBody) {
  return ApiClient.httpPut<boolean>('/friend-link/{id}', { params: { id }, body });
}
