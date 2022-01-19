/**
 * title     : 删除友链
 * path      : /friend-link/{id}
 * created at: 2022-1-10 10:55:25 ├F10: AM┤
 * updated at: 2022-1-10 10:55:25 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export default function deleteFriendLinkById(id: number) {
  return ApiClient.httpDelete<boolean>('/friend-link/{id}', { params: { id } });
}
