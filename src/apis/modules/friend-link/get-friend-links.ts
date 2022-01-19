/**
 * title     : 获取友链列表
 * path      : /friend-links
 * created at: 2022-1-10 10:55:26 ├F10: AM┤
 * updated at: 2022-1-10 10:55:26 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface GetFriendLinksResp {
    id: number;
    name: string;
    description: string;
    linkUrl: string;
    logoUrl: string;
    order: number;
    isActive: boolean;
}

export default function getFriendLinks() {
  return ApiClient.httpGet<GetFriendLinksResp[]>('/friend-links', { });
}
