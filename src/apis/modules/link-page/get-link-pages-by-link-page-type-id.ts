/**
 * title     : 获取 link page
 * path      : /link-pages/{linkPageTypeId}
 * created at: 2022-1-10 10:55:19 ├F10: AM┤
 * updated at: 2022-1-10 10:55:19 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface GetLinkPagesByLinkPageTypeIdResp {
    id: number;
    linkPageTypeId: number;
    name: string;
    description?: string;
    linkUrl: string;
    imgUrl: string;
    isActive: boolean;
    order: number;
}

export default function getLinkPagesByLinkPageTypeId(linkPageTypeId: number) {
  return ApiClient.httpGet<GetLinkPagesByLinkPageTypeIdResp[]>('/link-pages/{linkPageTypeId}', { params: { linkPageTypeId } });
}
