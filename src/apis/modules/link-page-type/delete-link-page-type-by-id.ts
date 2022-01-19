/**
 * title     : 删除链接页类型
 * path      : /link-page-type/{id}
 * created at: 2022-1-10 10:55:15 ├F10: AM┤
 * updated at: 2022-1-10 10:55:15 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export default function deleteLinkPageTypeById(id: number) {
  return ApiClient.httpDelete<boolean>('/link-page-type/{id}', { params: { id } });
}
