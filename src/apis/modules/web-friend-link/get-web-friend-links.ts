/**
 * title     : 获取友链列表
 * path      : /web/friend-links
 * created at: 2022-1-10 10:55:28 ├F10: AM┤
 * updated at: 2022-1-10 10:55:28 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface GetWebFriendLinksResp {
    id: number;
    name: string;
    description: string;
    linkUrl: string;
    logoUrl: string;
}

export default function getWebFriendLinks() {
  return ApiClient.httpGet<GetWebFriendLinksResp[]>('/web/friend-links', { });
}
