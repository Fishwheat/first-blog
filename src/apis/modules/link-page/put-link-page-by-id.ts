/**
 * title     : 更新 link page
 * path      : /link-page/{id}
 * created at: 2022-1-10 10:55:18 ├F10: AM┤
 * updated at: 2022-1-10 10:55:18 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface PutLinkPageByIdBody {
    linkPageTypeId: number;
    name: string;
    description?: string;
    linkUrl: string;
    imgUrl: string;
}

export default function putLinkPageById(id: number, body: PutLinkPageByIdBody) {
  return ApiClient.httpPut<boolean>('/link-page/{id}', { params: { id }, body });
}
