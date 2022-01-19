/**
 * title     : 更新链接页类型
 * path      : /link-page-type/{id}
 * created at: 2022-1-10 10:55:16 ├F10: AM┤
 * updated at: 2022-1-10 10:55:16 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface PutLinkPageTypeByIdBody {
    name: string;
    linkName: string;
    description: string;
}

export default function putLinkPageTypeById(id: number, body: PutLinkPageTypeByIdBody) {
  return ApiClient.httpPut<boolean>('/link-page-type/{id}', { params: { id }, body });
}
