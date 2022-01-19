/**
 * title     : 删除 link page
 * path      : /link-page/{id}
 * created at: 2022-1-10 10:55:17 ├F10: AM┤
 * updated at: 2022-1-10 10:55:17 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export default function deleteLinkPageById(id: number) {
  return ApiClient.httpDelete<boolean>('/link-page/{id}', { params: { id } });
}
