/**
 * title     : 获取链接页类型
 * path      : /link-page-types
 * created at: 2022-1-10 10:55:17 ├F10: AM┤
 * updated at: 2022-1-10 10:55:17 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface GetLinkPageTypesResp {
    id: number;
    name: string;
    linkName: string;
    description?: string;
    isNav: boolean;
    isActive: boolean;
    order: number;
}

export default function getLinkPageTypes() {
  return ApiClient.httpGet<GetLinkPageTypesResp[]>('/link-page-types', { });
}
